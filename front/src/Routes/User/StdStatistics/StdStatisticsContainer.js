import React, { useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import StdStatisticsPresenter from './StdStatisticsPresenter';
import Alert from 'Components/Alert';

import { Stat_Api, Daily_Api } from 'api';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class StdStatstics extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
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
            is_ready: false,
        };
        this.enableAlert = false;

        const { user } = props;

        if (!user.user.u_id || !user.student.s_id) {
            this.makeAlert('잘못된 접근입니다.', false, (() => {
                props.history.push('/root/signin');
            }));
            return;
        }
        this.Stat(true, 'day');
    }

    goBack = () => {
        this.props.history.goBack();
    }


    Stat = async (is_cure, period) => {
        const { user } = this.props;
        const data = await Stat_Api.ask(user.student.s_id, is_cure, period);
        if (data.data.code === 'cure') {
            this.setState({
                amount: data.data.amount,
                score: data.data.score,
                voice_score: data.data.voice_score,
                class: data.data.class,
                code: data.data.code,
                period: period,
                is_ready: true
            });
        } else if (data.data.code === 'diagnose') {
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

    makeAlert(text, isConfirm, onSubmit, onCancel) {
        this.enableAlert = true
        this.alertText = text;
        this.isConfirm = isConfirm;
        this.onSubmit = onSubmit;
        this.onCancel = onCancel;

        this.forceUpdate();
    }

    isFirstDiag = async () => {
        const { data } = await Daily_Api.did(this.props.user.student.s_id);
        console.log(data);

        if (data.is_first) {
            this.makeAlert('첫 번째 검사를 진행해주세요', false, () => {
                this.enableAlert = false;
                this.forceUpdate();
            });
        }
        else this.props.history.push('/diagnose/result');
    }

    render() {
        console.log(this.props.history);
        const { user } = this.props;

        const alertComp = this.enableAlert ? (<Alert
            text={this.alertText}
            isConfirm={this.isConfirm}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
        />) : '';

        return (
            <div>
                {alertComp}
                <StdStatisticsPresenter
                    student={user.student}
                    goBack={this.goBack}
                    state={this.state}
                    Stat={this.Stat}
                    isReady={this.state.is_ready}
                    isCure={this.state.is_cure}
                    period={this.state.period}
                    isFirstDiag={this.isFirstDiag}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(StdStatstics));