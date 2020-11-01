import React from 'react';
import styled from 'styled-components';
import StdLevel from 'Components/StdLevel';

const HeaderContainer = styled.div`
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
font-size: 1.1rem;
`;

const Title = styled.div`
flex: 0.25;
font-weight: bold;
`;

const Score = styled.div`
display: flex;
align-items: center;
flex: 0.75;
right: -30%;
`;

const Level = styled.div`
margin-right: 10px;
`;

const InfoHeader = ({ title, score, color, text }) => {
    return (
        <HeaderContainer>
            <Title>{title || '제목'}</Title>
            <Score>
                {/* {text && <Level><StdLevel text={text} color={color} fontSize={'0.8em'} /></Level>} */}
                {score || '학습을 시작해주세요.'}
            </Score>
        </HeaderContainer>
    );
};

const ContentsContainer = styled.div`
display: flex;
flex-direction: column;
`;

const Percent = styled.div`
width: 100%;
height: 15px;
margin-top: 5px;
background-color: #EEEAE0;
border-radius: 50px;
`;

const Student = styled.div`
position: relative;
width: ${props => props.per || '50%'};
background-color: red;
height: 15px;
border-radius: 50px;
background-color: ${props => props.color || 'green'};
`;

const PercentBox = ({ title, color, text, per, score }) => {
    return (
        <ContentsContainer>
            <InfoHeader title={title} color={color} text={text} score={score} />
            {
                !per ||
                <Percent>
                    <Student per={per} color={color} />
                </Percent>
            }
        </ContentsContainer>
    );
}


export default PercentBox;