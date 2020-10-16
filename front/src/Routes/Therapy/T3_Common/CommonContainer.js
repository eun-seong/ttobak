import React from 'react';
import { T3, TTobak } from 'images';
import CommonPresenter from './CommonPresenter';

import { T_Api2, soundURL } from 'api';

const idx_text = 'common';

export default class extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
            is_review: match.params.is_review,
            TTobaki: TTobak.ttobak1_1,
            cure: null,
            cureLength: 0,
            currentIndex: 0,
            gameState: false,
            boxTextList: null,
            isAnimate: [false, false, false, false],
        };

        var currentAudio = null;
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
                const first = data.cure[0];
                this.currentAudio = [
                    new Audio(soundURL + first.com_e1path),
                    new Audio(soundURL + first.com_e2path),
                    new Audio(soundURL + first.com_e3path),
                    new Audio(soundURL + first.com_e4path),
                    new Audio(soundURL + first.com_w1path),
                    new Audio(soundURL + first.com_w2path),
                    new Audio(soundURL + first.com_w3path),
                ];
                this.setState({
                    cure: data.cure,
                    cureLength: data.cure.length,
                    boxTextList: [first.com_e1, first.com_e2, first.com_e3, first.com_e4],
                })
                this.setListener();
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    setListener = () => {
        this.currentAudio[0].addEventListener('ended', () => {
            this.listenerFunc(0, 500);
        });
        this.currentAudio[1].addEventListener('ended', () => {
            this.listenerFunc(1, 500);
        });
        this.currentAudio[2].addEventListener('ended', () => {
            this.listenerFunc(2, 500);
        });
        this.currentAudio[3].addEventListener('ended', () => {
            this.listenerFunc(3, 1500);
        });
        this.currentAudio[4].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1
            })
            setTimeout(() => {
                this.currentAudio[5].play();
                this.setState({
                    TTobaki: TTobak.ttobak3_2
                })
            }, 1000);
        });
        this.currentAudio[5].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1
            })
            setTimeout(() => {
                this.currentAudio[6].play();
                this.setState({
                    TTobaki: TTobak.ttobak3_2
                })
            }, 1000);
        });
        this.currentAudio[6].addEventListener('ended', () => {
            this.setState({
                gameState: true,
                TTobaki: TTobak.ttobak1_1
            })
        });
    }

    listenerFunc = (index, time) => {

        this.setState({
            TTobaki: TTobak.ttobak1_1
        });
        setTimeout(() => {
            this.currentAudio[index + 1].play();
            this.setState({
                TTobaki: TTobak.ttobak1_2
            })
        }, time);
    }

    playSound = () => {
        this.setState({
            gameState: false,
            TTobaki: TTobak.ttobak1_2
        });

        this.currentAudio[0].play();
    }

    onTTobakiTouchHandle = () => {
        const { gameState } = this.state;
        if (gameState) this.playSound();
    }

    onBoxTouchHandle = async (index) => {
        const { gameState } = this.state;
        if (!gameState) return;
        this.setState({
            TTobaki: TTobak.ttobak2_2
        })

        try {
            const { s_id, cure, currentIndex, boxTextList, is_review } = this.state;
            const { data } = await T_Api2.answer(
                s_id,
                cure[currentIndex].com_ans,
                boxTextList[index],
                cure[currentIndex].com_id,
                is_review,
                idx_text
            );
            console.log(data);

            if (data.code === 1) {
                const nextIndex = currentIndex + 1;
                this.currentAudio = [
                    new Audio(soundURL + cure[nextIndex].com_e1path),
                    new Audio(soundURL + cure[nextIndex].com_e2path),
                    new Audio(soundURL + cure[nextIndex].com_e3path),
                    new Audio(soundURL + cure[nextIndex].com_e4path),
                    new Audio(soundURL + cure[nextIndex].com_w1path),
                    new Audio(soundURL + cure[nextIndex].com_w2path),
                    new Audio(soundURL + cure[nextIndex].com_w3path),
                ];

                this.setListener();
                setTimeout(() => {
                    this.setState({
                        boxTextList: [cure[nextIndex].com_e1, cure[nextIndex].com_e2, cure[nextIndex].com_e3, cure[nextIndex].com_e4],
                        TTobaki: TTobak.ttobak1_1,
                    })
                }, 2000);

                setTimeout(() => {
                    this.playSound();
                }, 4000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { boxTextList, isAnimate, TTobaki } = this.state;

        return (<CommonPresenter
            Background={T3.t3_background}
            TTobak={TTobaki}
            onTTobakiTouchHandle={this.onTTobakiTouchHandle}
            boxTextList={boxTextList || ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ']}
            onBoxTouchHandle={this.onBoxTouchHandle}
            BoxImg={T3.t3_textbox}
            isAnimate={isAnimate}
        />);
    }
}