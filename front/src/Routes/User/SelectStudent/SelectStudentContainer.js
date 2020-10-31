import React from 'react';
import SelectStudentPresenter from './SelectStudentPresenter';
import { withRouter } from 'react-router-dom';
import Alert from 'Components/Alert';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_get, student_get } from 'Sessions/action.js';

class SelectStudent extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this.enableAlert = false;
    }

    goBack = () => {
        this.props.history.goBack();
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

        if(!user.user.u_id) {
            this.makeAlert('잘못된 접근입니다.', false, (() => {
                this.props.history.push('/root/signin');
            }));
            return;
        }

        dispatch(user_get(user.user.u_id));
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        const { user } = this.props;
        const alertComp = this.enableAlert ? (<Alert 
            text={this.alertText}
            isConfirm={this.isConfirm}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
        />) : '';

        return (
            <div>
                {alertComp}
                <SelectStudentPresenter
                    students={user.user.students || []}
                    goBack={this.goBack}
                />
            </div>
            );
    }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(SelectStudent));