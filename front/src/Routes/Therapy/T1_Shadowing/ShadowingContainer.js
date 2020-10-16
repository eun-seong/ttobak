import React from 'react';
import ShadowingPresenter from './ShadowingPresenter';

import { T1, TTobak } from 'images';
import { T1_Api, T_Api2, Audio_Api, soundURL } from 'api';

export default class extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            s_id: match.params.s_id || 4,
            is_review: match.params.is_review,
            idx_text: match.params.type,
            cureText: null,
        }
        this.cure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);
    }

    componentWillUnmount() {
        this.currentAudio.pause();
        this.currentAudio = null;
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id } = this.state;

        try {
            const { data } = await T_Api2.ask(s_id, this.state.idx_text);
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

    playSound = () => {
        if (!!this.currentAudio) {
            this.currentAudio.play();
            this.currentAudio.addEventListener('ended', () => {
                console.log('이제 따라 읽어볼까요?');
                // window.BRIDGE.recordAudio();
                // setTimeout(() => {
                //     const file = window.BRIDGE.getRecordFile();
                //     console.log(file);
                // }, 12000)
            })
        }
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