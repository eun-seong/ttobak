import React from 'react';
import { T3, TTobak } from 'images';
import CommonPresenter from './CommonPresenter';

export default class extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */
    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        return (<CommonPresenter
            Background={T3.t3_background}
            TTobak={TTobak.ttobak1_1}
            boxList={['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ']}
            BoxImg={T3.t3_textbox}
        />);
    }
}