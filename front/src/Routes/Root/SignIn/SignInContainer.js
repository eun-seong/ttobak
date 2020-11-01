import React from 'react';
import { withRouter } from 'react-router-dom';
import Alert from 'Components/Alert';
import SignInPresenter from './SignInPresenter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_autologin, user_signin, response_clear } from 'Sessions/action.js';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        const { dispatch } = this.props;

        this.enableAlert = false;
        this.isSigninCalled = false;

        dispatch(user_autologin());
    }

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };


    handleSubmit = (e, { email, pw }) => {
        e.preventDefault();
        const { user } = this.props;
        const { dispatch } = this.props;

        if (!email || !pw ) {
            this.makeAlert('빠진 부분 없이 입력해 주세요.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            return false;
        }

        dispatch(user_signin(email, pw));
        this.isSigninCalled = true;
    }
    makeAlert(text, isConfirm, onSubmit, onCancel) {
        this.enableAlert = true;
        this.alertText = text;
        this.isConfirm = isConfirm;
        this.onSubmit = onSubmit;
        this.onCancel = onCancel;

        this.forceUpdate();
    }

    componentDidUpdate() {
        const { user } = this.props;
        const { dispatch } = this.props;
        const { history } = this.props;
        
        if (user.isLoggedIn) {
            this.props.history.push('/root/selectstd');
            this.isSigninCalled = false;
            return;
        }

        if (this.isSigninCalled && user.response.data && user.response.data.code !== 1) {
            dispatch(response_clear());
            this.makeAlert('이메일과 비밀번호를 다시 확인해주세요.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            this.isSigninCalled = false;
        }
    }


    render() {

        const alertComp = this.enableAlert ? (<Alert 
            text={this.alertText}
            isConfirm={this.isConfirm}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
        />) : '';

        return (
            <div>
                {alertComp}
                <SignInPresenter
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(SignIn));