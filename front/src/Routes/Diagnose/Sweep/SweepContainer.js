import React, { useMemo } from 'react';
import SweepPresenter from './SweepPresenter';
import { D1_Api } from 'api';
import { SwpTest, TTobak } from 'images';
import { withRouter } from 'react-router-dom';

const UP = 'up';
const DOWN = 'down';

// D1_Api.ask(500, 1, 4);

class Sweep extends React.PureComponent {
    constructor() {
        super();
    }

    state = {
        gameState: false,
        UpButton: SwpTest.UpButton_UP,
        DownButton: SwpTest.DownButton_UP,
        url: [],
        path: [],
        oriAnswer: [],
        stdAnswer: [],
        Answer: [],
        TTobaki: TTobak.ttobak1_1,
        swp_id: null,
        s_id: 4,
    };

    onTouchStart = (id) => {
        const { Answer, stdAnswer, gameState } = this.state;
        // TODO
        // 두 개 모두 채워지면 정답 애니메이션 나온 후 정답 상자 리셋

        switch (id) {
            case DOWN:
                // console.log('down-down');
                this.setState({
                    DownButton: SwpTest.DownButton_DOWN,
                    Answer: Answer.concat(gameState ? SwpTest.AnswerDown : []),
                    stdAnswer: stdAnswer.concat(gameState ? DOWN : [])
                });
                break;
            case UP:
                // console.log('up-down');
                this.setState({
                    UpButton: SwpTest.UpButton_DOWN,
                    Answer: Answer.concat(gameState ? SwpTest.AnswerUp : []),
                    stdAnswer: stdAnswer.concat(gameState ? UP : [])
                });
                break;
            default:
        }
    }

    onTouchEnd = (id) => {
        // console.log(this.state);
        const { gameState, path } = this.state;
        switch (id) {
            case DOWN:
                // console.log('down-up');
                this.setState({
                    DownButton: SwpTest.DownButton_UP
                });
                if (gameState)
                    window.BRIDGE.playSound(path[0]);
                break;
            case UP:
                // console.log('up-up');
                this.setState({
                    UpButton: SwpTest.UpButton_UP
                });
                if (gameState)
                    window.BRIDGE.playSound(path[1]);
                break;
            default:
        }
        if (this.state.Answer.length === 2) this.finished();
    }

    TTobakiTouch = async () => {
        const { gameState } = this.state;
        if (gameState) {
            const { url } = this.state;

            window.BRIDGE.playSound('https://ttobakaudio.s3-ap-northeast-2.amazonaws.com/diagnose/sweep/d_500_80.wav');
            this.delay(1000);
            window.BRIDGE.playSound('https://ttobakaudio.s3-ap-northeast-2.amazonaws.com/diagnose/sweep/u_500_80.wav');

            // window.BRIDGE.playSound(url[0]);
            // this.delay(1000);
            // window.BRIDGE.playSound(url[1]);
        } else {
            try {
                const { data } = await D1_Api.ask(500, 1, 4);
                console.log(data);

                if (data.code === 1) {
                    const { answer1, answer2, down_path, up_path, swp_id } = data;

                    this.setState({
                        gameState: true,
                        oriAnswer: [answer1, answer2],
                        swp_id: swp_id,
                        url: [
                            answer1 === 'up' ? up_path : down_path,
                            answer2 === 'up' ? up_path : down_path
                        ],
                        path: [up_path, down_path],
                    });

                    const { url } = this.state;
                    window.BRIDGE.playSound('https://ttobakaudio.s3-ap-northeast-2.amazonaws.com/diagnose/sweep/d_500_80.wav');
                    this.delay(1000);
                    window.BRIDGE.playSound('https://ttobakaudio.s3-ap-northeast-2.amazonaws.com/diagnose/sweep/u_500_80.wav');


                    // window.BRIDGE.playSound(url[0]);
                    // this.delay(1000);
                    // window.BRIDGE.playSound(url[1]);

                }
                else console.log('data message: ' + data.message);
            } catch (e) {
                console.log('error: ' + e);
            }
        }
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
                url: [],
                path: [],
                oriAnswer: [],
                stdAnswer: [],
            });
        }
    }

    delay = (ms) => {
        const now = new Date().getTime()
        while (new Date().getTime() < now + ms) { }
    }

    render() {
        console.log(this.props.history);
        const { UpButton, DownButton, Answer, TTobaki, url, playingStatus } = this.state;

        return (
            <SweepPresenter
                UP={UP} DOWN={DOWN}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
                UpButton={UpButton}
                DownButton={DownButton}
                Answer={Answer}
                TTobak={TTobaki}
                TTobakiTouch={this.TTobakiTouch}
                url={url}
                status={playingStatus}
                onEnded={() => console.log('onEnded')}
            />);
    }
}

export default withRouter(Sweep);