import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    font-weight: bold;
    font-size: 2rem;
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

const DonePopup = ({ onRestartButtonHandle }) => {
    return (
        <Div>
            <DivInner>
                <Title>{'한 세트가 끝났어요!'}</Title>
                <Content>
                    <Button onTouchEnd={onRestartButtonHandle}>
                        <ButtonImg src={Pause.bt_again} />
                        <ButtonText>계속 하기</ButtonText>
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

export default DonePopup;