import React from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectLearningPresenter from './SelectLearningPresenter';
import ContentsList from '../ContentsList';
import LoadingComp from 'Components/LoadingComp';

class Select extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ location }) {
        super();
        this.state = {
            isImageLoaded: !!location.state.isImageLoaded,
        }
        console.log(location);
    }


    componentDidMount() {
        const { user } = this.props;
        const { history } = this.props;
        
        if(!user.user.u_id) {
            this.props.history.push('/root/signin');
            return;
        }

        if(!user.student.s_id) {
            this.props.history.push('/root/selectstd');
            return;
        }

    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        console.log(this.props.history);
        const { user } = this.props;
        const s_id = user.student.s_id;
        const { isImageLoaded } = this.state;

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

function mapStateToProps(state) {
    return { user: state.user }
  }
  
  export default connect(mapStateToProps)(withRouter(Select));