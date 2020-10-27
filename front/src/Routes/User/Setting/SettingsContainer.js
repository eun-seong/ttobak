import React from 'react';
import { withRouter } from 'react-router-dom';
import SettingsPresenter from './SettingsPresenter';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { student_add } from 'Sessions/action.js';

class Setting extends React.Component {

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        console.log(this.props.history);
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (
            <SettingsPresenter
                goBack={this.goBack}
            />);
    }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(Setting));