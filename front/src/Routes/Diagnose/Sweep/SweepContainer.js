import React from 'react';
import SweepPresenter from './SweepPresenter';
import { D1_Api, soundURL } from 'api';
import { D1, TTobak } from 'images';
import { withRouter } from 'react-router-dom';

const UP = 'up';
const DOWN = 'down';

class Sweep extends React.PureComponent {
    constructor({ s_id }) {
        super();
        this.state = {
            gameState: false,                           // 게임 상태
            UpButton: D1.d1_UpButton_UP,                // 버튼 이미지 상태
            DownButton: D1.d1_DownButton_UP,            // 버튼 이미지 상태
            buttonSound: [],                            // up_sweep, down_sweep 소리 경로
            oriAnswer: null,                            // 정답
            stdAnswer: [],                              // 학습자 정답
            Answer: [],                                 // 정답 상자
            TTobaki: TTobak.ttobak1_1,                  // 또박이 이미지 상태
            ques_id: null,                              // sweep 검사 아이디 
            s_id: s_id || 4,                            // 학습자 아이디
            swpIndex: 0,
        };
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);
    }

    onTouchStart = (id) => {
        const { Answer, stdAnswer, gameState } = this.state;

        switch (id) {
            case DOWN:
                // console.log('down-down');
                this.setState({
                    DownButton: D1.d1_DownButton_DOWN,
                    Answer: Answer.concat(gameState ? D1.d1_AnswerDown : []),
                    stdAnswer: stdAnswer.concat(gameState ? DOWN : [])
                });
                break;
            case UP:
                // console.log('up-down');
                this.setState({
                    UpButton: D1.d1_UpButton_DOWN,
                    Answer: Answer.concat(gameState ? D1.d1_AnswerUp : []),
                    stdAnswer: stdAnswer.concat(gameState ? UP : [])
                });
                break;
            default:
        }
    }

    onTouchEnd = (id) => {
        const { gameState, buttonSound } = this.state;
        switch (id) {
            case DOWN:
                // console.log('down-up');
                this.setState({
                    DownButton: D1.d1_DownButton_UP
                });
                if (gameState) buttonSound[1].play();
                break;
            case UP:
                // console.log('up-up');
                this.setState({
                    UpButton: D1.d1_UpButton_UP
                });
                if (gameState) buttonSound[0].play();
                break;
            default:
        }
        if (this.state.Answer.length === 2) this.finished();
    }

    TTobakiTouch = async () => {
        if (this.state.gameState) {
            this.playSound();
        }
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id } = this.state;

        try {
            const { data } = await D1_Api.ask(s_id);
            console.log(data);

            if (data.code === 1) {
                const { answers, swp: { ques_id, ques_path1, ques_path2 } } = data;

                this.setState({
                    gameState: true,
                    oriAnswer: answers,
                    ques_id: ques_id,
                    buttonSound: [new Audio(soundURL + ques_path2), new Audio(soundURL + ques_path1)],
                });
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    playSound = () => {
        const { swpIndex, oriAnswer, buttonSound } = this.state;

        if (swpIndex > 4) {
            this.newRequest();
            return;
        }

        this.setState({
            TTobaki: TTobak.ttobak1_2
        });
        (UP === oriAnswer[swpIndex][0] ? buttonSound[0] : buttonSound[1]).play();

        setTimeout(() => {
            (UP === oriAnswer[swpIndex][1] ? buttonSound[0] : buttonSound[1]).play();
        }, 1000);

        setTimeout(() => {
            this.setState({
                TTobaki: TTobak.ttobak1_1
            })
        }, 1500);
    }

    finished = async () => {
        console.log('finished');
        const { s_id, ques_id, oriAnswer, stdAnswer, swpIndex } = this.state;
        const answer = [oriAnswer[swpIndex][0], oriAnswer[swpIndex][1]];

        try {
            const { data } = await D1_Api.answer(s_id, ques_id, answer, stdAnswer, false);
            console.log(data);

            if (data.code === 1) {
                if (data.to_next === true || data.to_next_freq === true) {
                    await this.nextLevel();
                    this.nextQuestion();
                    setTimeout(() => {
                        this.playSound();
                    }, 1000);
                }
                else if (data.to_next === '모든 문제를 풀었습니다') {
                    // TODO 다음 검사로
                    console.log('next game');
                } else {
                    this.setState({
                        Answer: [],
                        sweep: [],
                        path: [],
                        stdAnswer: [],
                        swpIndex: swpIndex + 1,
                    });

                    setTimeout(() => {
                        this.playSound();
                    }, 2000);
                }
            }
        } catch (e) {
            console.log(e);
            // TODO 에러 처리
        }
    }

    render() {
        const { UpButton, DownButton, Answer, TTobaki } = this.state;

        return (
            <SweepPresenter
                Background={D1.d1_background}
                UP={UP} DOWN={DOWN}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
                UpButton={UpButton}
                DownButton={DownButton}
                Answer={Answer}
                TTobak={TTobaki}
                TTobakiTouch={this.TTobakiTouch}
                AnswerBox={D1.d1_box}
            />);
    }
}

export default withRouter(Sweep);