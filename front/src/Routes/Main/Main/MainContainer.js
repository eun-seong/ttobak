import React from 'react';
import MainPresenter from './MainPresenter';

export default class extends React.Component {

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (
            <MainPresenter
            />);
    }
}