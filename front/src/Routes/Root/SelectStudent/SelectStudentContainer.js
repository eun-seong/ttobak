import React from 'react';
import SelectStudentPresenter from './SelectStudentPresenter';
import { Root_Api } from 'api';
import { withRouter } from 'react-router-dom';
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


    goBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = (e, s_id) => {
        e.preventDefault();

        const { user } = this.props;
        const { dispatch } = this.props;

        dispatch(student_get(s_id, user.user.u_id));
    }

    componentDidMount() {
        const { user } = this.props;
        const { dispatch } = this.props;
        console.log(user.user.u_id);

        if (!user.user.u_id) {
            alert('잘못된 접근입니다.');
            this.props.history.push('/root/signin');
            return;
        }

        dispatch(user_get(user.user.u_id));
    }

    componentDidUpdate() {
        const { user } = this.props;

        if (user.student.s_id) {
            this.props.history.push('/');
            return;
        }
        if (user.response.data && user.response.data.code !== 1) {
            alert('존재하지 않는 회원입니다.');
            return;
        }
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        const { user } = this.props;
        return (<
            SelectStudentPresenter
            students={user.user.students || []}
            handler={this.handleSubmit}
            goBack={this.goBack}
        />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(SelectStudent));