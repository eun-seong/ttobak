import React from 'react';
import { withRouter } from 'react-router-dom';
import StdStatisticsPresenter from './StdStatisticsPresenter';

import { D3 } from 'images';
import { Stat_Api } from 'api';

class StdStatstics extends React.Component {
    constructor () {
        super();
        this.state = {
            amount: {}, 
            score: {},
            voice_score: {},
            class: {},
            score_swp: {},
            score_ph: {},
            score_foc: {},
            is_cure: true,
            period: 'day',
            is_ready: false
        };
        this.Stat(4, true, 'day');
    }


    goBack = () => {
        this.props.history.goBack();
    }

    Stat = async (s_id, is_cure, period) => {
        const data = await Stat_Api.ask(s_id, is_cure, period);
        if(data.data.code == 'cure') {
            this.setState({
                amount: data.data.amount,
                score: data.data.score,
                voice_score: data.data.voice_score, 
                class: data.data.class,
                code: data.data.code, 
                is_ready: true
            });
        } else if(data.data.code == 'diagnose') {
            this.setState({
                score_swp: data.data.score_swp,
                score_ph: data.data.score_ph,
                score_foc: data.data.score_foc, 
                class: data.data.class, 
                code: data.data.code, 
                is_ready: true
            });
        }
        console.log(data.data);
    }

    render() {
        console.log(this.props.history);
        

        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (
            <StdStatisticsPresenter
                goBack={this.goBack}
                state={this.state}
                Stat={this.Stat}
                isReady={this.state.is_ready}
                isCure={this.state.is_cure}
                period={this.state.period}
            />);
    }
}

export default withRouter(StdStatstics);