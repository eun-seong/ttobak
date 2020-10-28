import React from 'react';
import styled from 'styled-components';

import UserInfoButton from './UserInfoButton';

const InputComp = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    align-items: center;
`;

const Comp = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 20px;
`;

const Title = styled.div`
    font-size: 1.4rem;
    padding-right: 20px;
`;

const AccountBox = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
`;

const TextBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* opacity: 0%; */
`;

const Email = styled.div`
    font-size: 1.3rem;
    padding-left: 5px;
`;

const Line = styled.div`
    height: 2px;
    width: 100%;
    margin-top: 2px;
    background-color: #d2d2d2;
`;

function InputBoxComp({ email }) {
    return (
        <InputComp>
            <Comp>
                <Title>나의 계정</Title>
                <AccountBox>
                    <TextBox>
                        <Email>{email || 'test123@gmail.com'}</Email>
                        <UserInfoButton text={'이메일 인증'} />
                    </TextBox>
                    <Line />
                </AccountBox>
            </Comp>
            <Comp>
                <Title>주변 센터</Title>
                <UserInfoButton text={'지도 보기'} />
            </Comp>
        </InputComp>
    );
}

export default InputBoxComp;