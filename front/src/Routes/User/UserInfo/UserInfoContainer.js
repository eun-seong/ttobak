import React from 'react';
import UserInfoPresenter from './UserInfoPresenter';
import Alert from 'Components/Alert';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_get, user_delete, user_logout } from 'Sessions/action.js';

class UserInfo extends React.Component {

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.enableAlert = false;
    }

    handleSubmit = (e, text) => {
        const {user} = this.props;
        const {dispatch} = this.props;
        if(text === '회원탈퇴') {
            this.makeAlert('정말 탈퇴하시겠습니까?', true, (() => {
                dispatch(user_delete(user.user.u_id));
                this.props.history.push('/root/signin');
            }), (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
        } else if(text === '로그아웃') {
            this.makeAlert('정말 로그아웃하시겠습니까?', true, (() => {
                dispatch(user_logout(user.user.u_id));
                this.props.history.push('/root/signin');
            }), (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
        }
    };

    makeAlert(text, isConfirm, onSubmit, onCancel) {
        this.enableAlert = true;
        this.alertText = text;
        this.isConfirm = isConfirm;
        this.onSubmit = onSubmit;
        this.onCancel = onCancel;

        this.forceUpdate();
    }

    componentDidMount() {
        const { user } = this.props;
        const {dispatch} = this.props;

        console.log(user);
        if(!user.user.u_id) {
            this.makeAlert('잘못된 접근입니다.', false, (() => {
                this.props.history.push('/root/signin');
            }));
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

        const alertComp = this.enableAlert ? (<Alert 
            text={this.alertText}
            isConfirm={this.isConfirm}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
        />) : '';
        
        return (
            <div>
                {alertComp}
                <UserInfoPresenter
                    email={user.user.email}
                    handleSubmit={this.handleSubmit}
                    goBack={this.goBack} 
                />
            </div>);
    }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(UserInfo));