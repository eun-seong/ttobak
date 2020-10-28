import React from 'react';
import SelectIconPresenter from './SelectIconPresenter';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { student_add } from 'Sessions/action.js';

class SelectIcon extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */

    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        const student = this.props.match.params.student;
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (<
            SelectIconPresenter
            student={student}
            handleSubmit={this.handleSubmit}
            goBack={this.goBack}
        />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
  }
  
export default connect(mapStateToProps)(withRouter(SelectIcon));