import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { D1_Api, soundURL, D_tutorial } from 'api';
import LoadingComp from 'Components/LoadingComp';
import SweepPresenter from './SweepPresenter';
import { D1, TTobak } from 'images';

const idx_txt = 'swp';
const UP = 'up';
const DOWN = 'down';
const initState = {
    gameState: false,                           // 게임 상태
    UpButton: D1.d1_UpButton_UP,                // 버튼 이미지 상태
    DownButton: D1.d1_DownButton_UP,            // 버튼 이미지 상태
    stdAnswer: [],                              // 학습자 정답
    Answer: [],                                 // 정답 상자
    TTobaki: TTobak.ttobak1_1,                  // 또박이 이미지 상태
    swpSound: null,
    isImageLoaded: false,
    percent: 0,
    showPopup: false,
    showNextPopup: false,
    currentIndex: 1,
    totalNum: 0,
    tutorialState: false,
};

class Sweep extends React.PureComponent {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super();
        this.buttonSound = null;                           // up_sweep, down_sweep 소리 경로
        this.currentIndex = 0;
        this.oriAnswer = null;
        this.ques_id = null;
        this.ques_path = null;
        this.currentIndex = 0;
        this.numOfLoadedImage = 0;
        this.picture = { D1, TTobak };
        this.totalImages = Object.keys(D1).length + Object.keys(TTobak).length;

