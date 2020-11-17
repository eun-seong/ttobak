import React from 'react';
import { withRouter } from 'react-router-dom';
import SoundPresenter from './SoundPresenter';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { T5, TTobak, Characters } from 'images';
import { T_Api2, soundURL, T_tutorial } from 'api';
import LoadingComp from 'Components/LoadingComp';

const initState = {
    TTobaki: TTobak.ttobak1_1,                  // 또박이 이미지 상태
    gameState: false,
    CardTextList: null,
    isImageLoaded: false,
    showPopup: false,
    showDonePopup: false,
    showDailyPopup: false,
    percent: 0,
    currentIndex: 1,
    totalNum: 0,
}

class Sound extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match }) {
        super();
        this.learning_type = match.params.learning_type;
        this.type = match.params.type + 'sound';
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.numOfLoadedImage = 0;
        this.picture = { T5, TTobak, Characters };
        this.totalImages = Object.keys(T5).length + Object.keys(TTobak).length + Object.keys(Characters).length;

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
        if (!!this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.remove();
            this.currentAudio = null;
        }
        if (!!this.tutorialAudio) {
            this.tutorialAudio.pause();
            this.tutorialAudio.remove();
            this.tutorialAudio = null;
        }

        if (!!this.voice) {
            for (let i = 0; i < this.voice.length; i++) {
                if (!!this.voice[i]) {
                    this.voice[i].pause();
                    this.voice[i].remove();
                    this.voice[i] = null;
                }
            }
        }
    }

    newRequest = async () => {
        console.log('new request');

        const { user } = this.props;
        const s_id = user.student.s_id;
        const { data } = await T_Api2.ask(s_id, this.type);
        console.log(data);

        if (data.code === 'tutorial') {
            this.tutorial(data);
            return;
        }

        if (data.code === 'specified' || data.code === 1) {
            this.currentIndex = 0;
            this.cure = data.cure;
            this.currentCure = data.cure[this.currentIndex];
            this.currentCure.is_first = 'T';
            this.setAudio();

            this.setState({
                CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
                totalNum: this.cure.length,
                currentIndex: this.currentIndex + 1,
            });
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
        this.currentCure = this.cure[this.currentIndex];
        this.currentCure.is_first = 'T';
        this.setAudio();

        this.setState = {
            totalNum: this.cure.length,
            CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
            currentIndex: this.currentIndex + 1,
        };
        setTimeout(() => this.playSound(), 2000);
    }

    tutorial = (data) => {
        this.voice = [
            new Audio(soundURL + data.tut_voice[0].voc_path),
            new Audio(soundURL + data.tut_voice[1].voc_path),
            new Audio(soundURL + data.tut_voice[2].voc_path),
        ];
        this.currentCure = data.sample_ques;
        this.tutorialAudio = new Audio(soundURL + this.currentCure.cure_path);

        this.tutorialAudio.addEventListener('ended', () => {
            this.setState({ TTobaki: TTobak.ttobak1_1 })
            setTimeout(() => {
                if (!!this.voice[1]) this.voice[1].play();
            }, 1000);
        })

        this.setState({
            CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
        });

        this.voice[0].addEventListener('ended', () => {
            setTimeout(() => {
                this.setState({
                    gameState: false,
                    TTobaki: TTobak.ttobak1_2
                });
                if (!!this.tutorialAudio) this.tutorialAudio.play();
            }, 1000);
        });

        this.voice[1].addEventListener('ended', () => {
            this.setState({
                gameState: 'tutorial',
                TTobaki: TTobak.ttobak1_1,
            });
        });

        this.voice[2].addEventListener('ended', async () => {
            const { data } = await T_tutorial.answer(this.props.user.student.s_id, this.type, this.currentCure.cure_id);
            console.log(data);
            this.setState({
                gameState: false,
            });
            if (this.learning_type === 'daily') this.daily();
            else this.newRequest();
        });

        setTimeout(() => {
            if (!!this.voice[0]) this.voice[0].play();
        }, 2000);
    }

    setAudio = () => {
        if (!!this.currentAudio) {
            this.currentAudio.remove();
            this.currentAudio = null;
        }
        if (this.type === 'consosound') {
            this.currentCure.answer = Math.floor(Math.random() * 2) + 1;
            this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
            if (this.currentCure.answer === 2) {
                var tmp = this.currentCure.cure_word;
                this.currentCure.cure_word = this.currentCure.cure_word2;
                this.currentCure.cure_word2 = tmp;
            }
        } else {
            this.currentAudio = this.currentCure.answer === 1
                ? new Audio(soundURL + this.currentCure.cure_path) :
                new Audio(soundURL + this.currentCure.cure_path2);
        }

        this.currentAudio.addEventListener('ended', () => {
            this.setState({
                gameState: true,
                TTobaki: TTobak.ttobak1_1
            });
        })
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.setState({
                gameState: false,
                TTobaki: TTobak.ttobak1_2
            });
            this.currentAudio.play();
        }
    }

    onTTobakiTouchHandle = () => {
        const { gameState } = this.state;
        if (gameState) this.playSound();
    }

    onCardTouchHandle = async (index) => {
        const { gameState, CardTextList } = this.state;
        const { user } = this.props;
        const s_id = user.student.s_id;

        if (gameState === 'tutorial') {
            if (index === 0) {
                this.setState({ gameState: false })
                setTimeout(() => {
                    if (!!this.voice[2]) this.voice[2].play();
                }, 1000);
            }
            return;
        }
        if (!gameState) return;

        this.setState({
            gameState: false,
        });

        const { data } = await T_Api2.answer(
            s_id,
            this.currentCure.answer === 1 ? this.currentCure.cure_word : this.currentCure.cure_word2,
            CardTextList[index],
            this.currentCure.cure_id,
            this.learning_type === 'review' ? 'T' : 'F',
            this.type,
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
                    if (!!this.retry_script) this.retry_script.play();
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
                    if (!!this.good_script) this.good_script.play();
                    this.setState({
                        gameState: false,
                    });
                }, 1000);
            }
        } else if (data.code === 2) {
            this.setState({
                showPopup: true,
            })
        }
    }

    nextStep = () => {
        if (this.currentIndex < this.cure.length - 1) this.currentIndex++;
        else {
            setTimeout(() => {
                this.gameDone();
            }, 1000);
            return;
        }
        this.currentCure = this.cure[this.currentIndex];
        this.currentCure.is_first = 'T';
        this.setAudio();

        setTimeout(() => {
            this.setState({
                CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
                TTobaki: TTobak.ttobak1_1,
                currentIndex: this.currentIndex + 1
            });
        }, 1000);

        setTimeout(() => {
            this.playSound();
        }, 2000);
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
                    });

                    if (this.numOfLoadedImage === this.totalImages) {
                        this.setState({
                            isImageLoaded: true,
                            TTobaki: TTobak.ttobak1_1,
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
        const { TTobaki, CardTextList, isImageLoaded, showPopup, showDonePopup, showDailyPopup, percent, gameState,
            currentIndex, totalNum } = this.state;
        if (isImageLoaded) {
            return (<SoundPresenter
                Background={T5.t5_background}
                TTobak={TTobaki}
                TTobakiTouch={this.onTTobakiTouchHandle}
                Card={[Characters.card1, Characters.card2]}
                CardTextList={CardTextList || ['아', '에']}
                onCardTouchHandle={this.onCardTouchHandle}
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

export default connect(mapStateToProps)(withRouter(Sound));