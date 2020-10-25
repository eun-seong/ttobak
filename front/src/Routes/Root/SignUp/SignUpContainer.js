import React from 'react';
import { withRouter } from 'react-router-dom';
import SignUpPresenter from './SignUpPresenter';
import { Root_Api } from 'api';

class SignUp extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */

    handleSubmit = async (e, {name, email, pw, pw_check}) => {
        console.log(name, email, pw, pw_check);
        if(pw !== pw_check) {
            alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
            return false;
        }

        const data = await Root_Api.user_register(email, pw, name);
        if(!data) {
            alert('네트워크를 확인해 보세요.');
            return false;
        }

        if(data.data.code == 2) {
            alert('이미 존재하는 이메일입니다.');
            return false;
        }

        alert('회원 가입에 성공했습니다.');
        this.props.history.push('/root/addstd');
    };

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        const { history } = this.props;
        console.log(history);
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (<
            SignUpPresenter
            handleSubmit={this.handleSubmit}
            goBack={this.goBack}
        />);
    }
}

export default withRouter(SignUp);