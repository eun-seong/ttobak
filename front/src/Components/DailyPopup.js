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

const Button = styled(Link)`
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

const DailyPopup = ({ text }) => {
    return (
        <Div>
            <DivInner>
                <Title>{text || '오늘 학습이 끝났어요!'}</Title>
                <Content>
                    <Button to='/main/main'>
                        <ButtonImg src={Pause.bt_stop} />
                        <ButtonText>{!!text ? '다음' : '홈으로'}</ButtonText>
                    </Button>
                </Content>
            </DivInner>
        </Div>
    );
}

export default DailyPopup;