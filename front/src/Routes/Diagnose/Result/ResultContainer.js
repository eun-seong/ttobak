import React from 'react';
import ResultPresenter from './ResultPresenter';

import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Result extends React.Component {

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

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

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (
            <ResultPresenter
            />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
  }
  
  export default connect(mapStateToProps)(withRouter(Result));