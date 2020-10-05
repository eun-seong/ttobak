import React from 'react';
import SweepPresenter from './SweepPresenter';
import { D1_Api } from 'api';
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
            sweep: [],                                  // sweep 정답 순서 경로
            path: [],                                   // up_sweep, down_sweep 소리 경로
            oriAnswer: [],                              // 정답
            stdAnswer: [],                              // 학습자 정답
            Answer: [],                                 // 정답 상자
            TTobaki: TTobak.ttobak1_1,                  // 또박이 이미지 상태
            swp_id: null,                               // sweep 검사 아이디 
            s_id: s_id || 4,                            // 학습자 아이디
        };
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
        const { gameState, path } = this.state;
        switch (id) {
            case DOWN:
                // console.log('down-up');
                this.setState({
                    DownButton: D1.d1_DownButton_UP
                });
                if (gameState) path[1].play();
                break;
            case UP:
                // console.log('up-up');
                this.setState({
                    UpButton: D1.d1_UpButton_UP
                });
                if (gameState) path[0].play();
                break;
            default:
        }
        if (this.state.Answer.length === 2) this.finished();
    }

    TTobakiTouch = async () => {
        // console.log(this.state);
        const { gameState } = this.state;
        if (gameState) {
            this.playSound();
        } else {
            try {
                const { data } = await D1_Api.ask(500, 1, 4);
                console.log(data);

                if (data.code === 1) {
                    const { answer1, answer2, down_path, up_path, swp_id } = data;
                    const url = [
                        answer1 === 'up' ? up_path : down_path,
                        answer2 === 'up' ? up_path : down_path
                    ]

                    this.setState({
                        gameState: true,
                        oriAnswer: [answer1, answer2],
                        swp_id: swp_id,
                        path: [new Audio(up_path), new Audio(down_path)],
                        sweep: [new Audio(url[0]), new Audio(url[1])],
                    });

                    this.playSound();
                }
                else console.log('data message: ' + data.message);
            } catch (e) {
                console.log('error: ' + e);
            }
        }
    }

    playSound = async () => {
        const { sweep } = this.state;
        await sweep[0].play();
        this.delay(1000);
        await sweep[1].play();
    }

    finished = async () => {
        console.log('finished');
        const { s_id, swp_id, oriAnswer, stdAnswer } = this.state;

        try {
            const data = await D1_Api.answer(s_id, swp_id, oriAnswer, stdAnswer);
            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            this.delay(800);
            this.setState({
                gameState: false,
                Answer: [],
                sweep: [],
                path: [],
                oriAnswer: [],
                stdAnswer: [],
            });
        }
    }

    delay = async (ms) => {
        const now = new Date().getTime()
        while (new Date().getTime() < now + ms) { }
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
            />);
    }
}

export default withRouter(Sweep);