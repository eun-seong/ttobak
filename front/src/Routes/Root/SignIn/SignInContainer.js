import React from 'react';
import { withRouter } from 'react-router-dom';
import SignInPresenter from './SignInPresenter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_autologin, user_signin } from 'Sessions/action.js';

class SignIn extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */

    constructor(props) {
        super(props);
        const { dispatch } = this.props;

        dispatch(user_autologin());
    }

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };


    handleSubmit = (e, {email, pw}) => {
        e.preventDefault(); 
        const { user } = this.props;
        const {dispatch} = this.props;

        dispatch(user_signin(email, pw));
    }
    componentDidUpdate() {
        const { user } = this.props;
        const { history } = this.props;
        
        if('u_id' in user.user) {
            window.localStorage.setItem('uid', user.user.u_id);
            this.props.history.push('/root/selectstd');
            return;
        }

        if(!user.fetchingUpdate && user.response.data && user.response.data.code !== 1) {
            alert('이메일과 비밀번호를 다시 확인해주세요.');
        }
    }


    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (<
            SignInPresenter
            handleSubmit={this.handleSubmit}
        />);
    }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(SignIn));