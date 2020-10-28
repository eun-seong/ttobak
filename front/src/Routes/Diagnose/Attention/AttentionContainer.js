import React from 'react';
import { withRouter } from 'react-router-dom';
import AttentionPresenter from './AttentionPresenter';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { D3 } from 'images';
import { D3_Api } from 'api';

class Attention extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            gameState: false
        };
    }

    componentDidMount() {
        const { user } = this.props;
        
        if(!user.user.u_id) {
            this.props.history.push('/root/signin');
            return;
        }

        if(!user.student.s_id) {
            this.props.history.push('/root/selectstd');
            return;
        }

    }

    Test = async () => {
        const { user } = this.props;

        const data = await D3_Api.ask(1, user.student.s_id);
        console.log(data);
    }

    render() {
        this.Test();
        return (<AttentionPresenter
            Background={D3.d3_background}
        />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(Attention));