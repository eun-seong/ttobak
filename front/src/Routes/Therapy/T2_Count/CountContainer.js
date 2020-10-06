import React from 'react';
import CountPresenter from './CountPresenter';

import { T2, TTobak } from 'images';

export default class extends React.Component {
    state = {

    };

    onTreeClick = () => {
        console.log('tree Clicked');
        const apple = T2.t2_Apples[Math.floor(Math.random * 3)];
        return (
            <img src={apple} alt='사과' draggable='true' />
        );
    }

    onTreeDrag = () => {
        console.log('tree Draged');
    }

    onTreeDragEnd = () => {
        console.log('tree Draged end');
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        return (
            <CountPresenter
                Background={T2.t2_background}
                Basket={T2.t2_basket}
                TTobak={TTobak[0]}
                onTreeClick={this.onTreeClick}
                onTreeDrag={this.onTreeDrag}
                onTreeDragEnd={this.onTreeDragEnd} />);
    }
}