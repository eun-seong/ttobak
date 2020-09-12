import React from 'react';
import styled from 'styled-components';

const ExplainBox = styled.div`
    height: 200px;
    width: 100%;
    border-radius: 15px;
    background-color: #FFFFFF;
    border: 2px solid #DFD7C4;
    margin: 0px 0px 25px 0px;
    padding: 20px 30px;
`;

function ExplainBoxcomp({ Content }) {
    return (
        <ExplainBox>
            <Content />
        </ExplainBox>
    );
}

export default ExplainBoxcomp;