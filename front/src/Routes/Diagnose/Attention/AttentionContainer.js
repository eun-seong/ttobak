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

    constructor(s_id) {
        super();
        this.state = {
            gameState: false,
            s_id: s_id || 4,                            // 학습자 아이디
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
        const data = await D3_Api.ask(1, 4);
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