import React from 'react';
import UserInfoPresenter from './UserInfoPresenter';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_get, user_delete, user_logout } from 'Sessions/action.js';

class UserInfo extends React.Component {

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    handleSubmit = (e, text) => {
        const {user} = this.props;
        const {dispatch} = this.props;
        if(text === '회원탈퇴') {
            dispatch(user_delete(user.user.u_id));
        } else if(text === '로그아웃') {
            dispatch(user_logout(user.user.u_id));
        }
    };

    componentDidMount() {
        const { user } = this.props;
        const {dispatch} = this.props;

        console.log(user);
        if(!user.user.u_id) {
            alert('잘못된 접근입니다.');
            this.props.history.push('/root/signin');
        }

        if(!user.user.email) {
            dispatch(user_get(user.user.u_id));
        }
    }
    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        console.log(this.props.history);
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        const { user } = this.props;
        if(!user.user.email) return null;
        
        return (
            <UserInfoPresenter
                email={user.user.email}
                handleSubmit={this.handleSubmit}
                goBack={this.goBack}
            />);
    }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(UserInfo));