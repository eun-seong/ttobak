import React from 'react';
import AddStudentPresenter from './AddStudentPresenter';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { student_add } from 'Sessions/action.js';
import moment from 'moment';

class AddStudent extends React.Component {
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

    handleSubmit = (e, {name, birth, gender}) => {
        e.preventDefault(); 
        const { user } = this.props;
        const {dispatch} = this.props;

        const icon = this.props.match.params.icon;
        if(icon === undefined) {
            alert('아이콘을 선택해주세요.');
            return false;
        }

        if(!name || !birth || !gender) {
            alert('빠진 부분 없이 입력해 주세요.');
            return false;
        }

        if(birth.length !== 8 || isNaN(birth) || !moment(birth, 'YYYYMMDD', true).isValid()) {
            alert('올바른 생일을 입력해 주세요.(예시: 20100813)');
            return false;
        }

        if(gender !== '남자' && gender !== '여자') {
            alert('올바른 성별을 입력해 주세요.(예시; 여자)');
            return false;
        }

        gender = (gender === '남자' ? 'm' : 'f');
        birth = moment(birth).format('YYYY-MM-DD');
        
        console.log(user);
        dispatch(student_add(name, birth, gender, icon, user.user.u_id));

        return true;
    }
    componentDidMount() {
        const { user } = this.props;
        console.log(user);
        if(!('u_id' in user.user)) {
            alert('잘못된 접근입니다.');
            this.props.history.push('/root/signin');
        }
    }

    componentDidUpdate() {
        const { user } = this.props;
        console.log(user);
        if(('s_id' in user.student) && ('u_id' in user.user))  {
            alert('사용자 추가를 성공했습니다.');
            this.props.history.push('/');
        }

        if(user.response.data && user.response.data.code == 2) {
            alert('존재하지 않는 회원입니다.');
        }
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        return (<
            AddStudentPresenter
            handleSubmit={this.handleSubmit}
            iconNum={this.props.match.params.icon}
            goBack={this.goBack}
        />);
    }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(AddStudent));