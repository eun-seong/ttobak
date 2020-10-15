import React from 'react';
import { withRouter } from 'react-router-dom';
import MainPresenter from './MainPresenter';

import { Daily_Api } from 'api';

class Main extends React.Component {
    state = {
        s_id: 4,
    }

    goBack = e => {
        this.preventDefault = true;
        this.props.history.goBack();
        e.stopPropagation();
        this.preventDefault = false;
        e.nativeEvent.stopImmediatePropagation();
    }

    async componentDidMount() {
        // const { s_id } = this.state;
        // try {
        //     const { data } = await Daily_Api.ask(s_id);
        //     console.log(data);

        //     if (data.code === 1) {

        //     }
        // }
        // catch (e) {
        //     console.log(e);
        // }
    }

    render() {
        console.log(this.props.history);
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (
            <MainPresenter
                goBack={this.goBack}
            />);
    }
}

export default withRouter(Main);