import React from 'react';
import styled from 'styled-components';
import StdLevel from 'Components/StdLevel';

/* styled-components */
const Component = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const StdInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 20vw;
    margin: 10px 30px 10px 10px;
    padding: 15px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 16px;
    background-color: #F6DB57;
`;

const StdName = styled.div`
    font-size: 1rem;
    font-weight: bold;
`;

const StdBirth = styled.div`
    font-size: 0.7rem;
`;

const DiagTitle = styled.div`
    font-weight: bold;
    font-size: 1.1rem;
    display: flex;
    flex-direction: row;
`;

const DiagResult = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
`;

const Diag = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2.5px 0;
`;

const ResultContent = ({ student, result, name, birth }) => {
    document.body.style.overflow = 'visible';

    return (
        <Component>
            <StdInfo>
                <StdName>{name || '홍길동'}</StdName>
                <StdBirth>{birth || '1998년 11월 11일'}</StdBirth>
            </StdInfo>
            <DiagResult>
                <Diag>
                    <DiagTitle>총 문제 개수 : {result['총 문제 개수']}개</DiagTitle>
                </Diag>
                <Diag>
                    <DiagTitle>총 맞은 개수 : {result['총 맞은 개수']}개</DiagTitle>
                </Diag>
                {/* <Diag>
                    <DiagTitle>청각처리 검사</DiagTitle>
                    <StdLevel text={'우수'} fontSize={'0.8rem'} />
                </Diag>
                <Diag>
                    <DiagTitle>어음청취력 검사</DiagTitle>
                    <StdLevel text={'우수'} fontSize={'0.8rem'} />
                </Diag>
                <Diag>
                    <DiagTitle>선택적 집중력 검사</DiagTitle>
                    <StdLevel text={'우수'} fontSize={'0.8rem'} />
                </Diag> */}
            </DiagResult>
        </Component>
    );
}

export default ResultContent;
