import React from 'react';
import styled from 'styled-components';
import { colors } from 'const';

const Div = styled.div`
    position: fixed;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    touch-action: none;
    background-color: rgba(0,0,0,0.5);
    z-index: 4;
`;

const DivInner = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 60%;
    height: 60%;
    border-radius: 40px 90px / 80px 40px;
    background-color: white;
    border: 3px solid ${colors.border_purple};
    padding: 7%;
`;

const Title = styled.div`
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 2rem;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    flex: 1;
    width: 100%;
    height: auto;
`;

const ButtonDiv = styled.button`
    align-self: flex-end;
    border-radius: 26px;
    border: 0px solid;
    margin-top: 10px;
    padding: 0 10px;
    background-color:#AC9BC9;
    color: #ffffff;
`;

const Text = styled.div`
    font-size: 1.1rem;
    font-family: 'paybooc-Medium';
    padding: 10px 30px;
`;

const Alert = ({ text, isConfirm, onSubmit, onCancel }) => {
    const cancleButton = isConfirm ? (
        <ButtonDiv onClick={onCancel}>
            <Text>취소</Text>
        </ButtonDiv>
    ) : null;

    return (
        <Div>
            <DivInner>
                <Title>{text}</Title>
                <Content>
                    <ButtonDiv onClick={onSubmit}>
                        <Text>확인</Text>
                    </ButtonDiv>
                    {cancleButton}
                </Content>
            </DivInner>
        </Div>
    );
}

export default Alert;