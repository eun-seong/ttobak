import React from 'react';
import VowelSoundPresenter from './VowelSoundPresenter';

import { T5, TTobak, Characters } from 'images';
import { T5_Api, soundURL } from 'api';

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

        var cure = null;
        var cureLength = 0;
        var currentIndex = 0;
        var currentAudio = null;
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);
    }

    newRequest = async () => {
        console.log('new request');

        try {
            const { s_id } = this.state;
            const { data } = await T5_Api.ask(s_id);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                var first = data.cure[0];
                this.cure = data.cure;
                this.cureLength = data.cure.length;
                this.currentAudio = [new Audio(first.cure_path), new Audio(first.cure_path2)];

                this.setState({
                    CardTextList: [first.cure_word, first.cure_word2],
                })
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    playSound = () => {
        this.setState({
            gameState: false,
            TTobaki: TTobak.ttobak1_2
        });
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
            // const { data } = await T3_Api.answer(
            //     s_id,
            //     cure[currentIndex].com_ans,
            //     boxTextList[index],
            //     cure_id,
            //     is_review
            // );
            // console.log(data);

            // if (data.code === 1) {
            //     const nextIndex = currentIndex + 1;

            // }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { TTobaki, CardTextList } = this.state;

        return (<VowelSoundPresenter
            Background={T5.t5_background}
            TTobak={TTobaki}
            TTobakiTouch={this.onTTobakiTouchHandle}
            Card={[Characters.card1, Characters.card2]}
            CardTextList={CardTextList || ['아', '에']}
            onCardTouchHandle={this.onCardTouchHandle}
        />);
    }
}