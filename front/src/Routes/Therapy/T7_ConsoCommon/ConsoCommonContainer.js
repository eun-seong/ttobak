import React from 'react';
import ConsoCommonPresenter from './ConsoCommonPresenter';

import { T7, Characters } from 'images';

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
        return (<ConsoCommonPresenter
            Background={T7.t7_background}
            Card={[Characters.card1, Characters.card2]}
        />);
    }
}