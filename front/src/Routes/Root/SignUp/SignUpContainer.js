import React from 'react';
import SignUpPresenter from './SignUpPresenter';
import { Root_Api } from 'api';

export default class extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */
    state = {
        id: null,
        password: null,

    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (<
            SignUpPresenter
        />);
    }
}
