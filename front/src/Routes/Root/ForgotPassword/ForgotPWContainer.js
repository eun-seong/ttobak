import React from 'react';
import ForgotPWPresenter from './ForgotPWPresenter';
import { withRouter } from 'react-router-dom';

class ForgetPassword extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */

    // TODO 비밀번호 찾기 후 알림 팝업창
    state = {
        id: null,
        password: null,

    }

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (<
            ForgotPWPresenter
            goBack={this.goBack}
        />);
    }
}

export default withRouter(ForgetPassword);