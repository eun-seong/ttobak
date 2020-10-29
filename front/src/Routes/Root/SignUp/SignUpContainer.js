import React from 'react';
import { withRouter } from 'react-router-dom';
import SignUpPresenter from './SignUpPresenter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_register } from 'Sessions/action.js';

class SignUp extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    handleSubmit = (e, { name, email, pw, pw_check }) => {
        e.preventDefault();
        const { user } = this.props;
        const { dispatch } = this.props;
        if (pw !== pw_check) {
            alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
            return false;
        }

        dispatch(user_register(email, pw, name));
    };

    goBack = () => {
        this.props.history.goBack();
    };
    componentDidUpdate() {
        const { user } = this.props;
        const { history } = this.props;
        console.log(user);

        if (user.user.u_id) {
            alert('회원 가입에 성공했습니다.');
            window.localStorage.setItem('uid', user.user.u_id);
            this.props.history.push('/root/addstd');
        }

        if (user.response.data && user.response.data.code == 2) {
            alert('이미 존재하는 이메일입니다.');
        }
    }
    render() {


        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (<SignUpPresenter
            handleSubmit={this.handleSubmit}
            goBack={this.goBack}
        />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(SignUp));