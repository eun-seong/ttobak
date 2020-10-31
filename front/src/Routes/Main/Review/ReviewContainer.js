import React from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReviewPresenter from './ReviewPresenter';
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
        
        if(!user.user.u_id || !user.student.s_id) {
            this.props.history.push('/root/signin');
            return;
        }

    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        console.log(this.props.history);
        const { isImageLoaded } = this.state;
        const { user } = this.props;
        const s_id = user.student.s_id;

        if (isImageLoaded)
            return (
                <ReviewPresenter
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