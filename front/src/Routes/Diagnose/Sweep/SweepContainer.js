import React, { useMemo } from 'react';
import SweepPresenter from './SweepPresenter';
import { D1_Api } from 'api';
import { SwpTest, TTobak } from 'images';
import { withRouter } from 'react-router-dom';

const UP = 'up';
const DOWN = 'down';

// D1_Api.ask(500, 1, 4);

class Sweep extends React.Component {
    state = {
        gameState: false,
        UpButton: SwpTest.UpButton_UP,
        DownButton: SwpTest.DownButton_UP,
        sweep: [],
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
                if (gameState) path[1].play();
                break;
            case UP:
                // console.log('up-up');
                this.setState({
                    UpButton: SwpTest.UpButton_UP
                });
                if (gameState) path[0].play();
                break;
            default:
        }
        if (this.state.Answer.length === 2) this.finished();
    }

    TTobakiTouch = async () => {
        const { gameState } = this.state;
        if (gameState) {
            await this.state.sweep[0].play();
            this.delay(1000);
            await this.state.sweep[1].play();
        } else {
            try {
                const { data } = await D1_Api.ask(500, 1, 4);
                // console.log(data);
                if (data.code === 1) {
                    const { answer1, answer2, down_path, up_path, swp_id } = data;

                    const [url1, url2] = [
                        answer1 === 'up' ? up_path : down_path,
                        answer2 === 'up' ? up_path : down_path
                    ];

                    this.setState({
                        gameState: true,
                        oriAnswer: [answer1, answer2],
                        swp_id: swp_id,
                        sweep: [new Audio(url1), new Audio(url2)],
                        path: [new Audio(up_path), new Audio(down_path)]
                    });

                    await this.state.sweep[0].play();
                    this.delay(1000);
                    await this.state.sweep[1].play();
                }
                else console.log(data.message);
            } catch (e) {
                console.log(e);
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
                sweep: [],
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
        const { UpButton, DownButton, Answer, TTobaki } = this.state;

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
            />);
    }
}

export default withRouter(Sweep);