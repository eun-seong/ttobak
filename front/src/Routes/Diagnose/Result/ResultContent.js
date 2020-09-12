import React from 'react';
import styled from 'styled-components';
import StdLevel from 'Components/StdLevel';

/* styled-components */
const DiagTitle = styled.div`
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 5px;
`;

const ResultContent = ({ student }) => {
    document.body.style.overflow = "visible"

    return (
        <div>
            <DiagTitle>어음청취력 검사</DiagTitle>
            <StdLevel text={'우수'} color={''} />
        </div>
    );
}

export default ResultContent;