import React from 'react';
import { withRouter } from 'react-router-dom';
import StdManagingPresenter from './StdManagingPresenter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { student_modify, student_get, student_delete } from 'Sessions/action.js';
import moment from 'moment';

class StdManaging extends React.Component {

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    goBack = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        const { user } = this.props;
        const { dispatch } = this.props;
        const student = this.props.match.params.student;
        if (!student) {
            alert('잘못된 접근입니다.');
            this.props.history.push('/root/signin');
            return;
        }

        if (!user.user.u_id) {
            alert('잘못된 접근입니다.');
            this.props.history.push('/root/signin');
            return;
        }

        dispatch(student_get(student, user.user.u_id));
    }


    handleSubmit = (e, op, { name, birth, gender }) => {
        console.log(name, birth, gender);
        e.preventDefault();
        const { user } = this.props;
        const { dispatch } = this.props;

        const student = this.props.match.params.student;
        const icon = this.props.match.params.icon || user.student.ic_id;
        if (!icon) {
            alert('아이콘을 선택해주세요.');
            return false;
        }

        if (!name || !birth || !gender) {
            alert('빠진 부분 없이 입력해 주세요.');
            return false;
        }

        if (birth.length !== 8 || isNaN(birth) || !moment(birth, 'YYYYMMDD', true).isValid()) {
            alert('올바른 생일을 입력해 주세요.(예시: 20100813)');
            return false;
        }

        if (gender !== '남자' && gender !== '여자') {
            alert('올바른 성별을 입력해 주세요.(예시; 여자)');
            return false;
        }

        gender = (gender === '남자' ? 'm' : 'f');
        birth = moment(birth).format('YYYY-MM-DD');

        if (op === 'save') {
            dispatch(student_modify(name, birth, gender, icon, student, user.user.u_id));
            alert('저장했습니다.');
            this.props.history.push('/user/setting');
        } else if (op === 'delete') {
            if (window.confirm('정말 삭제하시겠습니까?')) {
                dispatch(student_delete(student, user.user.u_id));
                alert('삭제했습니다.');
                this.props.history.push('/user/setting');
            }
        }

        return true;
    }

    render() {
        console.log(this.props.history);
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        const { user } = this.props;
        console.log(user);
        if (!user.student.name) return null;
        return (
            <StdManagingPresenter
                student={user.student}
                iconNum={this.props.match.params.icon || undefined}
                handleSubmit={this.handleSubmit}
                goBack={this.goBack}
            />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(StdManaging));