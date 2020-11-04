import React from 'react';
import { withRouter } from 'react-router-dom';
import ConsoMatchPresenter from './ConsoMatchPresenter';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingComp from 'Components/LoadingComp';
import { T6, Characters } from 'images';
import { T_Api4, soundURL, T_tutorial } from 'api';

const idx_txt = 'consomatch';
const initState = {
    gameState: false,
    PicBoxList: null,
    Worm: Characters.worm2_2,
    isImageLoaded: false,
    showPopup: false,
    showDonePopup: false,
    showDailyPopup: false,
    percent: 0,
    currentIndex: 1,
    totalNum: 0,
};

class ConsoMatch extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match }) {
        super();
        this.learning_type = match.params.learning_type;
        this.cure = null;
        this.answer = null;
        this.currentCure = null;
        this.currentAudio = null;
        this.currentIndex = 0;
        this.numOfLoadedImage = 0;
        this.picture = { T6, Characters };
        this.totalImages = Object.keys(T6).length + Object.keys(Characters).length;

        this.state = initState;
    }

    componentDidCatch() {

    }

    async componentDidMount() {
        this.imagesPreloading(this.picture);
        const { user } = this.props;

        if (!user.user.u_id || !user.student.s_id) {
            this.props.history.push('/root/signin');
            return;
        }
    }

    componentWillUnmount() {
        if (!!this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.remove();
            this.currentAudio = null;
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

    getListFilter = (key, value) => {
        return this.cure.filter((object) => { return object[key] === value })[0]
    }

    newRequest = async () => {
        console.log('new request');
        const { user } = this.props;
        const s_id = user.student.s_id;

        const { data } = await T_Api4.ask(s_id);
        console.log(data);

        if (data.code === 'tutorial') {
            this.tutorial(data);
            return;
        }

        if (data.code === 'specified' || data.code === 1) {
            this.currentIndex = 0;
            this.answer = data.answer;
            this.cure = data.cure;

            if (this.numOfLoadedImage !== this.totalImages) this.pictursPreloading(this.cure);
            this.totalImages += this.cure.length;
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

        console.log(this.props.location.state.data);

        this.answer = this.props.location.state.data.answer;
        this.cure = this.props.location.state.data.cure;
        this.currentCure = this.answer[this.currentIndex];
        this.currentCure.is_first = 'T';

        if (this.numOfLoadedImage !== this.totalImages) this.pictursPreloading(this.cure);

        this.setState({
            totalNum: this.answer.length,
            currentIndex: this.currentIndex + 1,
            PicBoxList: [
                soundURL + this.getListFilter('cure_tid', this.currentCure[0]).cure_path2,
                soundURL + this.getListFilter('cure_tid', this.currentCure[1]).cure_path2,
                soundURL + this.getListFilter('cure_tid', this.currentCure[2]).cure_path2,
            ]
        });

        this.currentAudio = new Audio(soundURL + this.getListFilter('cure_tid', this.currentCure[3][0]).cure_path);
        this.currentAudio.addEventListener('ended', () => {
            this.setState({
                gameState: true,
                Worm: Characters.worm2_2,
            })
        });
        setTimeout(() => this.playSound(), 2000);
    }

    tutorial = (data) => {
        this.voice = [
            new Audio(soundURL + data.tut_voice[0].voc_path),
            new Audio(soundURL + data.tut_voice[1].voc_path),
            new Audio(soundURL + data.tut_voice[2].voc_path),
        ];
        this.currentCure = data.sample_ques;

        this.setState({
            PicBoxList: [
                soundURL + this.currentCure[0].cure_path2,
                soundURL + this.currentCure[1].cure_path2,
                soundURL + this.currentCure[2].cure_path2,
            ]
        });

        this.currentAudio = new Audio(soundURL + this.currentCure[0].cure_path);
        this.currentAudio.addEventListener('ended', () => {
            this.setState({
                Worm: Characters.worm2_2,
            });
            setTimeout(() => {
                this.voice[1].play();
            }, 1000);
        });

        this.voice[0].addEventListener('ended', () => {
            setTimeout(() => {
                this.playSound();
            }, 1000);
        });

        this.voice[1].addEventListener('ended', () => {
            this.setState({
                gameState: 'tutorial',
                Worm: Characters.worm2_2,
            });
        });

        this.voice[2].addEventListener('ended', async () => {
            const { data } = await T_tutorial.answer(this.props.user.student.s_id, idx_txt, this.currentCure.cure_id);
            console.log(data);
            if (this.learning_type === 'daily') this.daily();
            else this.newRequest();

            this.currentAudio = null;
            this.currentCure = null;
            this.voice = null;
        });

        setTimeout(() => {
            this.voice[0].play();
        }, 2000);
    }

    setCurrent = (timeout) => {
        this.currentCure = this.answer[this.currentIndex];
        this.currentCure.is_first = 'T';

        if (!!this.currentAudio) this.currentAudio.remove();
        this.currentAudio = null;
        this.currentAudio = new Audio(soundURL + this.getListFilter('cure_tid', this.currentCure[3][0]).cure_path);
        this.currentAudio.addEventListener('ended', () => {
            this.setState({
                gameState: true,
                Worm: Characters.worm2_2,
            })
        })

        setTimeout(() => {
            this.setState({
                PicBoxList: [
                    soundURL + this.getListFilter('cure_tid', this.currentCure[0]).cure_path2,
                    soundURL + this.getListFilter('cure_tid', this.currentCure[1]).cure_path2,
                    soundURL + this.getListFilter('cure_tid', this.currentCure[2]).cure_path2,
                ],
                currentIndex: this.currentIndex + 1,
                Worm: Characters.worm2_2,
            })
        }, timeout);
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.setState({
                gameState: false,
                Worm: Characters.worm2_1,
            });
            this.currentAudio.play();
        }
    }

    gameDone = () => {
        console.log('done!');
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

    onFrameTouchHandle = async (id) => {
        const { gameState } = this.state;
        if (gameState === 'tutorial') {
            if (id === 0) {
                this.setState({ gameState: false });
                setTimeout(() => {
                    this.voice[2].play();
                }, 1000);
            }
            return;
        }
        if (!gameState) return;

        this.setState({
            gameState: false,
        });

        const { user } = this.props;
        const s_id = user.student.s_id;
        const cure_id = [
            this.getListFilter('cure_tid', this.currentCure[0]).cure_id,
            this.getListFilter('cure_tid', this.currentCure[1]).cure_id,
            this.getListFilter('cure_tid', this.currentCure[2]).cure_id,
        ];
        const { data } = await T_Api4.answer(
            s_id,
            cure_id,
            this.getListFilter('cure_tid', this.currentCure[id]).cure_word,
            this.getListFilter('cure_tid', this.currentCure[3][0]).cure_word,
            this.learning_type === 'review' ? 'T' : 'F',
            this.learning_type === 'daily' ? 'T' : 'F',
            this.currentCure.is_first
        );
        console.log(data);

        switch (data.code) {
            case 1:
                if (data.correct_voice.voc_desc === 'retry') {
                    this.currentCure.is_first = 'F';
                    this.retry_script = new Audio(soundURL + data.correct_voice.voc_path);
                    this.retry_script.addEventListener('ended', () => {
                        this.setState({
                            gameState: true,
                            Worm: Characters.worm2_2,
                        });
                    });

                    setTimeout(() => {
                        this.retry_script.play();
                        this.setState({
                            gameState: false,
                            Worm: Characters.worm2_1,
                        });
                    }, 1000);
                    return;
                } else {
                    this.setState({
                        Worm: Characters.worm3_1,
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
                break;
            case 2:
                console.log(data.message);
                this.gameDone();
                break;
            default:
                this.props.history.push('/main/main')
                break;
        }
    }

    nextStep = () => {
        if (this.currentIndex < this.answer.length - 1) this.currentIndex++;
        else {
            this.gameDone();
            return;
        }
        this.setCurrent(1000);

        setTimeout(() => {
            this.playSound();
        }, 2000);
    }

    onWormTouchHandle = () => {
        if (this.state.gameState) this.playSound();
    }

    pictursPreloading = (picture) => {
        let timeoutPreloading = setTimeout(() => {
            this.props.history.push('/main/main');
        }, 10000);

        try {
            for (let i in picture) {
                let img = new Image();
                img.src = soundURL + picture[i].cure_path2;
                img.onload = () => {
                    this.setState({
                        percent: (++this.numOfLoadedImage / this.totalImages) * 100
                    });

                    if (this.numOfLoadedImage === this.totalImages) {
                        this.setState({
                            isImageLoaded: true,
                        })
                        setTimeout(() => this.playSound(), 1000);
                        clearTimeout(timeoutPreloading);
                    }
                };
            }
        } catch (e) {
            console.log(e);
        }
    }

    imagesPreloading = (picture) => {
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
                        })
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
        const { PicBoxList, Worm, isImageLoaded, showPopup, percent, gameState, showDailyPopup, showDonePopup,
            currentIndex, totalNum } = this.state;

        if (isImageLoaded) {
            return (
                <ConsoMatchPresenter
                    Background={T6.t6_background}
                    Worm={Worm}
                    onWormTouchHandle={this.onWormTouchHandle}
                    frameList={PicBoxList || [T6.t6_excpic, T6.t6_excpic, T6.t6_excpic]}
                    onFrameTouchHandle={this.onFrameTouchHandle}
                    showPopup={showPopup}
                    onContinueButtonHandle={this.onContinueButtonHandle}
                    onPauseButtonHandle={this.onPauseButtonHandle}
                    onRestartButtonHandle={this.onRestartButtonHandle}
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

export default connect(mapStateToProps)(withRouter(ConsoMatch));