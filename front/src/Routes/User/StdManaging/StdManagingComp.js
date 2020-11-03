import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from './SubmitButton';
import InputBoxComp from './InputBoxComp';
import { MainRoot } from 'images';

const CompBox = styled.div`
    display: flex;
    height: 100%;
    width: 80%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /* background-color: antiquewhite; */
`;

const StudentBox = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const InputComp = styled.div`
    display: flex;
    flex: 2;
    height: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 20px;
`;

const SelectIcon = styled.img`
    border-radius: 100%;
    background-color: grey;
    width: 100px;
    height: 100px;
`;

const Div = styled.div`
    display: flex;
    flex-direction: row;
    align-items: space-evenly;
`;

const Space = styled.div`
    width: 50px;
`;

let state = {
    name: '',
    birth: '',
    gender: ''
};

const setName = (e) => {
    state['name'] = e.target.value;
}

const setBirth = (e) => {
    state['birth'] = e.target.value;
}

const setGender = (e) => {
    state['gender'] = e.target.value;
}

function StdManagingComp({ student, iconNum, handleSubmit }) {
    // console.log(iconNum);
    let icon = <SelectIcon src={iconNum ? MainRoot.IconList[iconNum] : MainRoot.IconList[student.ic_id]} alt='프로필 사진' />;
    state = {name: student.name, birth: student.birth.replace(/-/g, ''), gender: (student.gender === 'm' ? '남자' : '여자')};

    return (
        <CompBox>
            <StudentBox>
                <Link to={'/user/selecticon/' + student.s_id}>
                    {icon}
                </Link>
                <InputComp>
                    <InputBoxComp key={state.name} text={'닉네임'} placeholder={state.name} handler={setName} />
                    <InputBoxComp key={state.birth} text={'생일'} placeholder={state.birth} handler={setBirth} />
                    <InputBoxComp key={state.gender} text={'성별'} placeholder={state.gender} handler={setGender} />
                </InputComp>
            </StudentBox>
            <Div>
                <SubmitButton isDelete={false} text={'저장'} onClick={(e) => {handleSubmit(e, 'save', state);}} to='/' />
                <SubmitButton isDelete={true} text={'삭제'} onClick={(e) => {handleSubmit(e, 'delete', state);}} to='/' />
            </Div>
        </CompBox>
    );
}

export default StdManagingComp;