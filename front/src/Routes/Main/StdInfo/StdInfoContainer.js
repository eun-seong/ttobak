import React from 'react';
import { withRouter } from 'react-router-dom';
import StdInfoPresenter from './StdInfoPresenter';

class StdInfo extends React.Component {

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (
            <StdInfoPresenter
                goBack={this.goBack}
            />);
    }
}

export default withRouter(StdInfo);