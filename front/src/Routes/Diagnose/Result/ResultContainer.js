import React from 'react';
import ResultPresenter from './ResultPresenter';

import { Statistics_Api } from 'api';

export default class extends React.Component {
    constructor() {
        super();
        this.result = null;

        this.state = {
            s_id: 4,
        }
    }

    async componentDidMount() {
        Statistics_Api.ask(this.state.s_id, 'test', 'day')
            .then((result) => {
                console.log(result);
                this.result = result.data;
            });

    }

    render() {

        return (
            <ResultPresenter
            />);
    }
}