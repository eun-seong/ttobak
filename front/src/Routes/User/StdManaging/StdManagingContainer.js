import React from 'react';
import { withRouter } from 'react-router-dom';
import Alert from 'Components/Alert';
import StdManagingPresenter from './StdManagingPresenter';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { student_modify, student_get, student_delete, response_clear } from 'Sessions/action.js';
import moment from 'moment';

class StdManaging extends React.Component {

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();

        this.enableAlert = false;
        this.isModifyCalled = false;
    }

    goBack = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        const { user } = this.props;
        const { dispatch } = this.props;

        const student = this.props.match.params.student;
        if (!student || !user.user.u_id) {
            this.props.history.push('/root/signin');
            return;
        }

        dispatch(student_get(student, user.user.u_id));
    }


    handleSubmit = (e, op, { name, birth, gender }) => {
        e.preventDefault();
        const { user } = this.props;
        const { dispatch } = this.props;

        const student = this.props.match.params.student;
        const icon = this.props.match.params.icon || user.student.ic_id;
        if (!icon) {
            this.makeAlert('아이콘을 선택해주세요.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            return false;
        }

        if (!name || !birth || !gender) {
            this.makeAlert('빠진 부분 없이 입력해 주세요.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            return false;
        }
        console.log(birth.length);
        if (birth.length !== 4 || isNaN(birth) || !moment(birth, 'YYYY', true).isValid()) {
            this.makeAlert('올바른 년도를 입력해 주세요.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            return false;
        }


        dispatch(response_clear());
        if (op === 'save') {
            this.makeAlert('정말 저장하시겠습니까?', true, (() => {
                dispatch(student_modify(name, birth, gender, icon, student, user.user.u_id));
            }), (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
        } else if (op === 'delete') {
            this.makeAlert('정말 삭제하시겠습니까?', true, (() => {
                dispatch(student_delete(student, user.user.u_id));
            }), (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
        }

        this.isModifyCalled = true;

        return true;
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
        if(this.isModifyCalled && user.response.data && user.response.data.code === 1) {
            this.props.history.push('/root/selectstd');
            this.isModifyCalled = false;
        }
    }

    render() {
        console.log(this.props.history);
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        const { user } = this.props;
        if (!user.student.name) return null;

        const alertComp = this.enableAlert ? (<Alert 
            text={this.alertText}
            isConfirm={this.isConfirm}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
        />) : '';

        return (
            <div>
                {alertComp}
                <StdManagingPresenter
                    student={user.student}
                    iconNum={this.props.match.params.icon || undefined}
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

export default connect(mapStateToProps)(withRouter(StdManaging));