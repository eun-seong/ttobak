import React from 'react';
import AddStudentPresenter from './AddStudentPresenter';
import { Root_Api } from 'api';
import { withRouter } from 'react-router-dom';

class AddStudent extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */
    state = {
        id: null,
        password: null,

    }

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        const { id, password } = this.state;

        return (<
            AddStudentPresenter
            handleSubmit={this.handleSubmit}
            id={this.setId} password={this.setPassword}
            goBack={this.goBack}
        />);
    }
}

export default withRouter(AddStudent);