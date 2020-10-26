import React from 'react';
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend';

import LoadingComp from 'Components/LoadingComp';
import { T2, TTobak } from 'images';
import { T_Api2, soundURL } from 'api';
import twinkle from 'twinkle.mp3';

import CountPresenter from './CountPresenter';

const idx_txt = 'count';

export default class extends React.Component {
    constructor({ match, location }) {
        super();
        this.learning_type = match.params.learning_type;
        this.effect_sound = new Audio(twinkle);
        this.cure = null;
        this.cureLength = 0;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.currentCure = 0;
        this.timeOut = null;
        this.numOfLoadedImage = 0;
        this.picture = { T2, TTobak };
        this.totalImages = Object.keys(T2).length + Object.keys(TTobak).length + 3;

        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
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
            currentIndex: 0,
            totalNum: 0,
        };

        if (this.learning_type === 'daily') {
            console.log(location.state.data.cure);
            this.cure = location.state.data.cure;
            this.currentCure = this.cure[this.currentIndex];
            this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
            this.state = {
                ...this.state,
                totalNum: this.cure.length,
            }
        }
    }

    async componentDidMount() {
        if (this.learning_type !== 'daily') this.newRequest();
        this.imagesPreloading(this.picture);
    }

    componentWillUnmount() {
        if (!!this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id } = this.state;

        try {
            const { data } = await T_Api2.ask(s_id, idx_txt);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.currentIndex = 0;
                this.cure = data.cure;
                this.currentCure = data.cure[this.currentIndex];
                this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);

                this.setState({
                    totalNum: this.cure.length,
                })
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
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
        this.effect_sound.play();
        this.setState({
            TTobaki: TTobak.ttobak2_1
        })
        const { s_id, Apple: { numOfApples }, is_review } = this.state;

        const { data } = await T_Api2.answer(
            s_id,
            this.cure[this.currentIndex].cure_word.length.toString(),
            numOfApples.toString(),
            this.cure[this.currentIndex].cure_id,
            is_review,
            idx_txt
        );
        console.log(data);

        if (this.currentIndex < this.cure.length - 1) this.currentIndex++;
        else {
            this.gameDone();
            return;
        }

        this.currentCure = this.cure[this.currentIndex];
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
                                })
                                setTimeout(() => this.playSound(), 1000);
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
                            setTimeout(() => this.playSound(), 1000);
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
        })
    }

    render() {
        const { isDragging, touchPosition, Apple, answer, TTobaki, isImageLoaded, showPopup, showDonePopup, showDailyPopup, percent,
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
                        showPopup={showPopup}
                        showDailyPopup={showDailyPopup}
                        showDonePopup={showDonePopup}
                        currentIndex={currentIndex}
                        totalNum={totalNum}
                    />
                </DndProvider>
            );
        }
        else {
            return <LoadingComp percent={percent} />
        }
    }
}