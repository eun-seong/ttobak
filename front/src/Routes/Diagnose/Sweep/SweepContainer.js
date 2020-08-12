import React from 'react';
import SweepPresenter from './SweepPresenter';

import UpButton_UP from 'img/d1_sweep/up.png';
import DownButton_UP from 'img/d1_sweep/down.png';
import UpButton_DOWN from 'img/d1_sweep/up_pushed.png';
import DownButton_DOWN from 'img/d1_sweep/down_pushed.png';

const UP = 'up';
const DOWN = 'down';

export default class extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */
    state = {
        UpButton: UpButton_UP,
        DownButton: DownButton_UP
    };

    onMouseDown = (id) => {
        switch (id) {
            case DOWN:
                // console.log('down-down');
                this.setState(
                    { DownButton: DownButton_DOWN }
                );
                break;
            case UP:
                // console.log('up-down');
                this.setState(
                    { UpButton: UpButton_DOWN }
                );
                break;
            default:
        }
    }

    onMouseUp = (id) => {
        switch (id) {
            case DOWN:
                // console.log('down-up');
                this.setState(
                    { DownButton: DownButton_UP }
                );
                break;
            case UP:
                // console.log('up-up');
                this.setState(
                    { UpButton: UpButton_UP }
                );
                break;
            default:
        }
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        const { UpButton, DownButton } = this.state;

        return (<SweepPresenter
            UP={UP} DOWN={DOWN}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            UpButton={UpButton}
            DownButton={DownButton} />);
    }
}