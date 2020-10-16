import React from 'react';
import SweepPresenter from './SweepPresenter';
import { D1_Api, soundURL } from 'api';
import { D1, TTobak } from 'images';
import { withRouter } from 'react-router-dom';

const UP = 'up';
const DOWN = 'down';

class Sweep extends React.PureComponent {
    constructor({ match }) {
        super();
        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
            is_review: match.params.is_review,
            gameState: false,                           // 게임 상태
            UpButton: D1.d1_UpButton_UP,                // 버튼 이미지 상태
            DownButton: D1.d1_DownButton_UP,            // 버튼 이미지 상태
            stdAnswer: [],                              // 학습자 정답
            Answer: [],                                 // 정답 상자
            TTobaki: TTobak.ttobak1_1,                  // 또박이 이미지 상태
        };

        this.buttonSound = null;                           // up_sweep, down_sweep 소리 경로
        this.currentIndex = 0;
        this.swpSound = null;
        this.oriAnswer = null;
        this.ques_id = null;
        this.ques_path = null;
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);
    }

    componentWillUnmount() {
        for (var i = 0; i < 2; i++) {
            this.swpSound[i].pause();
            this.swpSound[i] = null;
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

                this.ques_id = ques_id;
                this.ques_path = [ques_path2, ques_path1];
                this.oriAnswer = answers;
                this.buttonSound = [new Audio(soundURL + ques_path2), new Audio(soundURL + ques_path1)];
                this.setListener();
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    setListener = () => {
        try {
            this.swpSound = [
                (UP === this.oriAnswer[this.currentIndex][0] ? new Audio(soundURL + this.ques_path[0]) : new Audio(soundURL + this.ques_path[1])),
                (UP === this.oriAnswer[this.currentIndex][1] ? new Audio(soundURL + this.ques_path[0]) : new Audio(soundURL + this.ques_path[1]))
            ];
            this.swpSound[0].addEventListener('ended', () => {
                setTimeout(() => {
                    if (!!this.swpSound[1]) this.swpSound[1].play();
                }, 900)
            });
            this.swpSound[1].addEventListener('ended', () => {
                this.setState({
                    gameState: true,
                    TTobaki: TTobak.ttobak1_1
                });
            });
        } catch (e) {
            console.log(e);
        }
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
        const { gameState } = this.state;
        switch (id) {
            case DOWN:
                // console.log('down-up');
                this.setState({
                    DownButton: D1.d1_DownButton_UP
                });
                if (gameState) this.buttonSound[1].play();
                break;
            case UP:
                // console.log('up-up');
                this.setState({
                    UpButton: D1.d1_UpButton_UP
                });
                if (gameState) this.buttonSound[0].play();
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

    playSound = () => {
        if (this.currentIndex > 4) {
            this.newRequest();
            return;
        }
        this.setState({
            gameState: false,
        })

        this.swpSound[0].play();
    }

    finished = async () => {
        console.log('finished');
        const { s_id, stdAnswer, is_review } = this.state;
        const answer = [this.oriAnswer[this.currentIndex][0], this.oriAnswer[this.currentIndex][1]];
        this.setState({
            TTobaki: TTobak.ttobak2_1,
        });

        try {
            const { data } = await D1_Api.answer(s_id, this.ques_id, answer, stdAnswer, is_review);
            console.log(data);

            if (data.code === 1) {
                if (data.to_next === true || data.to_next_freq === true) {
                    this.newRequest();
                    setTimeout(() => {
                        this.playSound();
                    }, 1000);
                }
                else if (data.to_next === '모든 문제를 풀었습니다') {
                    // TODO 다음 검사로
                    console.log('next diagnose');
                } else {
                    this.currentIndex++;
                    setTimeout(() => {
                        this.setState({
                            gameState: false,
                            Answer: [],
                            sweep: [],
                            path: [],
                            stdAnswer: [],
                            TTobaki: TTobak.ttobak1_1,
                        });
                    }, 1500);

                    this.setListener();

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