import React from 'react';
import styled from 'styled-components';
import StdBox from './StdBox';

import ButtonBox from './ButtonBox';
import CustomLearning from './CustomLearning';
import { colors } from 'const';

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100vw;
    height: 100vh;
    padding: 3% 4.5% 4% 4.5%;
`;

const Component = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
`;

const SubComp = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const FirstDiag = styled.div`
    display: flex;
    position: absolute;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: rgba(222,222,222, 0.9);
    justify-content: center;
    text-align: center;
    padding-top: 30vh;
    touch-action: none;
    font-size: 1.2rem;
    line-height: 1.7rem;
`;

const Main = ({ data, student, isImageLoaded, daily_custom, daily_link, daily_complete, isDiagOkay, isFirstDiagnose }) => {
    return (
        <Container>
            <StdBox student={student} isDiagOkay={isDiagOkay} />
            <Component>
                <ButtonBox
                    text={'맞춤 학습'} width={'56vw'}
                    headercolor={colors.main_header_yellow}
                    color={colors.main_yellow}
                    linkto={daily_link} data={data}
                    Contents={<CustomLearning daily_custom={daily_custom} daily_complete={daily_complete} />}
                />
                <SubComp>
                    <ButtonBox
                        text={'복습하기'}
                        Contents={<div>이전에 했던 내용을 복습해요!</div>}
                        headercolor={colors.main_header_blue}
                        color={colors.main_blue}
                        width={'31w'} height={'34vh'}
                        linkto={'/main/select'}
                        isImageLoaded={isImageLoaded}
                    />
                    <ButtonBox
                        text={'학습 선택하기'}
                        Contents={<div>학습을 선택해요!</div>}
                        headercolor={colors.main_header_red}
                        color={colors.main_red}
                        width={'31vw'} height={'34vh'}
                        linkto={'/main/select'}
                        isImageLoaded={isImageLoaded}
                    />
                </SubComp>
                {
                    isFirstDiagnose ?
                        <FirstDiag>
                            상단의 [검사하기] 버튼을 눌러,<br />
                            첫 번째 검사를 시작해주세요.
                    </FirstDiag> :
                        null
                }
            </Component>
        </Container>
    );
}

export default Main;