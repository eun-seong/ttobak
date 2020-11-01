import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StdInfoComp from './StdInfoComp';

import StdBox from './StdBox';
import ExplainBoxComp from 'Components/ExplainBoxComp';
import level from 'const';

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 3% 4.5% 4% 4.5%;
`;

const BoxContainer = styled.div`
    display: flex;
    width: 95%;
    justify-content: flex-end;
    align-self: flex-end;
`;

const InfoBox = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

const StdInfo = ({ student, goBack, amount, score, voice_score }) => {
    const { color, text } = level.level3;

    return (
        <Container>
            {/* TODO
            학습자 페이지 UI 변경 */}
            <BoxContainer><StdBox student={student} goBack={goBack} /></BoxContainer>
            <InfoBox>
                <ExplainBoxComp Content={<StdInfoComp
                    title={'총 학습량'}
                    score={amount && amount + ' 분'} />} />
                <ExplainBoxComp
                    Content={<StdInfoComp
                        title={'성취도'}
                        color={color}
                        text={text}
                        per={!!score ? score + '%' : '0%'}
                        score={score && score + '%'} />} />
                <ExplainBoxComp
                    Content={<StdInfoComp
                        title={'발음 정확도'}
                        color={color}
                        text={text}
                        per={!!voice_score ? voice_score + '%' : '0%'}
                        score={voice_score && voice_score + ' 점'} />} />
            </InfoBox>
        </Container >
    );
}

export default StdInfo;