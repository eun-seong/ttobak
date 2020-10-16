import React from 'react';
import ConsoCommonPresenter from './ConsoCommonPresenter';

import { T7, Characters } from 'images';
import { T_Api2, soundURL } from 'api';

const idx_text = 'consocommon';

export default class extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
            is_review: match.params.is_review,
            gameState: false,
            picBox: null,
            CardTextList: null,
        };

        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.cureLength = 0;
        this.ori_answer = null;
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id } = this.state;

        try {
            const { data } = await T_Api2.ask(s_id, idx_text);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.cure = data.cure;
                this.cureLength = data.cure.length;
                this.currentCure = this.cure[this.currentIndex];
                this.ori_answer = [this.currentCure.cure_word, this.currentCure.cure_word2];

                this.setState({
                    picBox: soundURL + this.currentCure.cure_path,
                    CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2]
                })
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }


    playSound = () => {
        if (!!this.currentAudio) {
            this.setState({
                gameState: false,
            });
            // this.currentAudio.play();
        }
    }

    gameDone = () => {
        console.log('done!');
    }

    onCardTouchHandle = async (id) => {
        try {
            const { s_id, is_review } = this.state;
            const { data } = await T_Api2.answer(
                s_id, this.ori_answer[this.currentCure.cure_level - 1],
                this.ori_answer[id],
                this.currentCure.cure_id,
                is_review,
                idx_text
            );
            console.log(data);

            if (data.code === 1) {
                if (this.currentIndex < this.cureLength) this.currentIndex++;
                else {
                    this.gameDone();
                    return;
                }

                this.currentCure = this.cure[this.currentIndex];
                this.ori_answer = [this.currentCure.cure_word, this.currentCure.cure_word2];

                this.setState({
                    picBox: soundURL + this.currentCure.cure_path,
                    CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2]
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { CardTextList, picBox } = this.state;

        return (<ConsoCommonPresenter
            Background={T7.t7_background}
            Card={[Characters.card1, Characters.card2]}
            CardTextList={CardTextList || ['ㄱ', 'ㄴ']}
            picBox={picBox || T7.t7_excpic}
            onCardTouchHandle={this.onCardTouchHandle}
        />);
    }
}