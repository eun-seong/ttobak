import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderComp from 'Components/HeaderComp';
import SubmitButton from './SubmitButton';
import InputComp from './InputComp';

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10% 20%;
    justify-content: space-around;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 30px;
`;

const ButtonConainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

let state = {
    'pw': '', 
    'pw_check': ''
}

const onPwChange = (e) => {
    state['pw'] = e.target.value;
}

const onPwCheckChange = (e) => {
    state['pw_check'] = e.target.value;
}

const Settings = ({ goBack, handleSubmit }) => {
    return (
        <Container>
            <HeaderComp title={'비밀번호 변경'} goBack={goBack} />
            <Div>
                <InputContainer>
                    <InputComp text={'비밀번호'} placeholder={'****'} handler={onPwChange}/>
                    <InputComp text={'비밀번호 확안'} placeholder={'****'} handler={onPwCheckChange}/>
                </InputContainer>
                <ButtonConainer>
                    <SubmitButton isModify={true} text={'변경'} onClick={(e) => {handleSubmit(e, state);}} />
                    <SubmitButton isModify={false} text={'취소'} onClick={goBack} />
                </ButtonConainer>
            </Div>
        </Container>
    );
}

export default Settings;