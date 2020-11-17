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

const RadioBoxComp = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    align-items: center;
`;

const Text = styled.div`
    font-size: 1rem;
    padding-right: 20px;
`;

const Div = styled.div`
    width: 60%;
    text-align: left;
`;

const Label = styled.label`
    width: 40%;
    text-align: left;
    padding: 0 5px;
    display: inline-block;
    float: left;
    clear: none;
`;

const Radio = styled.input`
    margin: 2px 0 0 2px;
    float: left;
    clear: none;
`;

let inputState = {
    name: '',
    birth: '',
    gender: ''
};

const setName = (e) => {
    inputState['name'] = e.target.value;
}

const setBirth = (e) => {
    inputState['birth'] = e.target.value;
}

const setGender = (e) => {
    inputState['gender'] = e.target.value;
}

function AddStudentComp({ iconNum, state, handleSubmit }) {
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
                    <InputBoxComp text={'닉네임'} placeholder={'개미'} defaultValue={state.name} handler={setName} />
                    <InputBoxComp text={'태어난 년도'} placeholder={'2010'} defaultValue={state.birth} handler={setBirth} />
                    <RadioBoxComp>
                        <Text>{'성별'}</Text>
                        <Div>
                            <Radio type="radio" name="gender" id="radio_m" value="m" onClick={setGender} defaultChecked={state.gender === 'm'}/><Label htmlFor="radio_m">남자</Label>
                            <Radio type="radio" name="gender" id="radio_f" value="f" onClick={setGender} defaultChecked={state.gender === 'f'}/><Label htmlFor="radio_f">여자</Label>
                        </Div>
                    </RadioBoxComp>
                </InputComp>
            </StudentBox>
            <SubmitButton text={'검사 시작'} onClick={(e) => {handleSubmit(e, inputState);}} to='/' />
        </CompBox>
    );
}

export default AddStudentComp;
