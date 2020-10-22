import React from 'react';
import styled from 'styled-components';

const Component = styled.div`
    width: 100%;
    height: 100%;
    direction: rtl;
`;

const TextBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
`;

const RecordingCircle = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: ${props => props.isRecording ? '#fe4a2f' : '#a8aaa9'};
    right: 8%;
    top: -80%;
`;

const TextBoxComponent = ({ text, src, type, isRecording }) => {
    return (
        <Component>
            <TextBox src={src}>
                {text || type || '친구들아 친구들아'}
            </TextBox>
            <RecordingCircle isRecording={isRecording}></RecordingCircle>
        </Component>
    );
}

export default TextBoxComponent;