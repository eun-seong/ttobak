import React from 'react';
import ShadowingPresenter from './ShadowingPresenter';

import { T1, TTobak } from 'images';
import { T1_Api, Audio_Api, soundURL } from 'api';

export default class extends React.Component {
    constructor({ match, s_id }) {
        super();
        this.state = {
            s_id: match.params.s_id || 4,
            is_review: match.params.is_review,
            type: match.params.type,
            cure: null,
            currentIndex: 0,
            currentAudio: null,
            cureText: null,
        }
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id } = this.state;

        try {
            const { data } = await T1_Api.ask(s_id);
            console.log(data);

            if (data.code === 'specified') {
                const currentCure = data.cure[0];

                this.setState({
                    cure: data.cure,
                    currentAudio: new Audio(soundURL + currentCure.cure_path),
                    currentCure: currentCure,
                    cureText: currentCure.cure_text,
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    playSound = () => {
        const { currentCure, currentAudio } = this.state;

        currentAudio.play();
        currentAudio.addEventListener('ended', () => {
            console.log('이제 따라 읽어볼까요?');
            // window.BRIDGE.recordAudio();
            // setTimeout(() => {
            //     const file = window.BRIDGE.getRecordFile();
            //     console.log(file);
            // }, 12000)
        })
    }

    getAudioResult = () => {
        console.log('getAudioResult');
    }

    render() {
        const { type, cureText } = this.state;

        return (<ShadowingPresenter
            Background={T1.t1_background}
            TTobak={TTobak.ttobak1_1}
            TextBox={T1.t1_textbox}
            type={type}
            text={cureText}
        />);
    }
}