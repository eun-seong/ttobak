import React from 'react';
import { withRouter } from 'react-router-dom';

import SelectLearningPresenter from './SelectLearningPresenter';
import ContentsList from '../ContentsList';
import LoadingComp from 'Components/LoadingComp';

class Select extends React.Component {
    constructor({ location }) {
        super();
        this.state = {
            s_id: 4,
            isImageLoaded: !!location.state.isImageLoaded,
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
        const { s_id, isImageLoaded } = this.state;

        if (isImageLoaded)
            return (
                <SelectLearningPresenter
                    ContentsList={ContentsList}
                    goBack={this.goBack}
                    s_id={s_id}
                />);
        else return <LoadingComp />
    }
}

export default withRouter(Select);