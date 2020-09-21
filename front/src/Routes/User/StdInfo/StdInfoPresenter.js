import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StdInfoComp from './StdInfoComp';

import StdBox from 'Components/StdBox';
import ExplainBoxComp from 'Components/ExplainBoxComp';
import BackButton from 'Components/BackButton';
import level from 'const';

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 3% 4.5% 4% 4.5%;
`;

const HeaderBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const InfoBox = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

const StdInfo = ({ goBack }) => {
    const { color, text } = level.level3;

    return (
        <Container>
            {/* TODO
            학습자 페이지 UI 변경 */}
            <HeaderBox>
                <BackButton goBack={goBack} size={'43px'} />
                <StdBox />
            </HeaderBox>
            <InfoBox>
                <ExplainBoxComp Content={<StdInfoComp title={'총 학습량'} />} />
                <ExplainBoxComp
                    Content={<StdInfoComp
                        title={'성취도'}
                        color={color}
                        text={text}
                        per={'78%'} />} />
                <ExplainBoxComp
                    Content={<StdInfoComp
                        title={'발음 정확도'}
                        color={color}
                        text={text}
                        per={'64%'} />} />
            </InfoBox>
        </Container >
    );
}

export default StdInfo;