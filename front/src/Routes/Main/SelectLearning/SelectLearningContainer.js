import React from 'react';
import { withRouter } from 'react-router-dom';

import SelectLearningPresenter from './SelectLearningPresenter';
import ContentsList from '../ContentsList';

class Select extends React.Component {
    constructor({ location }) {
        super();
        this.state = {
            s_id: 4,
        }
        console.log(location);
    }


    componentDidMount() {

    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        console.log(this.props.history);
        const { s_id } = this.state;

        return (
            <SelectLearningPresenter
                ContentsList={ContentsList}
                goBack={this.goBack}
                s_id={s_id}
            />);
    }
}

export default withRouter(Select);