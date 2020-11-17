import React from 'react';
import { withRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingComp from 'Components/LoadingComp';
import { T2, TTobak } from 'images';
import { T_Api2, soundURL, T_tutorial } from 'api';
import { SoundEffect } from 'images';

import CountPresenter from './CountPresenter';

const touch_sound = new Audio(SoundEffect.touch_effect);
const effect_sound = new Audio(SoundEffect.twinkle);

const idx_txt = 'count';
const initState = {
    gameState: false,
    isDragging: false,
    touchPosition: [],
    Apple: {
        randomApple: T2.t2_Apples[Math.floor(Math.random() * 4)],
        applesInBasket: [],
        numOfApples: 0,
    },
    TTobaki: TTobak.ttobak1_1,
    isImageLoaded: false,
    showPopup: false,
    showDonePopup: false,
    showDailyPopup: false,
    percent: 0,
    currentIndex: 1,
    totalNum: 0,
};

class Count extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match }) {
        super();
        this.learning_type = match.params.learning_type;
        this.cure = null;
        this.cureLength = 0;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.currentCure = 0;
        this.timeOut = null;
        this.numOfLoadedImage = 0;
        this.picture = { T2, TTobak };
        this.totalImages = Object.keys(T2).length + Object.keys(TTobak).length + 3;
        this.voc_script = null;
        this.state = initState;
        this.continuePlay = null;
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

        this.sample_ques = null;
        this.voice = null;
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

    daily = () => {
        if (this.props.location.state.data.code === 'tutorial') {
            this.tutorial(this.props.location.state.data);
            return;
        }
        this.cure = this.props.location.state.data.cure;
        console.log(this.cure.length);
        this.currentCure = this.cure[this.currentIndex];
        this.currentCure.is_first = 'T';
        this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
        this.setState({
            totalNum: this.cure.length,
            currentIndex: this.currentIndex + 1,
            cureText: this.currentCure.cure_text,
        });
        setTimeout(() => this.playSound(), 1000);
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
            this.currentCure = data.cure[this.currentIndex];
            this.currentCure.is_first = 'T';
            this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);

