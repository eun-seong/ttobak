import React, { useMemo } from 'react';
import SweepPresenter from './SweepPresenter';
import { D1_Api } from 'api';
import { SwpTest, TTobak } from 'images';
import { withRouter } from 'react-router-dom';
import Sound from 'react-sound';

const UP = 'up';
const DOWN = 'down';

// D1_Api.ask(500, 1, 4);

class Sweep extends React.PureComponent {
    constructor() {
        super();
    }

    state = {
        gameState: false,                           // 게임 상태
        UpButton: SwpTest.UpButton_UP,              // 버튼 이미지 상태
        DownButton: SwpTest.DownButton_UP,          // 버튼 이미지 상태
        url: [],                                    // sweep 정답 순서 경로
        path: [],                                   // up_sweep, down_sweep 소리 경로
        oriAnswer: [],                              // 정답
        stdAnswer: [],                              // 학습자 정답
        Answer: [],                                 // 정답 상자
        TTobaki: TTobak.ttobak1_1,                  // 또박이 이미지 상태
        swp_id: null,                               // sweep 검사 아이디 
        s_id: 4,                                    // 학습자 아이디
        buttonSound: {
            buttonPlayingStatus: Sound.status.STOPPED,  // 사운드 재생상태
            url: null
        },
        ttobakSound: {
            ttobakPlayingStatus: Sound.status.STOPPED,  // 사운드 재생상태
            url: null
        }
    };

    onTouchStart = (id) => {
        const { Answer, stdAnswer, gameState } = this.state;

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
        console.log('onTouchEnd');
        console.log(this.state);
        const { gameState, path } = this.state;
        switch (id) {
            case DOWN:
                // console.log('down-up');
                this.setState({
                    DownButton: SwpTest.DownButton_UP
                });
                if (gameState)
                    this.setState({
                        buttonSound: {
                            buttonPlayingStatus: Sound.status.PLAYING,
                            url: 'https://ttobakaudio.s3-ap-northeast-2.amazonaws.com/diagnose/01_sweeps/d_500_80.mp3'//path[0]
                        }
                    })
                break;
            case UP:
                // console.log('up-up');
                this.setState({
                    UpButton: SwpTest.UpButton_UP
                });
                if (gameState)
                    this.setState({
                        buttonSound: {
                            buttonPlayingStatus: Sound.status.PLAYING,
                            url: 'https://ttobakaudio.s3-ap-northeast-2.amazonaws.com/diagnose/01_sweeps/u_500_80.mp3'//path[1]
                        }
                    })
                break;
            default:
        }
        if (this.state.Answer.length === 2) this.finished();
    }

    TTobakiTouch = async () => {
        // console.log(this.state);

        const { gameState } = this.state;
        if (gameState) {
            const { url } = this.state;

            // window.BRIDGE.playSound('https://ttobakaudio.s3-ap-northeast-2.amazonaws.com/diagnose/sweep/d_500_80.wav');
            // this.delay(1000);
            // window.BRIDGE.playSound('https://ttobakaudio.s3-ap-northeast-2.amazonaws.com/diagnose/sweep/u_500_80.wav');

            // window.BRIDGE.playSound(url[0]);
            // this.delay(1000);
            // window.BRIDGE.playSound(url[1]);
        } else {
            try {
                const { data } = await D1_Api.ask(500, 1, 4);
                console.log(data);
                // window.BRIDGE.toast(JSON.stringify(data.data));

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

                    // this.setState({
                    //     playingStatus: Sound.status.PLAYING
                    // })
                    // this.delay(1000);
                    // this.setState({
                    //     playingStatus: Sound.status.PLAYING
                    // })
                    // soundManager.setup({
                    //     url: url,
                    //     ignoreMobileRestrictions: true,
                    // })
                    // window.BRIDGE.playSound('https://ttobakaudio.s3-ap-northeast-2.amazonaws.com/diagnose/sweep/d_500_80.wav');
                    // this.delay(1000);
                    // window.BRIDGE.playSound('https://ttobakaudio.s3-ap-northeast-2.amazonaws.com/diagnose/sweep/u_500_80.wav');
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

    handleButtonFinishedPlaying = () => {
        this.setState({
            buttonSound: {
                buttonPlayingStatus: Sound.status.PLAYING,
                url: null
            }
        })
    }

    handleTTobakFinishedPlaying = () => {
        this.setState({
            ttobakPlayingStatus: Sound.status.STOPPED
        })
    }

    delay = async (ms) => {
        const now = new Date().getTime()
        while (new Date().getTime() < now + ms) { }
    }

    render() {
        console.log(this.props.history);
        const { UpButton, DownButton, Answer, TTobaki, buttonSound, ttobakSound } = this.state;

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
                buttonSound={buttonSound} ttobakSound={ttobakSound}
                handleButtonFinishedPlaying={this.handleButtonFinishedPlaying}
                handleTTobakFinishedPlaying={this.handleTTobakFinishedPlaying}
            />);
    }
}

export default withRouter(Sweep);