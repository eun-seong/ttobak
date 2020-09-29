import React from 'react';
import CountPresenter from './CountPresenter';

import Apple1 from 'img/t2_counting/apple1.png';
import Apple2 from 'img/t2_counting/apple2.png';
import Apple3 from 'img/t2_counting/apple3.png';
import Apple4 from 'img/t2_counting/apple4.png';

const Apples = [Apple1, Apple2, Apple3, Apple4];

export default class extends React.Component {
    state = {

    };

    onTreeClick = () => {
        console.log('tree Clicked');
        const apple = Apples[Math.floor(Math.random * 3)];
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
                onTreeClick={this.onTreeClick}
                onTreeDrag={this.onTreeDrag}
                onTreeDragEnd={this.onTreeDragEnd} />);
    }
}