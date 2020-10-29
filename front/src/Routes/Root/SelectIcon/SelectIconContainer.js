import React from 'react';
import SelectIconPresenter from './SelectIconPresenter';
import { withRouter } from 'react-router-dom';

class SelectIcon extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (<
            SelectIconPresenter
            handleSubmit={this.handleSubmit}
            goBack={this.goBack}
        />);
    }
}

export default withRouter(SelectIcon);