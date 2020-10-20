import React from 'react';
import ShadowingPresenter from './ShadowingPresenter';

import { T1, TTobak } from 'images';
import { T_ask_api, T1_Api, soundURL, T_Api2 } from 'api';

export default class extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            s_id: match.params.s_id || 4,
            is_review: match.params.is_review,
            is_selected: match.params.is_selected,
            idx_text: match.params.type,
            cureText: null,
            isRecording: false,
        }
        this.cure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.audioResult = null;
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);

        window.addEventListener("android", async (e) => {
            console.log(e.detail);
            this.audioResult = e.detail;
            this.audioListener();
        });
    }

    componentWillUnmount() {
        this.currentAudio.pause();
        this.currentAudio = null;
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id } = this.state;

        try {
            const { data } = await T1_Api.ask(s_id, this.state.idx_text);
            console.log(data);

            if (data.code === 'specified') {
                this.cure = data.cure;
                this.currentCure = data.cure[this.currentIndex];
                this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
                this.setState({
                    cureText: (this.state.idx_text === 'vowelword' ||
                        this.state.idx_text === 'consoword' ?
                        this.currentCure.cure_word : this.currentCure.cure_text
                    ),
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    audioListener = async () => {
        try {
            if (this.audioResult.status === 'Success') {
                const { s_id, is_review } = this.state;
                console.log(
                    s_id,
                    this.audioResult.score,
                    this.audioResult.phone_score,
                    this.audioResult.speed_score,
                    this.audioResult.rhythm_score,
                    is_review,
                    this.audioResult.transcript,
                    this.state.idx_text)
                const { data } = await T1_Api.answer(
                    s_id,
                    this.audioResult.score,
                    this.audioResult.phone_score,
                    this.audioResult.speed_score,
                    this.audioResult.rhythm_score,
                    is_review,
                    this.audioResult.transcript,
                    this.state.idx_text
                );
                console.log(data);

                if (data.code === 2) console.log(data.message);
            } else {
                console.log(this.audioResult.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.currentAudio.play();
            this.currentAudio.addEventListener('ended', () => {
                console.log('이제 따라 읽어볼까요?');
                window.BRIDGE.recordAudio('m', this.currentCure.cure_id);
            })
        }
    }

    getAudioResult = (json) => {
        console.log('getAudioResult');
        console.log(json);
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