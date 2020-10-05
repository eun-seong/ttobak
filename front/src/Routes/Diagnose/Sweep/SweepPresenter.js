import React from 'react';
import styled from 'styled-components';
import Sound from 'react-sound';

import PauseButton from 'Components/PauseButton';

import AnswerBoxComp from './AnswerBox';

/* styled-components */
const BackgroundImg = styled.img`
    width: 100%;
    margin: auto auto;
    bottom:0;
`;

const ButtonImg = styled.img`
    width: 20%;
    top: 60%;
`;

const UpButtonImg = styled(ButtonImg)`
    width: 40%;
    height: 40%;
    margin: 0 15px 0 0;
`;

const DownButtonImg = styled(ButtonImg)`
    width:40%;
    height: 40%;
    margin: 0 0 0 15px;
`;

const Component = styled.div`
    width: 50%;
    position:absolute;
    justify-content: center;
    margin: 5px 0 0 0 ;
    right:15%;
    top: 1%;
`;

const ButtonComponent = styled.div`
    display: flex;
    justify-content:center;
    margin: 0 0 5px 0 ;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 20%;
    top: 17%;
    left: 3%;
`;

const Sweep = (props) => {
    console.log('Sweep');
    console.log(props);
    return (
        <div>
            <PauseButton link={'/'} />
            {/* 또박이 사운드 재생 */}
            <Sound url={props.ttobakSound.url}
                playStatus={props.ttobakSound.playingStatus}
                onFinishedPlaying={props.handleTTobakFinishedPlaying}
                autoLoad={true}
                ignoreMobileRestrictions={true} />
            <TTobakComponent src={props.TTobak} alt='또박이' onTouchEnd={props.TTobakiTouch} />
            <Component>
                <AnswerBoxComp Answer1={props.Answer[0]} Answer2={props.Answer[1]} />
                <ButtonComponent>
                    {/* 버튼 사운드 재생 */}
                    <Sound url={props.buttonSound.url}
                        playStatus={props.buttonSound.buttonPlayingStatus}
                        onFinishedPlaying={props.handleButtonFinishedPlaying}
                        autoLoad={true}
                        ignoreMobileRestrictions={true} />
                    <UpButtonImg
                        src={props.UpButton}
                        alt='up'
                        onTouchStart={() => props.onTouchStart(props.UP)}
                        onTouchEnd={() => props.onTouchEnd(props.UP)} />
                    <DownButtonImg
                        src={props.DownButton}
                        alt='down'
                        onTouchStart={() => props.onTouchStart(props.DOWN)}
                        onTouchEnd={() => props.onTouchEnd(props.DOWN)} />
                </ButtonComponent>
            </Component>
            <BackgroundImg src={props.Background} alt='배경화면' />
        </div>
    );
}

export default Sweep;