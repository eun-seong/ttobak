import React from 'react';
import ConsoMatchPresenter from './ConsoMatchPresenter';

import { T6, Characters } from 'images';
import { T_Api4, soundURL } from 'api';

export default class extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
            is_review: match.params.is_review,
            gameState: false,
            PicBoxList: null,
            Worm: Characters.worm2_2,
        };

        this.cure = null;
        this.answer = null;
        this.currentCure = null;
        this.currentAudio = null;
        this.currentIndex = 0;
        this.cureLength = 0;
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);
    }

    componentWillUnmount() {
        this.currentAudio.pause();
        this.currentAudio = null;
    }

    getListFilter = (key, value) => {
        return this.cure.filter((object) => { return object[key] === value })[0]
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id } = this.state;

        try {
            const { data } = await T_Api4.ask(s_id);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.currentIndex = 0;
                this.answer = data.answer;
                this.cureLength = data.answer.length;
                this.cure = data.cure;
                this.currentCure = data.answer[this.currentIndex];
                console.log(soundURL + this.getListFilter('cure_tid', this.currentCure[0]).cure_path2);
                this.currentAudio = new Audio(soundURL + this.getListFilter('cure_tid', this.currentCure[3][0]).cure_path);
                this.currentAudio.addEventListener('ended', () => {
                    this.setState({
                        gameState: true,
                        Worm: Characters.worm2_2,
                    })
                })

                this.setState({
                    PicBoxList: [
                        soundURL + this.getListFilter('cure_tid', this.currentCure[0]).cure_path2,
                        soundURL + this.getListFilter('cure_tid', this.currentCure[1]).cure_path2,
                        soundURL + this.getListFilter('cure_tid', this.currentCure[2]).cure_path2,
                    ]
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
                Worm: Characters.worm2_1,
            });
            this.currentAudio.play();
        }
    }

    gameDone = () => {
        console.log('done!');
    }

    onBoxTouchHandle = async (id) => {
        const { gameState } = this.state;
        if (!gameState) return;
        // this.setState({
        //     TTobaki: TTobak.ttobak2_2
        // })

        try {
            const { s_id, is_review } = this.state;
            const cure_id = [
                this.getListFilter('cure_tid', this.currentCure[0]).cure_id,
                this.getListFilter('cure_tid', this.currentCure[1]).cure_id,
                this.getListFilter('cure_tid', this.currentCure[2]).cure_id,
            ];
            const { data } = await T_Api4.answer(
                s_id,
                cure_id,
                this.getListFilter('cure_tid', this.currentCure[id]).cure_word,
                this.getListFilter('cure_tid', this.currentCure[3][0]).cure_word,
                is_review
            );
            console.log(data);

            if (data.code === 1) {
                if (this.currentIndex < this.cureLength) this.currentIndex++;
                else {
                    this.gameDone();
                    return;
                }
                this.currentCure = this.answer[this.currentIndex];

                this.currentAudio = new Audio(soundURL + this.getListFilter('cure_tid', this.currentCure[3][0]).cure_path);
                this.currentAudio.addEventListener('ended', () => {
                    this.setState({
                        gameState: true,
                        Worm: Characters.worm2_2,
                    })
                })

                this.setState({
                    PicBoxList: [
                        soundURL + this.getListFilter('cure_tid', this.currentCure[0]).cure_path2,
                        soundURL + this.getListFilter('cure_tid', this.currentCure[1]).cure_path2,
                        soundURL + this.getListFilter('cure_tid', this.currentCure[2]).cure_path2,
                    ]
                })

                setTimeout(() => {
                    this.playSound();
                }, 3000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    onWormTouchHandle = () => {
        if (this.state.gameState) this.playSound();
    }

    render() {
        const { PicBoxList, Worm } = this.state;

        return (<ConsoMatchPresenter
            Background={T6.t6_background}
            Worm={Worm}
            onWormTouchHandle={this.onWormTouchHandle}
            frameList={PicBoxList || [T6.t6_excpic, T6.t6_excpic, T6.t6_excpic]}
            onBoxTouchHandle={this.onBoxTouchHandle}
        />);
    }
}