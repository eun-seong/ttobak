import React from 'react';
import styled from 'styled-components';
import StdBox from './StdBox';

import ButtonBox from './ButtonBox';
import CustomLearning from './CustomLearning';

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
    height: 73vh;
    flex-direction: row;
    justify-content: space-between;
`;

const SubComp = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const Main = ({ data, isImageLoaded, daily_custom, daily_link }) => {
    return (
        <Container>
            <StdBox />
            <Component>
                <ButtonBox
                    text={'맞춤 학습'} width={'56vw'}
                    headercolor={'#F6DB57'}
                    color={'#F8E384'}
                    linkto={daily_link} data={data}
                    Contents={<CustomLearning daily_custom={daily_custom} />}
                />
                <SubComp>
                    <ButtonBox
                        text={'복습하기'}
                        Contents={<div>이전에 했던 내용을 복습해요!</div>}
                        headercolor={'#62AAF5'}
                        color={'#97C3EB'}
                        width={'31w'} height={'34vh'}
                        linkto={'/main/select'}
                        isImageLoaded={isImageLoaded}
                    />
                    <ButtonBox
                        text={'학습 선택하기'}
                        Contents={<div>학습을 선택해요!</div>}
                        headercolor={'#F59F6E'}
                        color={'#F7BC93'}
                        width={'31vw'} height={'34vh'}
                        linkto={'/main/select'}
                        isImageLoaded={isImageLoaded}
                    />
                </SubComp>
            </Component>
        </Container>
    );
}

export default Main;