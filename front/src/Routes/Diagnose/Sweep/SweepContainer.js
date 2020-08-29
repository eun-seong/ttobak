import React from 'react';
import SweepPresenter from './SweepPresenter';

import UpButton_UP from 'img/d1_sweep/up.png';
import DownButton_UP from 'img/d1_sweep/down.png';
import UpButton_DOWN from 'img/d1_sweep/up_pushed.png';
import DownButton_DOWN from 'img/d1_sweep/down_pushed.png';
import AnswerDown from 'img/d1_sweep/answer_down.png';
import AnswerUp from 'img/d1_sweep/answer_up.png';

const UP = 'up';
const DOWN = 'down';

export default class extends React.Component {
    state = {
        answerNum: 0,
        UpButton: UpButton_UP,
        DownButton: DownButton_UP,
        Answer: []
    };

    onMouseDown = (id) => {
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
                        DownButton: DownButton_DOWN,
                        Answer: Answer.concat(AnswerDown)
                    });
                    break;
                case UP:
                    // console.log('up-down');
                    this.setState({
                        UpButton: UpButton_DOWN,
                        Answer: Answer.concat(AnswerUp)
                    });
                    break;
                default:
            }
        }
    }

    onMouseUp = (id) => {
        console.log(this.state);

        switch (id) {
            case DOWN:
                // console.log('down-up');
                this.setState({
                    DownButton: DownButton_UP
                });
                break;
            case UP:
                // console.log('up-up');
                this.setState({
                    UpButton: UpButton_UP
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

        const { UpButton, DownButton, Answer } = this.state;

        return (
            <SweepPresenter
                UP={UP} DOWN={DOWN}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                UpButton={UpButton}
                DownButton={DownButton}
                Answer1={Answer[0]}
                Answer2={Answer[1]}
            />);
    }
}