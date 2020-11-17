import React from 'react';
import AddStudentPresenter from './AddStudentPresenter';
import Alert from 'Components/Alert';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { student_add, response_clear } from 'Sessions/action.js';
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

    constructor() {
        super();

        this.enableAlert = false;
        this.isStudentAddCalled = false;

        this.state = {
            name: '', 
            birth: '', 
            gender: 'm'
        };
    }

    goBack = () => {
        this.props.history.goBack();
    };

    handleSubmit = (e, state) => {
        e.preventDefault();
        const { user } = this.props;
        const { dispatch } = this.props;

        const {name, birth, gender} = state;
        this.setState({name, birth, gender});
        
        const icon = this.props.match.params.icon;
        if (!icon) {
            
            this.makeAlert('아이콘을 선택해주세요.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            return false;
        }

        if (!name || !birth || !gender) {
            this.makeAlert('빠진 부분 없이 입력해 주세요.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            return false;
        }

        if (birth.length !== 4 || isNaN(birth) || !moment(birth, 'YYYY', true).isValid()) {
            this.makeAlert('올바른 년도를 입력해 주세요.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            return false;
        }

        dispatch(student_add(name, birth, gender, icon, user.user.u_id));
        this.isStudentAddCalled = true;

        return true;
    }

    makeAlert(text, isConfirm, onSubmit, onCancel) {
        this.enableAlert = true;
        this.alertText = text;
        this.isConfirm = isConfirm;
        this.onSubmit = onSubmit;
        this.onCancel = onCancel;

        this.forceUpdate();
    }

    componentDidMount() {
        const { user } = this.props;
        if (!user.user.u_id) {
            this.makeAlert('잘못된 접근입니다.', false, (() => {
                this.props.history.push('/root/signin');
            }));
        }
    }

    componentDidUpdate() {
        const { user } = this.props;
        const { dispatch } = this.props;

        if (this.isStudentAddCalled && user.student.s_id && user.user.u_id) {
            dispatch(response_clear());
            this.makeAlert('학습자 추가가 완료되었습니다.', false, (() => {
                this.props.history.push('/main/main');
            }));
            this.isStudentAddCalled = false;
            return;
        }

        if (this.isStudentAddCalled && user.response.data && user.response.data.code === 2) {
            dispatch(response_clear());
            this.makeAlert('존재하지 않는 회원입니다.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            this.isStudentAddCalled = false;
        }

        if (this.isStudentAddCalled && user.response.data && user.response.data.code === 3) {
            dispatch(response_clear());
            this.makeAlert('학습자는 3명까지 추가 가능합니다.', false, (() => {
                this.enableAlert = false;
                this.forceUpdate();
            }));
            this.isStudentAddCalled = false;
        }
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        const alertComp = this.enableAlert ? (<Alert
            text={this.alertText}
            isConfirm={this.isConfirm}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
        />) : '';
        
        return (
            <div>
                {alertComp}
                <AddStudentPresenter
                    handleSubmit={this.handleSubmit}
                    iconNum={this.props.match.params.icon}
                    state={this.state}
                    goBack={this.goBack}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(AddStudent));