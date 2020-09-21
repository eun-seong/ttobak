import React from 'react';
import UserInfoPresenter from './UserInfoPresenter';

export default class extends React.Component {

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        console.log(this.props.history);
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (
            <UserInfoPresenter
                goBack={this.goBack}
            />);
    }
}