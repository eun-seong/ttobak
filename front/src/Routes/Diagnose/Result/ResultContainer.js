import React from 'react';
import ResultPresenter from './ResultPresenter';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Result_Api } from 'api';

const initState = {
    result: {
        '선택적집중력': {
            '총 문제 수 ': 0,
            '평균 발음 정확도': 0
        },
        '음운청취력': {
            '맞은 갯수': 0,
            '총 문제 수': 0
        },
        '청각처리속도': {
            '맞은 갯수': 0,
            '총 문제 수': 0
        },
        '총 맞은 갯수': 0,
        '총 문제 갯수': 0
    }
}
class Result extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };


    constructor() {
        super();
        this.result = null;

        this.state = initState;
    }

    async componentDidMount() {
        const { user } = this.props;

        if (!user.user.u_id) {
            this.props.history.push('/root/signin');
            return;
        }

        if (!user.student.s_id) {
            this.props.history.push('/root/selectstd');
            return;
        }

        Result_Api.ask(this.state.s_id)
            .then(result => {
                console.log(result.data.results);
                let tmp_result = result.data.results;
                tmp_result['선택적집중력']['총 문제 수'] = 0;

                this.setState({
                    result: tmp_result,
                });
            });
    }

    render() {
        const { result } = this.state;

        return (
            <ResultPresenter
                result={result}
            />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(Result));