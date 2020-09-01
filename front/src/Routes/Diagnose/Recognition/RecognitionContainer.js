import React from 'react';
import RecognitionPresenter from './RecognitionPresenter';

import { TTobak, Recognition } from 'images';

export default class extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */

    state = {
        Box: [Recognition.Box1_1, Recognition.Box2_1]
    };

    Clicked = (id) => {
        this.setState({

        });
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        const { Box } = this.state;
        return (
            <RecognitionPresenter
                TTobaki={TTobak.ttobak3_1}
                Box={Box}
                Clicked={this.Clicked}
            />);
    }
}