import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from 'Components/Button';
import InputBoxComp from './InputBoxComp';

const CompBox = styled.div`
    display: flex;
    height: 100%;
    width: 80%;
    flex-direction: column;
    justify-content: space-evenly;
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

const SelectIcon = styled.button`
    border-radius: 100%;
    background-color: grey;
    width: 100px;
    height: 100px;
`;

function AddStudentComp({ handleSubmit }) {
    return (
        <CompBox>
            <StudentBox>
                <SelectIcon />
                <InputComp>
                    <InputBoxComp text={'이름'} />
                    <InputBoxComp text={'생년월일'} />
                    <InputBoxComp text={'성별'} />
                </InputComp>
            </StudentBox>
            <Link to='/'>
                <SubmitButton onClick={handleSubmit} text={'검사 시작'} />
            </Link>
        </CompBox>
    );
}

export default AddStudentComp;