        this.state = initState;
    }

    async componentDidMount() {
        const { user } = this.props;

        if (!user.user.u_id || !user.student.s_id) {
            this.props.history.push('/root/signin');
            return;
        }

        this.imagesPreloading(this.picture);
        this.newRequest();
    }

    componentWillUnmount() {
        let audioArr = [this.voice, this.voice_desc, this.swp];
        for (let i = 0; i < audioArr.length; i++) {
            if (!!audioArr[i]) {
                for (var j = 0; j < audioArr[i].length; j++) {
                    if (!!audioArr[i][j]) {
                        audioArr[i][j].pause();
                        audioArr[i][j] = null;
                    }
                }
            }
        }

        if (!!this.state.swpSound) {
            this.state.swpSound[0].pause();
            this.state.swpSound[1].pause();
        }
        this.setState({
            swpSound: null,
        });
    }

    newRequest = async () => {
        console.log('new request');
        const { user } = this.props;
        const s_id = user.student.s_id;

        try {
            // console.log(s_id);
            const { data } = await D1_Api.ask(s_id);
            console.log(data);

            switch (data.code) {
                case 1:
                    const { answers, swp: { ques_id, ques_path1, ques_path2 } } = data;
                    this.currentIndex = 0;
                    this.ques_id = ques_id;
                    this.ques_path = [ques_path2, ques_path1];
                    this.oriAnswer = answers;
                    this.buttonSound = [new Audio(soundURL + this.ques_path[0]), new Audio(soundURL + this.ques_path[1])];
                    this.setState({
                        totalNum: this.oriAnswer.length,
                    });
                    this.setListener();
                    setTimeout(() => this.playSound(), 3000);
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 'tutorial':
                    this.tutorial(data);
                    break;
                default:
                    console.log('data message: ' + data.message);
                    break;
            }
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    tutorial = (data) => {
        this.voice = [];
        this.voice_desc = [];
        this.swp = [new Audio(soundURL + data.sample_ques.ques_path2), new Audio(soundURL + data.sample_ques.ques_path1)];
        this.buttonSound = [new Audio(soundURL + data.sample_ques.ques_path2), new Audio(soundURL + data.sample_ques.ques_path1)];
        for (let i = 0; i < 4; i++) {
            this.voice.push(new Audio(soundURL + data.voice[i].voc_path));
            this.voice_desc.push(data.voice[i].voc_desc);

            this.voice[i].addEventListener('ended', () => {
                this.setState({
                    TTobaki: TTobak.ttobak1_1,
                    gameState: 'tutorial',
                    tutorialState: this.voice_desc[i],
                });
            });
        }

        const swpUp = (cnt) => {
            if (cnt >= 2) {
                setTimeout(() => {
                    if (!!this.voice[1]) this.voice[1].play();
                    this.setState({
                        TTobaki: TTobak.ttobak3_2,
                        gameState: false,
                    })
                }, 1000);
                return cnt;
            }

            if (!!this.swp[0]) this.swp[0].play();
            this.setState({
                UpButton: D1.d1_UpButton_DOWN,
            });
            setTimeout(() => {
                this.setState({
                    UpButton: D1.d1_UpButton_UP,
                });
                setTimeout(() => {
                    cnt = swpUp(++cnt);
                }, 1000);
            }, 500);
        };

        this.voice[0].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1,
            });

            setTimeout(() => {
                swpUp(0);
            }, 1000);
        })

        this.voice[3].addEventListener('ended', async () => {
            const { data } = await D_tutorial.answer(this.props.user.student.s_id, idx_txt);
            console.log(data);
            this.setState({
                initState,
            });
            this.newRequest();

            this.voice = null;
            this.voice_desc = null;
            this.swp = null;
            this.buttonSound = null;
        })

        setTimeout(() => {
            if (!!this.voice[0]) this.voice[0].play();
            this.setState({
                TTobaki: TTobak.ttobak3_2,
                gameState: false,
            })
        }, 1500);
    }

    tutorialButtonEvent = (id) => {
        const swpDown = (cnt) => {
            if (cnt >= 2) {
                setTimeout(() => {
                    if (!!this.voice[2]) this.voice[2].play();
                    this.setState({
                        TTobaki: TTobak.ttobak3_2,
                        gameState: false,
                    })
                }, 1200);
                return cnt;
            }

            if (!!this.swp[1]) this.swp[1].play();
            this.setState({
                DownButton: D1.d1_DownButton_DOWN,
            });
            setTimeout(() => {
                this.setState({
                    DownButton: D1.d1_DownButton_UP,
                });
                setTimeout(() => {
                    cnt = swpDown(++cnt);
                }, 1000);
            }, 500);
        };

        if (id === UP && this.state.tutorialState === this.voice_desc[1]) {
            this.setState({
                tutorialState: this.voice_desc[2],
            })
            setTimeout(() => {
                swpDown(0);
            }, 2000);
        } else if (id === DOWN && this.state.tutorialState === this.voice_desc[2]) {
            setTimeout(() => {
                this.setState({
                    TTobaki: TTobak.ttobak3_2,
                    gameState: false,
                    tutorialState: this.voice_desc[3],
                })
                if (!!this.voice[3]) this.voice[3].play();
            }, 2000);
        }
    }

    setListener = () => {
        try {
            this.setState({
                swpSound: [
                    (UP === this.oriAnswer[this.currentIndex][0] ? new Audio(soundURL + this.ques_path[0]) : new Audio(soundURL + this.ques_path[1])),
                    (UP === this.oriAnswer[this.currentIndex][1] ? new Audio(soundURL + this.ques_path[0]) : new Audio(soundURL + this.ques_path[1]))
                ],
                currentIndex: this.currentIndex + 1,
            })

            this.state.swpSound[0].addEventListener('ended', () => {
                setTimeout(() => {
                    if (!!this.state.swpSound[1]) this.state.swpSound[1].play();
                }, 900)
            });

            this.state.swpSound[1].addEventListener('ended', () => {
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
                    Answer: Answer.concat(gameState === true ? D1.d1_AnswerDown : []),
                    stdAnswer: stdAnswer.concat(gameState === true ? DOWN : [])
                });
                break;
            case UP:
                // console.log('up-down');
                this.setState({
                    UpButton: D1.d1_UpButton_DOWN,
                    Answer: Answer.concat(gameState === true ? D1.d1_AnswerUp : []),
                    stdAnswer: stdAnswer.concat(gameState === true ? UP : [])
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
                if (gameState !== false && !!this.buttonSound[1]) this.buttonSound[1].play();
                break;
            case UP:
                // console.log('up-up');
                this.setState({
                    UpButton: D1.d1_UpButton_UP
                });
                if (gameState !== false && !!this.buttonSound[0]) this.buttonSound[0].play();
                break;
            default:
        }

        if (gameState === 'tutorial') {
            this.tutorialButtonEvent(id);
        }
        else if (this.state.Answer.length === 2) this.finished();
    }

    TTobakiTouch = async () => {
        if (this.state.gameState === true) {
            this.playSound();
        }
    }

    playSound = () => {
        if (!!this.state.swpSound[0]) {
            this.setState({
                gameState: false,
                TTobaki: TTobak.ttobak3_2,
            });

            this.state.swpSound[0].play();
        }
    }

    finished = async () => {
        if (this.state.gameState === 'tutorial') return;

        this.setState({
            gameState: false,
            TTobaki: TTobak.ttobak2_1,
        });

        const { user } = this.props;
        const s_id = user.student.s_id;

        const { stdAnswer } = this.state;
        const answer = [this.oriAnswer[this.currentIndex][0], this.oriAnswer[this.currentIndex][1]];

        try {
            const { data } = await D1_Api.answer(s_id, this.ques_id, answer, stdAnswer);
            console.log(data);

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

            if (data.code === 1) {
                if (data.to_next === true || data.to_next_freq === true) {
                    this.newRequest();
                    console.log('next');
                }
                else if (data.is_stop || data.to_next === '모든 단계를 풀었습니다.') {
                    this.setState({
                        showNextPopup: true,
                    });
                } else {
                    if (this.currentIndex < this.oriAnswer.length - 1) this.currentIndex++;
                    else {
                        this.setState({
                            showNextPopup: true,
                        });
                        return;
                    }

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

    imagesPreloading = (picture) => {
        for (let i in picture) {
            for (let prop in picture[i]) {
                let img = new Image();
                img.src = picture[i][prop];
                img.onload = () => {
                    this.setState({
                        percent: (++this.numOfLoadedImage / this.totalImages) * 100
                    });

                    if (this.numOfLoadedImage === this.totalImages) {
                        this.setState({
                            isImageLoaded: true,
                        })
                    }
                };
            }
        }
    }

    onPopupButtonHandle = () => {
        this.props.history.push('/diagnose/recognition');
    }

    onContinueButtonHandle = () => {
        this.setState({
            showPopup: false,
        })
    }

    onPauseButtonHandle = () => {
        this.setState({
            showPopup: true,
        })
    }

    render() {
        const { UpButton, DownButton, Answer, TTobaki, isImageLoaded, showPopup, showNextPopup, percent } = this.state;

        if (isImageLoaded) {
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
                    showPopup={showPopup}
                    showNextPopup={showNextPopup}
                    onPopupButtonHandle={this.onPopupButtonHandle}
                    onContinueButtonHandle={this.onContinueButtonHandle}
                    onPauseButtonHandle={this.onPauseButtonHandle}
                    currentIndex={this.state.currentIndex}
                    totalNum={this.state.totalNum}
                />);
        }
        else {
            return <LoadingComp percent={percent} />
        }
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(Sweep));