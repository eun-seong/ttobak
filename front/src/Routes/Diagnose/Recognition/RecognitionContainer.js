import React from 'react';
import RecognitionPresenter from './RecognitionPresenter';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TTobak, D2 } from 'images';
import { D2_Api, soundURL } from 'api';
import LoadingComp from 'Components/LoadingComp';
class Recognition extends React.PureComponent {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.state = {
            gameState: false,
            Box: [D2.d2_Box1_1, D2.d2_Box2_1],          // Box 이미지
            TTobaki: TTobak.ttobak3_1,
            oriAnswer: null,                            // 정답
            stdAnswer: null,                            // 학생 답
            answerIndex: 0,
            isAnimate: [false, false],
            isImageLoaded: false,
            showPopup: false,
            showNextPopup: true,
        };

        this.phs = null;
        this.answers = null;
        this.phSound = null;
        this.answer = null;
        this.currentIndex = 0;
        this.currentDiag = null;
        this.numOfLoadedImage = 0;
        this.picture = { D2, TTobak };
        this.totalImages = Object.keys(D2).length + Object.keys(TTobak).length;
    }

    async componentDidMount() {
        const { user } = this.props;
        
        if(!user.user.u_id) {
            this.props.history.push('/root/signin');
            return;
        }

        if(!user.student.s_id) {
            this.props.history.push('/root/selectstd');
            return;
        }

        this.newRequest();
        this.imagesPreloading(this.picture);
    }

    componentWillUnmount() {
        for (var i = 0; i < this.phSound.length; i++) {
            if (!!this.phSound[i]) {
                this.phSound[i].pause();
                this.phSound[i] = null;
            }
        }
    }

    newRequest = async () => {
        console.log('new request');
        const { user } = this.props;
        const s_id = user.student.s_id;

        try {
            const { data } = await D2_Api.ask(s_id);
            console.log(data);

            if (data.code === 1) {
                this.answers = data.answers;
                this.phs = data.phs;
                this.currentIndex = 0;
                this.currentDiag = [
                    this.getListFilter('ques_id', this.answers[this.currentIndex][0]),
                    this.getListFilter('ques_id', this.answers[this.currentIndex][1]),
                    this.getListFilter('ques_id', this.answers[this.currentIndex][2]),
                ];
                this.setState({
                    gameState: false,
                    Box: [D2.d2_Box1_1, D2.d2_Box2_1],
                    stdAnswer: null,
                    TTobaki: TTobak.ttobak1_1,
                    answerIndex: (this.currentDiag[0].ques_id === this.currentDiag[2].ques_id ? 0 : 1),
                });
                this.setListener();
            }
        } catch (e) {
            console.log(e);
        }
    }

    setListener = () => {
        this.phSound = [
            new Audio(soundURL + this.currentDiag[0].ques_path1),
            new Audio(soundURL + this.currentDiag[1].ques_path1),
            new Audio(soundURL + this.currentDiag[2].ques_path1),
        ];

        this.phSound[2].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1
            })
            setTimeout(() => {
                if (!!this.phSound[0]) {
                    this.phSound[0].play();
                    this.setState({
                        isAnimate: [true, false],
                        TTobaki: TTobak.ttobak3_2
                    });
                }
            }, 800);
        })

        this.phSound[0].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1
            })
            setTimeout(() => {
                if (!!this.phSound[1]) {
                    this.phSound[1].play();
                    this.setState({
                        isAnimate: [false, true],
                        TTobaki: TTobak.ttobak3_2
                    });
                }
            }, 300);
        })
        this.phSound[1].addEventListener('ended', () => {
            this.setState({
                gameState: true,
                TTobaki: TTobak.ttobak1_1
            })
        });
    }

    getListFilter = (key, value) => {
        return this.phs.filter((object) => { return object[key] === value })[0]
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
        this.setState({
            TTobaki: TTobak.ttobak3_2,
        })
        if (!!this.phSound[2]) this.phSound[2].play();
    }

    diagDone = () => {
        console.log('diagnose done!');
        this.setState({
            showNextPopup: true,
        });
    }

    finished = async (id) => {
        this.setState({
            TTobaki: TTobak.ttobak2_1,
        })
        const { user } = this.props;
        const s_id = user.student.s_id;
        const [ph, oriAnswer, stdAnswer] = [
            [this.currentDiag[0].ques_id, this.currentDiag[1].ques_id],
            this.currentDiag[0].ques_id === this.currentDiag[2].ques_id ? this.currentDiag[0].ques_char : this.currentDiag[1].ques_char,
            this.currentDiag[id].ques_char
        ];

        try {
            const { data } = await D2_Api.answer(s_id, oriAnswer, stdAnswer, ph, 'T');
            console.log(data);

            if (data.code === 1) {
                if (this.currentIndex < this.answers.length - 1) this.currentIndex++;
                else {
                    this.diagDone();
                    return;
                }

                this.currentDiag = [
                    this.getListFilter('ques_id', this.answers[this.currentIndex][0]),
                    this.getListFilter('ques_id', this.answers[this.currentIndex][1]),
                    this.getListFilter('ques_id', this.answers[this.currentIndex][2]),
                ];

                this.setListener();
                setTimeout(() => {
                    this.setState({
                        gameState: false,
                        Box: [D2.d2_Box1_1, D2.d2_Box2_1],
                        stdAnswer: null,
                        TTobaki: TTobak.ttobak3_1,
                        answerIndex: (this.currentDiag[0].ques_id === this.currentDiag[2].ques_id ? 0 : 1),
                    });
                }, 2000);

                setTimeout(() => {
                    this.playSound();
                }, 3000);
            }
        } catch (e) {
            console.log(e);
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
                        setTimeout(() => this.playSound(), 1000);
                    }
                };
            }
        }
    }

    onPopupButtonHandle = () => {
        this.props.history.replace('/diagnose/attention');
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
        const { Box, TTobaki, isAnimate, showPopup, showNextPopup, percent, isImageLoaded } = this.state;

        if (isImageLoaded) {
            return (
                <RecognitionPresenter
                    Background={D2.d2_background}
                    TTobaki={TTobaki}
                    TTobakiTouch={this.TTobakiTouch}
                    Box={Box}
                    Clicked={this.onBoxTouchHandle}
                    isAnimate={isAnimate}
                    showPopup={showPopup}
                    showNextPopup={showNextPopup}
                    onPopupButtonHandle={this.onPopupButtonHandle}
                    onContinueButtonHandle={this.onContinueButtonHandle}
                    onPauseButtonHandle={this.onPauseButtonHandle}
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
  
  export default connect(mapStateToProps)(withRouter(Recognition));