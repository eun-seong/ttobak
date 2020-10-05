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

function AddStudentComp({ iconNum }) {
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
                    <InputBoxComp text={'이름'} />
                    <InputBoxComp text={'생년월일'} />
                    <InputBoxComp text={'성별'} />
                </InputComp>
            </StudentBox>
            <SubmitButton text={'검사 시작'} to='/' />
        </CompBox>
    );
}

export default AddStudentComp;