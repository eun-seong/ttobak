import React from 'react';
import SoundPresenter from './SoundPresenter';

import { T5, TTobak, Characters } from 'images';
import { T_Api2, soundURL } from 'api';

export default class extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
            type: match.params.type,
            is_review: match.params.is_review,
            TTobaki: TTobak.ttobak1_1,                  // 또박이 이미지 상태
            gameState: false,
            CardTextList: null,
        }

        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.idx_text = match.params.type + 'sound';
    }

    async componentDidMount() {
        if (this.state.type === 'vowel') this.newRequestVowel();
        else if (this.state.type === 'conso') this.newRequestConso();
        setTimeout(() => this.playSound(), 1000);
    }

    componentWillUnmount() {
        this.currentAudio.pause();
        this.currentAudio = null;
    }

    newRequestVowel = async () => {
        console.log('new request');

        try {
            const { s_id } = this.state;
            const { data } = await T_Api2.ask(s_id, this.idx_text);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.cure = data.cure;
                this.currentCure = data.cure[this.currentIndex];
                this.setAudio();
                this.setState({
                    CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
                })
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    newRequestConso = async () => {
        console.log('new request');
        // TODO
        try {
            //     const { s_id } = this.state;
            //     const { data } = await T_Api2.ask(s_id, this.idx_text);
            //     console.log(data);

            //     if (data.code === 'specified' || data.code === 1) {
            //         this.cure = data.cure;
            //         this.currentCure = data.cure[this.currentIndex];
            //         this.setAudio();
            //         this.setState({
            //             CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
            //         })
            //     }
            //     else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    setAudio = () => {
        this.currentAudio = this.currentCure.answer === 1
            ? new Audio(soundURL + this.currentCure.cure_path) :
            new Audio(soundURL + this.currentCure.cure_path2);
        console.log(this.currentAudio)
        this.currentAudio.addEventListener('ended', () => {
            this.setState({
                gameState: true,
                TTobaki: TTobak.ttobak1_1
            })
        })
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.setState({
                gameState: false,
                TTobaki: TTobak.ttobak1_2
            });
            this.currentAudio.play();
        }
    }

    onTTobakiTouchHandle = () => {
        const { gameState } = this.state;
        if (gameState) this.playSound();
    }

    onCardTouchHandle = async (index) => {
        const { gameState } = this.state;
        if (!gameState) return;
        this.setState({
            TTobaki: TTobak.ttobak2_2
        })

        try {
            const { s_id, is_review, CardTextList } = this.state;
            const { data } = await T_Api2.answer(
                s_id,
                this.currentCure.answer === 1 ? this.currentCure.cure_word : this.currentCure.cure_word2,
                CardTextList[index],
                this.currentCure.cure_id,
                is_review,
                this.idx_text
            );
            console.log(data);

            if (data.code === 1) {
                if (this.currentIndex < this.cure.length) this.currentIndex++;
                else {
                    this.gameDone();
                    return;
                }
                this.currentCure = this.cure[this.currentIndex];
                this.setAudio();
                setTimeout(() => {
                    this.setState({
                        CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
                        TTobaki: TTobak.ttobak1_1
                    });
                }, 2000);

                setTimeout(() => {
                    this.playSound();
                }, 3000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { TTobaki, CardTextList } = this.state;

        return (<SoundPresenter
            Background={T5.t5_background}
            TTobak={TTobaki}
            TTobakiTouch={this.onTTobakiTouchHandle}
            Card={[Characters.card1, Characters.card2]}
            CardTextList={CardTextList || ['아', '에']}
            onCardTouchHandle={this.onCardTouchHandle}
        />);
    }
}