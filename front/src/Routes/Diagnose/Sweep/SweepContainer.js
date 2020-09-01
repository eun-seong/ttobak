import React from 'react';
import SweepPresenter from './SweepPresenter';
import { D1_Api } from 'api';
import { SwpTest, TTobak } from 'images';

const UP = 'up';
const DOWN = 'down';

// D1_Api.ask(500, 1, 4);

export default class extends React.Component {
    state = {
        answerNum: 0,
        UpButton: SwpTest.UpButton_UP,
        DownButton: SwpTest.DownButton_UP,
        Answer: [],
        TTobaki: TTobak.ttobak1_1
    };

    onTouchStart = (id) => {
        const { answerNum, Answer } = this.state;
        // TODO
        // 두 개 모두 채워지면 정답 애니메이션 나온 후 정답 상자 리셋
        if (answerNum === 2) {
            console.log('initiate');
            this.setState({
                answerNum: 0,
                Answer: []
            })
        }
        else {
            this.setState({ answerNum: answerNum + 1 });

            switch (id) {
                case DOWN:
                    // console.log('down-down');
                    this.setState({
                        DownButton: SwpTest.DownButton_DOWN,
                        Answer: Answer.concat(SwpTest.AnswerDown)
                    });
                    break;
                case UP:
                    // console.log('up-down');
                    this.setState({
                        UpButton: SwpTest.UpButton_DOWN,
                        Answer: Answer.concat(SwpTest.AnswerUp)
                    });
                    break;
                default:
            }
        }
    }

    onTouchEnd = (id) => {
        // console.log(this.state);

        switch (id) {
            case DOWN:
                // console.log('down-up');
                this.setState({
                    DownButton: SwpTest.DownButton_UP
                });
                break;
            case UP:
                // console.log('up-up');
                this.setState({
                    UpButton: SwpTest.UpButton_UP
                });
                break;
            default:
        }
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

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
            />);
    }
}