import React from 'react';
import ResultPresenter from './ResultPresenter';

import { Statistics_Api } from 'api';

export default class extends React.Component {
    constructor() {
        super();

        this.state = {
            s_id: 4,
        }
    }

    async componentDidMount() {
        const data = Statistics_Api.ask(this.state.s_id, 'test', 'day');
        console.log(data);
    }

    render() {

        return (
            <ResultPresenter
            />);
    }
}