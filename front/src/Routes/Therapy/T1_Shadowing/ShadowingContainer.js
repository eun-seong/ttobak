import React from 'react';
import ShadowingPresenter from './ShadowingPresenter';

import { T1, TTobak } from 'images';
import { T1_Api, soundURL } from 'api';

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
            TTobaki: TTobak.ttobak1_1,
        }
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.audioResult = null;
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);

        window.addEventListener("android", async (e) => {
            console.log(e.detail);
            this.setState({
                isRecording: false,
            })
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
                if (this.state.idx_text === 'vowelword' || this.state.idx_text === 'consoword')
                    this.currentCure.cure_text = this.currentCure.cure_word;
                this.setState({
                    cureText: this.currentCure.cure_text
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    audioListener = async () => {
        this.setState({
            TTobaki: TTobak.ttobak2_1,
        });

        try {
            if (this.audioResult.status === 'Success') {
                const { s_id, is_review } = this.state;
                const { data } = await T1_Api.answer(
                    s_id,
                    this.audioResult.score,
                    this.audioResult.phone_score,
                    this.audioResult.speed_score,
                    this.audioResult.rhythm_score,
                    is_review,
                    this.currentCure.cure_id,
                    this.state.idx_text
                );
                console.log(data);

                if (data.code === 1) {
                    if (this.currentIndex < this.cure.length - 1) {
                        this.currentIndex++;
                    } else {
                        this.gameDone();
                        return;
                    }
                    this.currentCure = this.cure[this.currentIndex];
                    this.currentAudio = null;
                    this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
                    if (this.state.idx_text === 'vowelword' || this.state.idx_text === 'consoword')
                        this.currentCure.cure_text = this.currentCure.cure_word;

                    setTimeout(() => {
                        this.setState({
                            TTobaki: TTobak.ttobak1_1,
                            cureText: this.currentCure.cure_text
                        });
                    }, 2000);

                    setTimeout(() => {
                        this.playSound();
                    }, 3500);

                } else if (data.code === 2) {
                    this.gameDone();
                }
                else console.log(data.message);

            } else {
                console.log(this.audioResult.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.setState({
                TTobaki: TTobak.ttobak3_2,
            });
            this.currentAudio.play();
            this.currentAudio.addEventListener('ended', () => {
                console.log('이제 따라 읽어볼까요?');
                this.setState({
                    TTobaki: TTobak.ttobak1_1,
                    isRecording: true,
                })
                window.BRIDGE.recordAudio('m', this.currentCure.cure_text);
            });
        }
    }

    gameDone = () => {
        console.log('done!!');
    }

    render() {
        const { type, cureText, TTobaki, isRecording } = this.state;

        return (<ShadowingPresenter
            Background={T1.t1_background}
            TTobak={TTobaki}
            TextBox={T1.t1_textbox}
            type={type}
            text={cureText}
            isRecording={isRecording}
        />);
    }
}