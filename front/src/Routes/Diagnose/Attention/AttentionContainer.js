import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingComp from 'Components/LoadingComp';
import AttentionPresenter from './AttentionPresenter';

import { D3, TTobak, SoundEffect } from 'images';
import { D3_Api, soundURL, D_tutorial } from 'api';

const idx_txt = 'foc';
const initState = {
    gameState: false,
    s_id: 4,
    isImageLoaded: false,
    percent: 0,
    showPopup: false,
    showNextPopup: false,
    isRecording: false,
    TTobaki: TTobak.ttobak1_1,
    currentIndex: 1,
    totalNum: 0,
    isPlaying: false,
    RecordingCircle: false,
};

class Attention extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.recording_start_sound = new Audio(SoundEffect.recording_start);
        this.recording_end_sound = new Audio(SoundEffect.recording_end);
        this.numOfLoadedImage = 0;
        this.picture = { D3, TTobak };
        this.totalImages = Object.keys(D3).length + Object.keys(TTobak).length;
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.audioResult = null;

        this.state = initState;
    }

    async componentDidMount() {
        const { user } = this.props;

        if (!user.user.u_id || !user.student.s_id) {
            this.props.history.push('/root/signin');
            return;
        }

        this.imagesPreloading(this.picture);

        window.addEventListener('android', this.androidResponse);
        window.addEventListener('androidStopRecording', this.stopRecording);
    }

    componentWillUnmount() {
        if (!!this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.remove();
            this.currentAudio = null;
        }
        if (!!this.sample_ques) {
            this.sample_ques.pause();
            this.sample_ques = null;
        }
        if (!!this.voice) {
            for (let i = 0; i < this.voice.length; i++) {
                if (!!this.voice[i]) {
                    this.voice.pause();
                    this.voice = null;
                }
            }
            window.removeEventListener('android', this.androidResponse)
            window.removeEventListener('androidStopRecording', this.stopRecording);
        }
    }

    androidResponse = async (e) => {
        console.log(e.detail);
        this.audioResult = e.detail;
        this.andriodListener();
    }

    stopRecording = (e) => {
        console.log(e.detail);
        clearInterval(this.setRecording);
        this.recording_end_sound.play();
        this.setState({
            isRecording: false,
            RecordingCircle: false,
        });
    }

    newRequest = async () => {
        console.log('new request!');
        const { user } = this.props;

        const { data } = await D3_Api.ask(user.student.s_id, user.student.s_id);
        console.log(data);

        switch (data.code) {
            case 1:
                this.cure = data.focus;
                this.currentIndex = 0;
                this.currentCure = this.cure[this.currentIndex];
                this.currentAudio = null;
                this.currentAudio = new Audio(soundURL + this.currentCure.ques_path1);
                this.setState({
                    totalNum: this.cure.length,
                })
                setTimeout(() => this.playSound(), 2000);
                break;
            case 'tutorial':
                this.tutorial(data);
                break;
            default:
                break;
        }
    }

    tutorial = (data) => {
        this.setState({
            gameState: 'tutorial',
        })
        this.ques_char = data.sample_ques.ques_char;
        this.sample_ques = new Audio(soundURL + data.sample_ques.ques_path1);
        this.voice = [];
        for (let i = 0; i < data.voice.length; i++) {
            this.voice.push(new Audio(soundURL + data.voice[i].voc_path));
        }

        this.voice[0].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak3_2,
            });
            setTimeout(() => {
                if (!!this.sample_ques) {
                    this.sample_ques.play();
                    this.setState({
                        TTobaki: TTobak.ttobak3_2,
                        isPlaying: true,
                    });
                }
            }, 1000);
        });

        this.sample_ques.addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1,
                isPlaying: false,
            });
            setTimeout(() => {
                if (!!this.voice[1]) this.voice[1].play();
                this.setState({
                    TTobaki: TTobak.ttobak3_2,
                });
            }, 1000);
        });

        this.voice[1].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1,
                isPlaying: false,
            });
            setTimeout(() => {
                this.recording_start_sound.play();
                this.setState({
                    isRecording: true,
                })
                this.setRecording = setInterval(() => {
                    this.setState({
                        RecordingCircle: !this.state.RecordingCircle,
                    });
                }, 500);
                window.BRIDGE.recordAudio(this.props.user.student.gender, this.ques_char);
            }, 800);
        });

        this.voice[2].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1,
            });
            setTimeout(() => {
                if (!!this.sample_ques) this.sample_ques.play();
            }, 1000);
        });

        this.voice[3].addEventListener('ended', async () => {
            const { data } = await D_tutorial.answer(this.props.user.student.s_id, idx_txt);
            console.log(data);
            this.setState({
                gameState: false,
            });
            this.newRequest();
            this.sample_ques = null;
            this.voice = null;
        });

        setTimeout(() => {
            if (!!this.voice[0]) this.voice[0].play();
        }, 1000);
    }

    andriodListener = async () => {
        this.setState({
            TTobaki: TTobak.ttobak2_1,
        });

        try {
            if (this.audioResult.status === 'Success') {
                const { user } = this.props;
                if (this.state.gameState === 'tutorial') {
                    this.setState({
                        TTobaki: TTobak.ttobak3_2,
                    });

                    if (this.audioResult.score < 85) {
                        if (!!this.voice[2]) this.voice[2].play();
                    } else {
                        if (!!this.voice[3]) this.voice[3].play();
                    }
                    return;
                }

                const { data } = await D3_Api.answer(
                    user.student.s_id,
                    this.currentCure.ques_id,
                    this.audioResult.score,
                    this.audioResult.phone_score,
                    this.audioResult.speed_score,
                    this.audioResult.rhythm_score,
                );
                console.log(data);

                if (data.code === 1) {
                    if (data.is_stop || data.to_next_level === '모든 문제를 학습했습니다') {
                        this.gameDone();
                    } else if (data.to_next_level) {
                        this.newRequest();
                    } else {
                        if (this.currentIndex < this.cure.length - 1) {
                            this.currentIndex++;
                        } else {
                            this.gameDone();
                            return;
                        }
                        this.currentCure = this.cure[this.currentIndex];
                        this.currentAudio.remove();
                        this.currentAudio = null;
                        this.currentAudio = new Audio(soundURL + this.currentCure.ques_path1);

                        setTimeout(() => {
                            this.setState({
                                TTobaki: TTobak.ttobak1_1,
                                currentIndex: this.currentIndex + 1,
                            });
                        }, 3000);

                        setTimeout(() => {
                            this.playSound();
                        }, 5500);
                    }
                }
                else console.log(data.message);

            } else {
                console.log(this.audioResult.message);
            }
        } catch (e) {
            console.log(e);
        }
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.currentAudio.addEventListener('ended', () => {
                this.setState({
                    TTobaki: TTobak.ttobak1_1,
                    isPlaying: false,
                });

                setTimeout(() => {
                    this.recording_start_sound.play();
                    this.setState({
                        isRecording: true,
                    });

                    this.setRecording = setInterval(() => {
                        this.setState({
                            RecordingCircle: !this.state.RecordingCircle,
                        });
                    }, 500);

                    window.BRIDGE.recordAudio(this.props.user.student.gender, this.currentCure.ques_char);
                }, 800);
            });

            this.currentAudio.play();

            this.setState({
                TTobaki: TTobak.ttobak3_2,
                isPlaying: true,
            });

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
                        this.newRequest();
                    }
                };
            }
        }
    }

    gameDone = () => {
        console.log('game doen!');
        this.setState({
            showNextPopup: true,
        });
    }

    onPopupButtonHandle = () => {
        this.props.history.push('/diagnose/result');
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

    onCompleteButtonHandle = () => {
        if (this.state.isRecording) {
            window.BRIDGE.requestStopRecording();
        }
    }

    render() {
        const { isImageLoaded, showPopup, showNextPopup, percent, TTobaki, RecordingCircle, isPlaying } = this.state;

        if (isImageLoaded) {
            return (<AttentionPresenter
                Background={D3.d3_background}
                TTobak={TTobaki}
                RecordingCircle={RecordingCircle} isPlaying={isPlaying}
                showPopup={showPopup}
                showNextPopup={showNextPopup}
                onPopupButtonHandle={this.onPopupButtonHandle}
                onContinueButtonHandle={this.onContinueButtonHandle}
                onPauseButtonHandle={this.onPauseButtonHandle}
                onCompleteButtonHandle={this.onCompleteButtonHandle}
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

export default connect(mapStateToProps)(withRouter(Attention));