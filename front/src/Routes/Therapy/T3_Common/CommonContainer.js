import React from 'react';
import { withRouter } from 'react-router-dom';
import { T3, TTobak } from 'images';
import CommonPresenter from './CommonPresenter';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingComp from 'Components/LoadingComp';
import { T_Api2, soundURL, T_tutorial } from 'api';

const idx_txt = 'common';
const initState = {
    TTobaki: TTobak.ttobak1_1,
    gameState: false,
    boxTextList: null,
    isAnimate: [false, false, false, false],
    isImageLoaded: false,
    showPopup: false,
    showDonePopup: false,
    showDailyPopup: false,
    percent: 0,
    currentIndex: 1,
    totalNum: 0,
};

class Common extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match }) {
        super();
        this.learning_type = match.params.learning_type;
        this.currentAudio = null;
        this.cure = null;
        this.currentIndex = 0;
        this.currentCure = null;
        this.numOfLoadedImage = 0;
        this.picture = { T3, TTobak };
        this.totalImages = Object.keys(T3).length + Object.keys(TTobak).length;

        this.state = initState;
    }

    async componentDidMount() {
        const { user } = this.props;

        if (!user.user.u_id || !user.student.s_id) {
            this.props.history.push('/root/signin');
            return;
        }

        this.imagesPreloading(this.picture);
    }

    componentWillUnmount() {
        let audioArr = [this.currentAudio, this.voice];
        for (let i = 0; i < audioArr.length; i++) {
            if (!!audioArr[i]) {
                for (var j = 0; j < audioArr[i].length; j++) {
                    if (!!audioArr[i][j]) {
                        audioArr[i][j].pause();
                        audioArr[i][j].remove();
                        audioArr[i][j] = null;
                    }
                }
            }
        }
    }

    newRequest = async () => {
        console.log('new request');
        const { user } = this.props;
        const s_id = user.student.s_id;

        const { data } = await T_Api2.ask(s_id, idx_txt);
        console.log(data);

        if (data.code === 'tutorial') {
            this.tutorial(data);
            return;
        }

        if (data.code === 'specified' || data.code === 1) {
            this.currentIndex = 0;
            this.cure = data.cure;
            this.setCurrent(0);

            this.setState({
                totalNum: this.cure.length,
                currentIndex: this.currentIndex + 1,
            })
            setTimeout(() => this.playSound(), 2000);
        }
        else console.log('data message: ' + data.message);
    }

    daily = () => {
        if (this.props.location.state.data.code === 'tutorial') {
            this.tutorial(this.props.location.state.data);
            return;
        }
        console.log(this.props.location.state.data.cure);
        this.cure = this.props.location.state.data.cure;
        this.setState = {
            totalNum: this.cure.length,
            currentIndex: this.currentIndex + 1,
        }
        this.setCurrent(0);
        setTimeout(() => this.playSound(), 2000);
    }

    tutorial = (data) => {
        this.voice = [
            new Audio(soundURL + data.tut_voice[0].voc_path),
            new Audio(soundURL + data.tut_voice[1].voc_path),
            new Audio(soundURL + data.tut_voice[2].voc_path),
        ];

        this.currentCure = data.sample_ques;
        this.currentAudio = [
            new Audio(soundURL + this.currentCure.com_e1path),
            new Audio(soundURL + this.currentCure.com_e2path),
            new Audio(soundURL + this.currentCure.com_e3path),
            new Audio(soundURL + this.currentCure.com_e4path),
            new Audio(soundURL + this.currentCure.com_w1path),
            new Audio(soundURL + this.currentCure.com_w2path),
            new Audio(soundURL + this.currentCure.com_w3path),
        ];

        this.setListener(true);
        this.setState({
            boxTextList: [
                this.currentCure.com_e1,
                this.currentCure.com_e2,
                this.currentCure.com_e3,
                this.currentCure.com_e4],
            TTobaki: TTobak.ttobak1_1,
            currentIndex: this.currentIndex + 1
        });

        this.voice[0].addEventListener('ended', () => {
            setTimeout(() => {
                this.playSound();
            }, 1000);
        });

        this.voice[1].addEventListener('ended', () => {
            this.setState({
                gameState: 'tutorial',
                TTobaki: TTobak.ttobak1_1,
            });
        });

        this.voice[2].addEventListener('ended', async () => {
            const { data } = await T_tutorial.answer(
                this.props.user.student.s_id,
                idx_txt,
                this.currentCure.com_id)
            console.log(data);
            this.setState({
                gameState: false,
            });
            if (this.learning_type === 'daily') this.daily();
            else this.newRequest();

            this.currentCure = null;
            this.sample_ques = null;
            this.voice = null;
        });

        setTimeout(() => {
            this.voice[0].play();
        }, 2000);
    }

    setCurrent = (timeout) => {
        this.currentCure = this.cure[this.currentIndex];
        this.currentCure.is_first = 'T';
        for (let i = 0; i < this.currentCure.length; i++) {
            if (!!this.currentCure[i]) this.currentCure[i].remove();
            this.currentCure[i] = null;
        }
        this.currentAudio = [
            new Audio(soundURL + this.currentCure.com_e1path),
            new Audio(soundURL + this.currentCure.com_e2path),
            new Audio(soundURL + this.currentCure.com_e3path),
            new Audio(soundURL + this.currentCure.com_e4path),
            new Audio(soundURL + this.currentCure.com_w1path),
            new Audio(soundURL + this.currentCure.com_w2path),
            new Audio(soundURL + this.currentCure.com_w3path),
        ];

        this.setListener(false);
        setTimeout(() => {
            this.setState({
                boxTextList: [
                    this.cure[this.currentIndex].com_e1,
                    this.cure[this.currentIndex].com_e2,
                    this.cure[this.currentIndex].com_e3,
                    this.cure[this.currentIndex].com_e4],
                TTobaki: TTobak.ttobak1_1,
                currentIndex: this.currentIndex + 1
            })
        }, timeout);
    }

    setListener = (isTutorial) => {
        this.currentAudio[0].addEventListener('ended', () => {
            this.listenerFunc(0, 500);
        });
        this.currentAudio[1].addEventListener('ended', () => {
            this.listenerFunc(1, 500);
        });
        this.currentAudio[2].addEventListener('ended', () => {
            this.listenerFunc(2, 500);
        });
        this.currentAudio[3].addEventListener('ended', () => {
            this.listenerFunc(3, 1500);
        });
        this.currentAudio[4].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1
            })
            setTimeout(() => {
                if (!!this.currentAudio[5]) {
                    this.currentAudio[5].play();
                    this.setState({
                        TTobaki: TTobak.ttobak3_2
                    })
                }
            }, 1000);
        });
        this.currentAudio[5].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1
            })
            setTimeout(() => {
                if (!!this.currentAudio[6]) {
                    this.currentAudio[6].play();
                    this.setState({
                        TTobaki: TTobak.ttobak3_2
                    })
                }
            }, 1000);
        });
        this.currentAudio[6].addEventListener('ended', () => {
            if (isTutorial) setTimeout(() => {
                this.voice[1].play();
            }, 1000);
            else this.setState({
                gameState: true,
                TTobaki: TTobak.ttobak1_1
            });
        });
    }

    listenerFunc = (index, time) => {
        this.setState({
            TTobaki: TTobak.ttobak1_1
        });
        setTimeout(() => {
            if (!!this.currentAudio[index + 1]) {
                this.currentAudio[index + 1].play();
                this.setState({
                    TTobaki: TTobak.ttobak1_2
                })
            }
        }, time);
    }

    playSound = () => {
        this.setState({
            gameState: false,
            TTobaki: TTobak.ttobak1_2
        });

        if (!!this.currentAudio[0]) {
            this.currentAudio[0].play();
        }
    }

    onTTobakiTouchHandle = () => {
        const { gameState } = this.state;
        if (gameState === true) this.playSound();
    }

    onBoxTouchHandle = async (index) => {
        const { gameState, boxTextList } = this.state;
        if (gameState === 'tutorial') {
            if (boxTextList[index] === this.currentCure.com_ans) {
                this.setState({ gameState: false });
                setTimeout(() => {
                    this.voice[2].play();
                }, 1000);
            }
            return;
        }

        if (gameState === false) return;

        this.setState({
            gameState: false,
        });

        try {
            const { user } = this.props;
            const s_id = user.student.s_id;
            const { boxTextList, is_review } = this.state;
            const { data } = await T_Api2.answer(
                s_id,
                this.cure[this.currentIndex].com_ans,
                boxTextList[index],
                this.cure[this.currentIndex].com_id,
                is_review,
                idx_txt,
                this.learning_type === 'daily' ? 'T' : 'F',
                this.currentCure.is_first
            );
            console.log(data);

            if (data.code === 1) {
                if (data.correct_voice.voc_desc === 'retry') {
                    this.currentCure.is_first = 'F';
                    this.retry_script = new Audio(soundURL + data.correct_voice.voc_path);
                    this.retry_script.addEventListener('ended', () => {
                        this.setState({
                            TTobaki: TTobak.ttobak1_1,
                            gameState: true,
                        });
                    });

                    setTimeout(() => {
                        this.retry_script.play();
                        this.setState({
                            TTobaki: TTobak.ttobak3_2,
                            gameState: false,
                        });
                    }, 1000);
                    return;
                } else {
                    this.setState({
                        TTobaki: TTobak.ttobak2_2,
                    })
                    this.good_script = new Audio(soundURL + data.correct_voice.voc_path);
                    this.good_script.addEventListener('ended', () => this.nextStep());
                    setTimeout(() => {
                        this.good_script.play();
                        this.setState({
                            gameState: false,
                        });
                    }, 1000);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    nextStep = () => {
        if (this.currentIndex < this.cure.length - 1) {
            this.currentIndex++;
        } else {
            this.gameDone();
            return;
        }

        this.setCurrent(1000);

        setTimeout(() => {
            this.playSound();
        }, 3000);

    }

    gameDone = () => {
        console.log('game doen!');
        if (this.learning_type !== 'daily') {
            this.setState({
                showDonePopup: true,
            })
        } else {
            this.setState({
                showDailyPopup: true,
            })
        }
    }

    imagesPreloading = (picture) => {
        let timeoutPreloading = setTimeout(() => {
            this.props.history.push('/main/main');
        }, 10000);

        for (let i in picture) {
            for (let prop in picture[i]) {
                let img = new Image();
                img.src = picture[i][prop];
                img.onload = () => {
                    this.setState({
                        percent: (++this.numOfLoadedImage / this.totalImages) * 100
                    })
                    if (this.numOfLoadedImage === this.totalImages) {
                        this.setState({
                            isImageLoaded: true,
                        })
                        clearTimeout(timeoutPreloading);

                        if (this.learning_type !== 'daily') this.newRequest();
                        else this.daily();
                    }
                };
            }
        }
    }

    onContinueButtonHandle = () => {
        this.setState({
            showPopup: false,
        })
    }

    onRestartButtonHandle = () => {
        this.setState({
            showDonePopup: false,
        })
        this.newRequest();
        setTimeout(() => this.playSound(), 2000);
    }

    onPauseButtonHandle = () => {
        this.setState({
            showPopup: true,
        })
    }

    render() {
        const { boxTextList, isAnimate, TTobaki, isImageLoaded, showPopup, showDonePopup, showDailyPopup, percent, gameState,
            currentIndex, totalNum } = this.state;

        if (isImageLoaded) {
            return (<CommonPresenter
                Background={T3.t3_background}
                TTobak={TTobaki}
                onTTobakiTouchHandle={this.onTTobakiTouchHandle}
                boxTextList={boxTextList || ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ']}
                onBoxTouchHandle={this.onBoxTouchHandle}
                BoxImg={T3.t3_textbox}
                isAnimate={isAnimate}
                onContinueButtonHandle={this.onContinueButtonHandle}
                onRestartButtonHandle={this.onRestartButtonHandle}
                onPauseButtonHandle={this.onPauseButtonHandle}
                showPopup={showPopup}
                showDailyPopup={showDailyPopup}
                showDonePopup={showDonePopup}
                gameState={gameState}
                currentIndex={currentIndex}
                totalNum={totalNum}
            />);
        }
        else {
            return <LoadingComp percent={percent} />
        }
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(Common));