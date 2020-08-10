import React, { useState } from 'react';
import CountingPresenter from './CountingPresenter';

export default class extends React.Component {
    state = {
        count: 0,
    };

    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */


    onClick = () => {
        this.setState({ count: this.state.count + 1 });
        console.log(this.state.count);
    };

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        return (<CountingPresenter onClick={this.onClick} />);
    }
}