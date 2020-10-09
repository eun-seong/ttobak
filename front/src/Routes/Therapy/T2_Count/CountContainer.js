import React from 'react';
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend';

import { T2, TTobak } from 'images';

import CountPresenter from './CountPresenter';

export default class extends React.Component {
    state = {
        isDragging: false,
        touchPosition: [],
        clientHeight: document.documentElement.clientHeight
    };

    onTreeTouchStartHandle = e => {
        console.log('tree Touch start');
        this.setState({
            isDragging: true,
            touchPosition: [e.changedTouches[0].pageX, e.changedTouches[0].pageY],
        })
        const apple = T2.t2_Apples[Math.floor(Math.random * 3)];
    }

    onTreeTouchEndHandle = () => {
        console.log('tree Touch end');

        this.setState({
            isDragging: false,
        })
    }

    render() {
        const { isDragging, touchPosition, clientHeight } = this.state;

        return (
            <DndProvider backend={TouchBackend}>
                <CountPresenter
                    Background={T2.t2_background}
                    Basket={T2.t2_basket}
                    TTobak={TTobak.ttobak1_1}
                    onTreeTouchStartHandle={this.onTreeTouchStartHandle}
                    onTreeTouchEndHandle={this.onTreeTouchEndHandle}
                    isDragging={isDragging}
                    touchPosition={touchPosition}
                    clientHeight={clientHeight}
                />
            </DndProvider>
        );
    }
}