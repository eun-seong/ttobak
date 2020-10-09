import React from 'react';
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend';

import { T2, TTobak } from 'images';

import CountPresenter from './CountPresenter';

export default class extends React.Component {
    state = {
        gameState: false,
        isDragging: false,
        touchPosition: [],
        Apple: {
            randomApple: T2.t2_Apples[Math.floor(Math.random() * 4)],
            applesInBasket: [],
            numOfApples: 0,
        },
        answer: 4,
    };

    gameStart = () => {
        this.setState({
            gameState: true,
        });
    }

    TTobakiTouch = () => {
        const { gameState } = this.state;
        if (!gameState) this.gameStart();
        else {
            // 다시 듣기
        }
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
        this.setState({
            Apple: {
                ...this.state.Apple,
                numOfApples: numOfApples + 1,
                applesInBasket: applesInBasket.concat(randomApple),
            }
        })
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
        console.log(this.state.Apple);

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