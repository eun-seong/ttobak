import React, { useState } from 'react';
import styled from 'styled-components';
import StdBox from './StdBox';

import ButtonBox from './ButtonBox';
import CustomLearning from './CustomLearning';
import { colors } from 'const';
import Alert from 'Components/Alert';

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

const Main = ({ data, student, isImageLoaded, daily_custom, daily_link, daily_complete, isDiagOkay, isFirstDiagnose, ...props }) => {
    const [num, setNum] = useState(0);
    const increase = () => {
        console.log(num);
        if (num > 10) props.developMode();
        else setNum(num + 1);
    }

    return (
        <>
            {
                props.showPopUp ?
                    <Alert
                        text={'마지막 검사로부터 일주일 후에 진행할 수 있습니다.'}
                        onSubmit={props.onOkButtonHandle} />
                    : null
            }
            <Container>
                <StdBox student={student} isDiagOkay={isDiagOkay} />
                <Component>
                    <ButtonBox
                        isFirstDiagnose={isFirstDiagnose}
                        text={'맞춤 학습'} width={'56vw'}
                        headercolor={colors.main_header_yellow}
                        color={colors.main_yellow}
                        linkto={daily_link} data={data}
                        Contents={isFirstDiagnose ?
                            <div>첫 번째 검사를 진행해주세요.</div> :
                            <CustomLearning
                                daily_custom={daily_custom}
                                daily_complete={daily_complete}
                            />}
                    />
                    <SubComp>
                        <ButtonBox
                            text={'복습하기'}
                            Contents={<div>(준비 중)</div>}
                            headercolor={colors.main_header_blue}
                            color={colors.main_blue}
                            width={'31w'} height={'34vh'}
                            linkto={'/main/select'}
                            isImageLoaded={isImageLoaded}
                            touchNone={true}
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
                </Component>
            </Container>
        </>
    );
}

export default Main;