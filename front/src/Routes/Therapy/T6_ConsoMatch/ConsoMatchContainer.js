import React from 'react';
import ConsoMatchPresenter from './ConsoMatchPresenter';

import { T6, Characters } from 'images';

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
        return (<ConsoMatchPresenter
            Background={T6.t6_background}
            Worm={Characters.worm2_1}
            frameList={[T6.t6_excpic, T6.t6_excpic, T6.t6_excpic]}
        />);
    }
}