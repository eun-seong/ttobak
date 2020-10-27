import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from 'Components/Button';
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

function AddStudentComp({ iconNum, handleSubmit }) {
    // console.log(iconNum);
    let icon = <SelectIcon src={MainRoot.IconList[iconNum]} alt='프로필 사진' />
    if (!MainRoot.IconList[iconNum]) icon = <SelectIcon />

    return (
        <CompBox>
            <StudentBox>
                <Link to='/root/selecticon'>
                    {icon}
                </Link>
                <InputComp>
                    <InputBoxComp text={'닉네임'} placeholder={'개미'} handler={setName} />
                    <InputBoxComp text={'생일'} placeholder={'20100813'} handler={setBirth} />
                    <InputBoxComp text={'성별'} placeholder={'남자'} handler={setGender} />
                </InputComp>
            </StudentBox>
            <Div>
                <SubmitButton text={'저장'} onClick={(e) => {handleSubmit(e, state);}} to='/' />
                <SubmitButton text={'삭제'} onClick={(e) => {handleSubmit(e, state);}} to='/' />
            </Div>
        </CompBox>
    );
}

export default AddStudentComp;