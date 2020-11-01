import React from 'react';
import { withRouter } from 'react-router-dom';
import StdInfoPresenter from './StdInfoPresenter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_get } from 'Sessions/action.js';
import { Stat_Api } from 'api';

class StdInfo extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            amount: 0,
            score: 0,
            voice_score: 0,
        }
    }

    async componentDidMount() {
        const { user } = this.props;
        const { dispatch } = this.props;

        if (!user.user.u_id || !user.student.s_id) {
            this.makeAlert('잘못된 접근입니다.', false, (() => {
                this.props.history.push('/root/signin');
            }));
            return;
        }

        const { data } = await Stat_Api.ask(user.student.s_id, true, 'day');
        console.log(data);

        this.setState({
            amount: data.amount[Object.keys(data.amount)[Object.keys(data.amount).length - 1]],
            score: data.score[Object.keys(data.score)[Object.keys(data.score).length - 1]],
            voice_score: data.voice_score[Object.keys(data.voice_score)[Object.keys(data.voice_score).length - 1]],
        })
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        console.log(this.props.history);

        const { user } = this.props;
        const { amount, score, voice_score } = this.state;

        return (
            <StdInfoPresenter
                student={user.student}
                goBack={this.goBack}
                amount={amount}
                score={score}
                voice_score={voice_score}
            />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(StdInfo));