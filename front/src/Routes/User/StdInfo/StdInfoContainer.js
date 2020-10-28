import React from 'react';
import { withRouter } from 'react-router-dom';
import StdInfoPresenter from './StdInfoPresenter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_get } from 'Sessions/action.js';

class StdInfo extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };
    componentDidMount() {
        const {user} = this.props;
        const {dispatch} = this.props;

        if(!user.user.u_id || !user.student.s_id) {
            alert('잘못된 접근입니다.');
            this.props.history.push('/root/signin');
            return;
        }
        
    }

    goBack = e => {
        this.preventDefault = true;
        this.props.history.goBack();
        e.stopPropagation();
        this.preventDefault = false;
        e.nativeEvent.stopImmediatePropagation();
    }

    render() {
        console.log(this.props.history);
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        const {user} = this.props;
    
        return (
            <StdInfoPresenter
                student={user.student}
                goBack={this.goBack}
            />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(StdInfo));