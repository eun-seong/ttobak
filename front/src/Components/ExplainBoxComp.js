import React from 'react';
import styled from 'styled-components';

const ExplainBox = styled.div`
    width: 100%;
    border-radius: 15px;
    background-color: #FFFFFF;
    border: 2px solid #DFD7C4;
    padding: 20px 25px;
    margin-bottom: ${props => props.margin || '0px'};
`;

function ExplainBoxComp({ Content, margin }) {
    return (
        <ExplainBox margin={margin}>
            {Content}
        </ExplainBox>
    );
}

export default ExplainBoxComp;