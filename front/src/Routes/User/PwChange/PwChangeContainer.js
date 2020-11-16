import React from 'react';
import { withRouter } from 'react-router-dom';
import PwChangePresenter from './PwChangePresenter';
import Alert from 'Components/Alert';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_get, user_modify, user_logout, response_clear } from 'Sessions/action.js';

class PwChange extends React.Component {

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this.enableAlert = false;
        this.isModifyCalled = false;
    }

    handleSubmit = (e, { pw, pw_check }) => {
        e.preventDefault();
        const { user } = this.props;
        const { dispatch } = this.props;

        if (pw !== pw_check) {
            this.makeAlert('비밀번호와 비밀번호 확인이 같지 않습니다.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            return false;
        }

        dispatch(user_modify(user.user.email, pw, user.user.name, user.user.u_id));
        this.isModifyCalled = true;
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

        if (this.isModifyCalled && user.response && user.response.data.code === 1) {
            dispatch(response_clear());
            this.makeAlert('비밀번호를 변경했습니다.', false, (() => {
                dispatch(user_logout());
                this.props.history.push('/root/signin');
            }));
            this.isModifyCalled = false;
            return;
        }
    }

    componentDidMount() {
        const { user } = this.props;
        const { dispatch } = this.props;

        if (!user.user.u_id) {
            this.makeAlert('잘못된 접근입니다.', false, (() => {
                this.props.history.push('/root/signin');
            }));
            return false;
        }

        dispatch(user_get(user.user.u_id));
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

        const alertComp = this.enableAlert ? (<Alert
            text={this.alertText}
            isConfirm={this.isConfirm}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
        />) : '';

        return (
            <div>
                {alertComp}
                <PwChangePresenter
                    goBack={this.goBack}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(PwChange));