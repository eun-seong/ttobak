import React from 'react';
import RecognitionPresenter from './RecognitionPresenter';
import { withRouter } from 'react-router-dom';

import { TTobak, D2 } from 'images';
import { D2_Api, soundURL } from 'api';
class Recognition extends React.PureComponent {
    constructor({ s_id }) {
        super();
        this.state = {
            s_id: s_id || 4,
            gameState: false,
            Box: [D2.d2_Box1_1, D2.d2_Box2_1],          // Box 이미지
            TTobaki: TTobak.ttobak3_1,
            oriAnswer: null,                            // 정답
            stdAnswer: null,                            // 학생 답
            phSound: [],                                   //
            audio: [],
            answerIndex: 0,
            isAnimate: [false, false],
            phIndex: 0,
            phs: null,
            phFirstIndex: 0,
        };
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id } = this.state;

        try {
            const { data } = await D2_Api.ask(s_id);
            const phFirstIndex = data.phs[0].ques_id;
            console.log(data);

            if (data.code === 1) {
                const { answers } = data;
                const answer = [
                    data.phs[answers[0][0] - phFirstIndex],
                    data.phs[answers[0][1] - phFirstIndex],
                    data.phs[answers[0][2] - phFirstIndex]
                ]
                this.setState({
                    oriAnswer: answers,
                    phs: data.phs,
                    phFirstIndex: phFirstIndex,
                    answerIndex: (answer[0].ques_id === answer[2].ques_id ? 0 : 1),
                    answer: answer,
                    phSound: [
                        new Audio(soundURL + answer[0].ques_path1),
                        new Audio(soundURL + answer[1].ques_path1),
                        new Audio(soundURL + answer[2].ques_path1),
                    ],
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    TTobakiTouch = async () => {
        if (!!this.state.gameState) {
            this.playSound();
            this.setState({
                gameState: false,
                isAnimate: [false, false]
            })
        }
    }

    onBoxTouchHandle = async (id) => {
        const { Box, answerIndex, TTobaki, gameState } = this.state;
        if (!gameState) return;

        switch (id) {
            case 0:
                this.setState({
                    gameState: false,
                    Box: [answerIndex === id ? D2.d2_Box1_3 : D2.d2_Box1_2, Box[1]],
                    TTobaki: [answerIndex === id ? TTobak.ttobak2_1 : TTobaki],
                });
                break;
            case 1:
                this.setState({
                    gameState: false,
                    Box: [Box[0], answerIndex === id ? D2.d2_Box2_3 : D2.d2_Box2_2],
                    TTobaki: [answerIndex === id ? TTobak.ttobak2_1 : TTobaki],
                });
                break;
            default:
                break;
        }

        this.finished(id);
    }

    changeTTobaki = (ttobaki) => {
        this.setState({
            TTobaki: ttobaki
        });
    }

    animateBox = (index) => {
        if (!index)
            this.setState({
                isAnimate: [true, false]
            });
        else
            this.setState({
                isAnimate: [true, true]
            });
    }

    playSound = async () => {
        const { phSound } = this.state;
        this.changeTTobaki(TTobak.ttobak1_2);
        phSound[2].play();

        setTimeout(() => {
            phSound[0].play();
            this.changeTTobaki(TTobak.ttobak3_1);
            this.setState({
                isAnimate: [true, false]
            });
        }, 1500);

        setTimeout(() => {
            phSound[1].play();
            this.setState({
                isAnimate: [false, true]
            });
        }, 2900);

        setTimeout(() => {
            this.setState({
                gameState: true,
            })
        }, 4000);
    }

    finished = async (id) => {
        console.log('finished');
        const { s_id, answer } = this.state;
        const [ph, oriAnswer, stdAnswer] = [
            [answer[0].ques_id, answer[1].ques_id],
            answer[0].ques_id === answer[2].ques_id ? answer[0].ques_char : answer[1].ques_char,
            answer[id].ques_char
        ];

        try {
            const data = await D2_Api.answer(s_id, oriAnswer, stdAnswer, ph, "T");
            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            setTimeout(() => {
                const { oriAnswer, phIndex, phs, phFirstIndex } = this.state;
                const answer = [
                    phs[oriAnswer[phIndex + 1][0] - phFirstIndex],
                    phs[oriAnswer[phIndex + 1][1] - phFirstIndex],
                    phs[oriAnswer[phIndex + 1][2] - phFirstIndex]
                ];

                this.setState({
                    gameState: false,
                    Box: [D2.d2_Box1_1, D2.d2_Box2_1],
                    stdAnswer: null,
                    answerIndex: null,
                    TTobaki: TTobak.ttobak3_1,
                    phIndex: phIndex + 1,
                    answerIndex: (answer[0].ques_id === answer[2].ques_id ? 0 : 1),
                    answer: answer,
                    phSound: [
                        new Audio(soundURL + answer[0].ques_path1),
                        new Audio(soundURL + answer[1].ques_path1),
                        new Audio(soundURL + answer[2].ques_path1),
                    ],
                });
            }, 1500);

            setTimeout(() => {
                this.playSound();
            }, 3000);
        }
    }

    render() {
        const { Box, TTobaki, isAnimate } = this.state;

        return (
            <RecognitionPresenter
                Background={D2.d2_background}
                TTobaki={TTobaki}
                TTobakiTouch={this.TTobakiTouch}
                Box={Box}
                Clicked={this.onBoxTouchHandle}
                isAnimate={isAnimate}
            />);
    }
}


export default withRouter(Recognition);