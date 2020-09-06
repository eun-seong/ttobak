import React from 'react';
import SignInPresenter from './SignInPresenter';
import { Root_Api } from 'api';

export default class extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */
    state = {
        id: null,
        password: null,

    }

    handleSubmit = async () => {
        console.log(this.state);

        const { id, password } = this.state;
        const data = await Root_Api.signin(id, password);
        if (data.code === 1) {
            console.log(data.message);
        }
    }

    setId = ({ id }) => {
        this.setState({
            id: id
        })
    }

    setPassword = ({ password }) => {
        this.setState({
            password: password
        })
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        const { id, password } = this.state;

        return (<
            SignInPresenter
            handleSubmit={this.handleSubmit}
            id={this.setId} password={this.setPassword}
        />);
    }
}
