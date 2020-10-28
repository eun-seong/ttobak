import React from 'react';
import { withRouter } from 'react-router-dom';
import StdChangePresenter from './StdChangePresenter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_get, student_change } from 'Sessions/action.js';

class StdChange extends React.Component {

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    goBack = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        const {user} = this.props;
        const {dispatch} = this.props;

        if(!user.user.u_id) {
            alert('잘못된 접근입니다.');
            this.props.history.push('/root/signin');
            return;
        }

        dispatch(user_get(user.user.u_id));
    }


    handleSubmit = (e, s_id) => {
        e.preventDefault(); 

        const {user} = this.props;
        const {dispatch} = this.props;

        console.log(s_id);

        dispatch(student_change(s_id));
        this.props.history.push('/');

        return true;
    }

    render() {
        console.log(this.props.history);
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        
       const { user } = this.props;
        
       return (<
           StdChangePresenter
           students={user.user.students || []}
           handleSubmit={this.handleSubmit}
           goBack={this.goBack}
       />);
    }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(StdChange));