import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { colors } from 'const';
import { Pause } from 'images';

const button_size = '80px';

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
`;

const Title = styled.div`
    width: 100%;
    margin: 6% 0 0 0;
    text-align: center;
    ${props => {
        if (!!props.size) return css`
            font-size: ${props.size};
        `;
        else return css`
            font-weight: bold;
            font-size: 2rem;
        `;
    }}
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Button = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: ${button_size};
`;

const ButtonImg = styled.img`
    width: ${button_size};
    height: ${button_size};
`;

const ButtonText = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    width: 100%;
    text-align: center;
`;

const PausePopup = ({ onContinueButtonHandle, text, size }) => {
    return (
        <Div>
            <DivInner>
                {!!text ? <Title size={size}>{text}</Title> : null}
                <Content>
                    <Button onTouchEnd={onContinueButtonHandle}>
                        <ButtonImg src={Pause.bt_continue} />
                        <ButtonText>이어 하기</ButtonText>
                    </Button>
                    <Button>
                        <Link to='/main/main'>
                            <ButtonImg src={Pause.bt_stop} />
                            <ButtonText>그만 하기</ButtonText>
                        </Link>
                    </Button>
                </Content>
            </DivInner>
        </Div>
    );
}

export default PausePopup;