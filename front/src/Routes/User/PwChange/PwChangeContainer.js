import React from 'react';
import { withRouter } from 'react-router-dom';
import PwChangePresenter from './PwChangePresenter';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { user_get, user_modify } from 'Sessions/action.js';

class PwChange extends React.Component {

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    handleSubmit = (e, {pw, pw_check}) => {
        e.preventDefault(); 
        const { user } = this.props;
        const {dispatch} = this.props;
        if(pw !== pw_check) {
            alert('비밀번호와 비밀번호 확인이 같지 않습니다.');
            return false;
        }

        dispatch(user_modify(user.user.email, pw, user.user.name, user.user.u_id));
        this.props.history.push('/root/signin');
    }

    componentDidMount() {

        const { user } = this.props;
        const {dispatch} = this.props;

        if(!user.user.u_id) {
            alert('잘못된 접근입니다.');
            this.props.history.push('/root/signin');
            return false;
        }

        dispatch(user_get(user.user.u_id));
    }

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
            <PwChangePresenter
                goBack={this.goBack}
                handleSubmit={this.handleSubmit}
            />);
    }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(PwChange));