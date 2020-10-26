import React from 'react';
import AddStudentPresenter from './AddStudentPresenter';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { student_add } from '../../../Sessions/action.js';

class AddStudent extends React.Component {
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

    handleSubmit = (e, {name, birth, gender}) => {
        e.preventDefault(); 
        const { user } = this.props;
        const {dispatch} = this.props;

        const icon = this.props.match.params.icon;
        if(icon !== undefined) {
            alert('아이콘을 선택해주세요.');
            return false;
        }

    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        return (<
            AddStudentPresenter
            handleSubmit={this.handleSubmit}
            id={this.setId} password={this.setPassword}
            goBack={this.goBack}
        />);
    }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(AddStudent));