            this.setState({
                totalNum: this.cure.length,
                currentIndex: this.currentIndex + 1,
            });
            setTimeout(() => this.playSound(), 1000);
        }
        else console.log('data message: ' + data.message);
    }

    tutorial = (data) => {
        this.setState({
            gameState: 'tutorial',
        });

        this.currentCure = data.sample_ques;
        this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);

        this.voice = [
            new Audio(soundURL + data.tut_voice[0].voc_path),
            new Audio(soundURL + data.tut_voice[1].voc_path),
            new Audio(soundURL + data.tut_voice[2].voc_path),
        ];

        this.voice[0].addEventListener('ended', () => {
            setTimeout(() => {
                if (!!this.currentAudio) this.currentAudio.play();
                this.setState({
                    TTobaki: TTobak.ttobak2_2,
                })
            }, 1000);
        });

        this.currentAudio.addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1,
            })
            setTimeout(() => {
                if (!!this.voice[1]) this.voice[1].play();
            }, 1000);
        })

        this.voice[2].addEventListener('ended', async () => {
            const { data } = await T_tutorial.answer(this.props.user.student.s_id, idx_txt, this.currentCure.cure_id);
            console.log(data);
            this.setState({
                ...initState,
                isImageLoaded: true,
            });
            if (this.learning_type === 'daily') this.daily();
            else this.newRequest();

            this.currentCure = null;
            this.sample_ques = null;
            this.voice = null;
        });

        setTimeout(() => {
            if (!!this.voice[0]) this.voice[0].play();
        }, 2000);
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.currentAudio.play();
            this.changeTTobaki(TTobak.ttobak3_2);

            this.setState({
                gameState: false,
            });

            this.currentAudio.addEventListener('ended', () => {
                this.setState({
                    gameState: true,
                    TTobaki: TTobak.ttobak1_1,
                })
            });
        }
    }

    TTobakiTouch = () => {
        const { gameState } = this.state;
        if (gameState) {
            this.playSound();
        }
    }

    changeTTobaki = (ttobaki) => {
        this.setState({
            TTobaki: ttobaki
        });
    }

    answer = async () => {
        effect_sound.play();
        this.setState({
            TTobaki: TTobak.ttobak2_1
        });
        if (this.state.gameState === 'tutorial') {
            if (!!this.voice[2]) this.voice[2].play();
            return;
        }
        const { Apple: { numOfApples } } = this.state;
        const { user } = this.props;
        const s_id = user.student.s_id;

        const { data } = await T_Api2.answer(
            s_id,
            this.cure[this.currentIndex].cure_word.length.toString(),
            numOfApples.toString(),
            this.cure[this.currentIndex].cure_id,
            this.learning_type === 'review' ? 'T' : 'F',
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
                        Apple: {
                            randomApple: T2.t2_Apples[Math.floor(Math.random() * 4)],
                            applesInBasket: [],
                            numOfApples: 0,
                        },
                    });
                    setTimeout(() => {
                        if (!!this.currentAudio) this.currentAudio.play();
                        this.setState({
                            TTobaki: TTobak.ttobak3_2,
                        });
                    }, 1000);
                });
                setTimeout(() => {
                    if (!!this.retry_script) this.retry_script.play();
                    this.setState({
                        TTobaki: TTobak.ttobak3_2,
                    });
                }, 1200);
                return;
            } else {
                this.good_script = new Audio(soundURL + data.correct_voice.voc_path);
                this.good_script.addEventListener('ended', () => this.nextStep());
                setTimeout(() => {
                    if (!!this.good_script) this.good_script.play();
                    this.setState({
                        TTobaki: TTobak.ttobak2_2,
                    });
                }, 1000);
            }
        }
    }

    nextStep = () => {
        if (this.currentIndex < this.cure.length - 1) this.currentIndex++;
        else {
            this.gameDone();
            return;
        }

        this.currentCure = this.cure[this.currentIndex];
        this.currentCure.is_first = 'T';
        this.currentAudio = new Audio(soundURL + this.cure[this.currentIndex].cure_path);

        setTimeout(() => {
            this.setState({
                gameState: false,
                timeOut: null,
                isDragging: false,
                touchPosition: [],
                TTobaki: TTobak.ttobak1_1,
                Apple: {
                    randomApple: T2.t2_Apples[Math.floor(Math.random() * 4)],
                    applesInBasket: [],
                    numOfApples: 0,
                },
                currentIndex: this.currentIndex + 1
            });
        }, 1000);

        setTimeout(() => {
            this.playSound();
        }, 2000);
    }

    createRandomApple = () => {
        const newApple = T2.t2_Apples[Math.floor(Math.random() * 4)];

        this.setState({
            Apple: {
                ...this.state.Apple,
                randomApple: newApple,
            }
        })
        return newApple;
    }

    dropApple = () => {
        const { Apple: { applesInBasket, numOfApples, randomApple } } = this.state;
        if (this.timeOut) clearTimeout(this.timeOut);

        this.timeOut = setTimeout(() => {
            this.answer();
        }, 3000);

        this.setState({
            Apple: {
                ...this.state.Apple,
                numOfApples: numOfApples <= 5 ? numOfApples + 1 : 5,
                applesInBasket: applesInBasket.concat(randomApple),
            },
        });
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

    onTreeTouchStartHandle = e => {
        touch_sound.play();
        this.setState({
            isDragging: true,
            touchPosition: [e.changedTouches[0].pageX, e.changedTouches[0].pageY],
        })
    }

    onTreeTouchEndHandle = () => {
        this.setState({
            isDragging: false,
        })
    }

    imagesPreloading = (picture) => {
        let timeoutPreloading = setTimeout(() => {
            this.props.history.push('/main/main');
        }, 10000);

        for (let i in picture) {
            for (let prop in picture[i]) {
                if (typeof (picture[i][prop]) === 'object') {
                    let arr = picture[i][prop];
                    for (let i in arr) {
                        let img = new Image();
                        img.src = arr[i];
                        img.onload = () => {
                            this.setState({
                                percent: (++this.numOfLoadedImage / this.totalImages) * 100
                            })
                            if (this.numOfLoadedImage === this.totalImages) {
                                this.setState({
                                    isImageLoaded: true,
                                });
                                if (this.learning_type === 'daily') this.daily();
                                else this.newRequest();
                                clearTimeout(timeoutPreloading);
                            }
                        };
                    }
                } else {
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
                            if (this.learning_type === 'daily') this.daily();
                            else this.newRequest();
                            clearTimeout(timeoutPreloading);
                        }
                    };
                }
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
        setTimeout(() => {
            this.setState({
                gameState: false,
                timeOut: null,
                isDragging: false,
                touchPosition: [],
                TTobaki: TTobak.ttobak1_1,
                Apple: {
                    randomApple: T2.t2_Apples[Math.floor(Math.random() * 4)],
                    applesInBasket: [],
                    numOfApples: 0,
                },
            });
        }, 2000);
        setTimeout(() => this.playSound(), 4000);
    }

    onPauseButtonHandle = () => {
        this.setState({
            showPopup: true,
        });

        let audioArr = [this.currentAudio, this.currentAudio, this.retryAudio, this.good_script];

        for (let i = 0; i < audioArr.length; i++) {
            if (!!audioArr[i] && !audioArr[i].paused && audioArr[i].duration > 0) {
                audioArr[i].pause();
                this.continuePlay = audioArr[i];
                break;
            }
        }

        if (!!this.voice) {
            for (let i = 0; i < this.voice.length; i++) {
                if (!!this.voice[i] && !this.voice[i].paused && this.voice[i].duration > 0) {
                    this.voice[i].pause();
                    this.continuePlay = this.voice[i];
                    break;
                }
            }
        }
    }

    onCompleteButtonHandle = () => {
        this.answer();
        clearTimeout(this.timeOut);
    }

    render() {
        const { isDragging, touchPosition, Apple, answer, TTobaki, isImageLoaded,
            showPopup, showDonePopup, showDailyPopup, percent,
            currentIndex, totalNum } = this.state;
        if (isImageLoaded) {
            return (
                <DndProvider backend={TouchBackend}>
                    <CountPresenter
                        Background={T2.t2_background}
                        Basket={T2.t2_basket}
                        TTobak={TTobaki}
                        TTobakiTouch={this.TTobakiTouch}
                        onTreeTouchStartHandle={this.onTreeTouchStartHandle}
                        onTreeTouchEndHandle={this.onTreeTouchEndHandle}
                        isDragging={isDragging}
                        touchPosition={touchPosition}
                        createRandomApple={this.createRandomApple}
                        dropApple={this.dropApple}
                        Apple={Apple}
                        answer={answer}
                        onContinueButtonHandle={this.onContinueButtonHandle}
                        onRestartButtonHandle={this.onRestartButtonHandle}
                        onPauseButtonHandle={this.onPauseButtonHandle}
                        onCompleteButtonHandle={this.onCompleteButtonHandle}
                        showPopup={showPopup}
                        showDailyPopup={showDailyPopup}
                        showDonePopup={showDonePopup}
                        currentIndex={currentIndex} totalNum={totalNum}
                        bt_complete={T2.bt_complete}
                    />
                </DndProvider>
            );
        }
        else {
            return <LoadingComp percent={percent} />
        }
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(Count));