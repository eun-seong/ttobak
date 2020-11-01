import React from 'react';
import { withRouter } from 'react-router-dom';
import Alert from 'Components/Alert';
import SignUpPresenter from './SignUpPresenter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_register, response_clear } from 'Sessions/action.js';

class SignUp extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */

    constructor() {
        super();
        this.enableAlert = false;
        this.isRegisterCalled = false;
    }

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    handleSubmit = (e, { name, email, pw, pw_check }) => {
        e.preventDefault();
        const { user } = this.props;
        const { dispatch } = this.props;

        if (!name || !email || !pw || !pw_check) {
            this.makeAlert('빠진 부분 없이 입력해 주세요.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            return false;
        }

        if (pw !== pw_check) {
            this.makeAlert('비밀번호와 비밀번호 확인이 같지 않습니다.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            return false;
        }

        dispatch(user_register(email, pw, name));
        this.isRegisterCalled = true;
    };

    makeAlert(text, isConfirm, onSubmit, onCancel) {
        this.enableAlert = true;
        this.alertText = text;
        this.isConfirm = isConfirm;
        this.onSubmit = onSubmit;
        this.onCancel = onCancel;

        this.forceUpdate();
    }

    goBack = () => {
        this.props.history.goBack();
    };

    componentDidUpdate() {
        const { user } = this.props;
        const { dispatch } = this.props;
        const { history } = this.props;
        
        
        if (user.user.u_id && this.isRegisterCalled && user.response.data && user.response.data.code === 1) {
            this.makeAlert('회원 가입에 성공했습니다.', false, (() => {
                this.props.history.push('/root/signin');
            }));
            this.isRegisterCalled = false;
            return;
        }

        if (this.isRegisterCalled && user.response.data && user.response.data.code === 2) {
            dispatch(response_clear());
            this.makeAlert('이미 존재하는 이메일입니다.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            this.isRegisterCalled = false;
        }
    }
    render() {


        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        const alertComp = this.enableAlert ? (<Alert 
            text={this.alertText}
            isConfirm={this.isConfirm}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
        />) : '';

        return (
            <div>
                {alertComp}
                <SignUpPresenter
                    handleSubmit={this.handleSubmit}
                    goBack={this.goBack}
                />
            </div>
        
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(SignUp));