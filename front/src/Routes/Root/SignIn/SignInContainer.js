import React from 'react';
import { withRouter } from 'react-router-dom';
import SignInPresenter from './SignInPresenter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_autologin, user_signin } from 'Sessions/action.js';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        const { dispatch } = this.props;

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

        dispatch(user_signin(email, pw));
    }
    componentDidUpdate() {
        const { user } = this.props;
        const { history } = this.props;

        if (user.user.u_id) {
            console.log(user.user.u_id === 'undefined');
            window.localStorage.setItem('uid', user.user.u_id);
            this.props.history.push('/root/selectstd');
            return;
        }

        if (!user.fetchingUpdate && user.response.data && user.response.data.code !== 1) {
            alert('이메일과 비밀번호를 다시 확인해주세요.');
        }
    }


    render() {

        return (<SignInPresenter
            handleSubmit={this.handleSubmit}
        />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(SignIn));