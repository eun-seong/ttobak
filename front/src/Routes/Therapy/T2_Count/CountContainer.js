import React from 'react';
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend';

import { T2, TTobak } from 'images';
import { T2_Api, soundURL } from 'api';

import CountPresenter from './CountPresenter';

export default class extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
            is_review: match.params.is_review,
            cure: null,
            cureLength: 0,
            currentIndex: 0,
            currentAudio: null,
            gameState: false,
            isDragging: false,
            touchPosition: [],
            Apple: {
                randomApple: T2.t2_Apples[Math.floor(Math.random() * 4)],
                applesInBasket: [],
                numOfApples: 0,
            },
            timeOut: null,
        };
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id, is_review } = this.state;

        try {
            const { data } = await T2_Api.ask(s_id);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                const first = data.cure[0];
                this.setState({
                    cure: data.cure,
                    cureLength: data.cure.length,
                    currentAudio: new Audio(soundURL + first.cure_path),
                })
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    TTobakiTouch = () => {
        const { gameState } = this.state;
        if (gameState) {
            this.playSound();
        }
    }

    playSound = () => {
        const { currentAudio } = this.state;
        currentAudio.play();

        this.setState({
            gameState: false,
        });

        currentAudio.addEventListener('ended', () => {
            this.setState({
                gameState: true,
            })
        });
    }

    gameDone = async () => {
        const { s_id, Apple: { numOfApples }, currentIndex, cureLength, is_review, cure } = this.state;

        const { data } = await T2_Api.answer(
            s_id,
            cure[currentIndex].cure_word.length.toString(),
            numOfApples.toString(),
            cure[currentIndex].cure_id,
            is_review
        );
        console.log(data);

        const nextIndex = cureLength > currentIndex ? currentIndex + 1 : 0;
        this.setState({
            gameState: false,
            timeOut: null,
            currentIndex: nextIndex,
            currentAudio: new Audio(soundURL + cure[nextIndex].cure_path),
            isDragging: false,
            touchPosition: [],
            Apple: {
                randomApple: T2.t2_Apples[Math.floor(Math.random() * 4)],
                applesInBasket: [],
                numOfApples: 0,
            },
        });

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
        const { Apple: { applesInBasket, numOfApples, randomApple }, timeOut } = this.state;
        if (timeOut) clearTimeout(timeOut);

        this.setState({
            Apple: {
                ...this.state.Apple,
                numOfApples: numOfApples <= 5 ? numOfApples + 1 : 5,
                applesInBasket: applesInBasket.concat(randomApple),
            },
            timeOut: setTimeout(() => {
                console.log('setTimeout');
                this.gameDone();
            }, 3000)
        });
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

    render() {
        const { isDragging, touchPosition, Apple, answer } = this.state;

        return (
            <DndProvider backend={TouchBackend}>
                <CountPresenter
                    Background={T2.t2_background}
                    Basket={T2.t2_basket}
                    TTobak={TTobak.ttobak1_1}
                    TTobakiTouch={this.TTobakiTouch}
                    onTreeTouchStartHandle={this.onTreeTouchStartHandle}
                    onTreeTouchEndHandle={this.onTreeTouchEndHandle}
                    isDragging={isDragging}
                    touchPosition={touchPosition}
                    createRandomApple={this.createRandomApple}
                    dropApple={this.dropApple}
                    Apple={Apple}
                    answer={answer}
                />
            </DndProvider>
        );
    }
}