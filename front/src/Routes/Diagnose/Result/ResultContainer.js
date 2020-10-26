import React from 'react';
import ResultPresenter from './ResultPresenter';

import { Result_Api } from 'api';

export default class extends React.Component {
    constructor() {
        super();
        this.result = null;

        this.state = {
            s_id: 4,
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
            },
        }
    }

    async componentDidMount() {
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