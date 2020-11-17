import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/browser';

import WordPresenter from './WordPresenter';
import { T1, TTobak, SoundEffect } from 'images';
import { T1_Api, soundURL, T_tutorial } from 'api';
import LoadingComp from 'Components/LoadingComp';

const inistState = {
    cureText: null,
    isRecording: false,
    TTobaki: TTobak.ttobak1_1,
    isImageLoaded: false,
    showPopup: false,
    showDonePopup: false,
    showDailyPopup: false,
    percent: 0,
    currentIndex: 1,
    totalNum: 0,
    isPlaying: false,
    RecordingCircle: false,
};

const PAUSED = 'PAUSED';
const PLAYING = 'PLAUING';
const RECORDING = 'RECORDING';
const AUDIOPLAYING = 'AUDIOPLAYING';
const failedMax = 3;

class Word extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match }) {
        super();
        this.idx_text = match.params.type;
        this.learning_type = match.params.learning_type;
        this.recording_start_sound = new Audio(SoundEffect.recording_start);
        this.recording_end_sound = new Audio(SoundEffect.recording_end);
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.audioResult = null;
        this.retryAudio = null;
        this.picture = { T1, TTobak };
        this.totalImages = Object.keys(this.picture.T1).length + Object.keys(this.picture.TTobak).length;
        this.numOfLoadedImage = 0;
        this.continuePlay = null;
        this.state = inistState;
        this.failedNum = 0;
        this.gameState = PLAYING;
        this.isTutorial = false;
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
        if (this.state.isRecording) {
            window.BRIDGE.requestStopRecording();
        }
        let audioArr = [this.currentAudio, this.retryAudio, this.good_script];
        for (let i = 0; i < audioArr.length; i++) {
            if (!!audioArr[i]) {
                audioArr[i].pause();
                audioArr[i].remove();
                audioArr[i] = null;
            }
        }

        if (!!this.voice) {
            for (let i = 0; i < this.voice.length; i++) {
                if (!!this.voice[i]) {
                    this.voice[i].pause();
                    this.voice[i].remove();
                    this.voice[i] = null;
                }
            }
        }
        window.removeEventListener('android', this.androidResponse);
        window.removeEventListener('androidStopRecording', this.stopRecording);
    }

    componentDidCatch(err, errorInfo) {
        console.error(err);
        this.setState(() => ({
            err: true,
            errorInfo: errorInfo,
        }));

        if (process.env.NODE_ENV === 'production') {
            Sentry.captureException(err, { extra: errorInfo });
        }
    }

    newRequest = async () => {
        console.log('new request');
        const { user } = this.props;
        const s_id = user.student.s_id;

        console.log(s_id, this.idx_text)
        const { data } = await T1_Api.ask(s_id, this.idx_text);
        console.log(data);

        if (data.code === 'tutorial') {
            if (this.idx_text === 'vowelword') this.voweltutorial(data);
            else this.consotutorial(data);
            return;
        }

        if (data.code === 'specified' || data.code === 1) {
            this.currentIndex = 0;
            this.cure = data.cure;
            this.currentCure = data.cure[this.currentIndex];
            this.currentCure.is_first = 'T';
            this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
            this.currentAudio.addEventListener('ended', this.currentAudioListner);

            this.setState({
                TTobaki: TTobak.ttobak1_1,
                cureText: this.currentCure.cure_word,
                totalNum: this.cure.length,
                currentIndex: this.currentIndex + 1,
            });
            setTimeout(() => {
                this.playSound();
            }, 2000);
        }
    }

    daily = () => {
        console.log(this.props.location.state.data);

        if (this.props.location.state.data.code === 'tutorial') {
            if (this.idx_text === 'vowelword') this.voweltutorial(this.props.location.state.data);
            else this.consotutorial(this.props.location.state.data);
            return;
        }

        this.cure = this.props.location.state.data.read;
        this.currentCure = this.cure[this.currentIndex];
        this.currentCure.is_first = 'T';
        this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
        this.currentAudio.addEventListener('ended', this.currentAudioListner);

        this.setState({
            totalNum: this.cure.length,
            cureText: this.currentCure.cure_word,
            currentIndex: this.currentIndex + 1,
        });

        setTimeout(() => {
            this.playSound();
        }, 12000);
    }

    voweltutorial = (data) => {
        this.isTutorial = true;
        this.setState({
            cureText: data.sample_ques.cure_word,
        });

        this.currentCure = data.sample_ques;
        this.tutorialAudio = new Audio(soundURL + this.currentCure.cure_path);
        this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
        this.currentAudio.addEventListener('ended', this.currentAudioListner);
        this.voice = [
            new Audio(soundURL + data.tut_voice[0].voc_path),
            new Audio(soundURL + data.tut_voice[1].voc_path),
            new Audio(soundURL + data.tut_voice[2].voc_path),
            new Audio(soundURL + data.tut_voice[3].voc_path),
            new Audio(soundURL + data.tut_voice[4].voc_path),
            new Audio(soundURL + data.tut_voice[5].voc_path),
        ];

        this.voice[0].addEventListener('ended', () => {
            setTimeout(() => {
                this.tutorialAudio.play();
            }, 1000);
        });

        this.tutorialAudio.addEventListener('ended', () => {
            setTimeout(() => {
                this.voice[1].play();
            }, 1000);
        });

        this.voice[1].addEventListener('ended', () => {
            setTimeout(() => {
                this.recording_start_sound.play();
                this.gameState = RECORDING;
                this.setState({
                    isRecording: true,
                    RecordingCircle: true,
                })
                this.setRecording = setInterval(() => {
                    this.setState({
                        RecordingCircle: !this.state.RecordingCircle,
                    });
                }, 500);
                setTimeout(() => {
                    window.BRIDGE.recordAudio(this.props.user.student.gender, this.currentCure.cure_word);
                }, 200);
            }, 800);
        });

        for (let i = 2; i < 5; i++) {
            this.voice[i].addEventListener('ended', () => {
                setTimeout(() => {
                    this.setState({
                        TTobaki: TTobak.ttobak3_1,
                    })
                    setTimeout(() => {
                        if (!!this.currentAudio) {
                            this.playSound();
                            this.setState({
                                TTobaki: TTobak.ttobak3_2,
                                isPlaying: true,
                            })
                        }
                    }, 1000);
                }, 800);
            })
        }

        this.voice[5].addEventListener('ended', async () => {
            const { data } = await T_tutorial.answer(
                this.props.user.student.s_id,
                this.idx_text,
                this.currentCure.com_id);
            console.log(data);
            setTimeout(() => {
                if (this.learning_type !== 'daily') this.newRequest();
                else this.daily();
            }, 1000);
            if (!!this.currentAudio) {
                this.currentAudio.remove();
                this.currentAudio = null;
            }
        })

        setTimeout(() => {
            this.voice[0].play();
        }, 1000);
    }

    consotutorial = (data) => {
        this.isTutorial = false;
        this.setState({
            cureText: data.sample_ques.cure_word,
        });

        this.currentCure = data.sample_ques;
        this.tutorialAudio = new Audio(soundURL + this.currentCure.cure_path);
        this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
        this.currentAudio.addEventListener('ended', this.currentAudioListner);
        this.voice = [
            null,
            new Audio(soundURL + data.tut_voice[0].voc_path),
            new Audio(soundURL + data.tut_voice[1].voc_path),
            new Audio(soundURL + data.tut_voice[2].voc_path),
            new Audio(soundURL + data.tut_voice[3].voc_path),
            new Audio(soundURL + data.tut_voice[4].voc_path),
        ];

        this.voice[1].addEventListener('ended', () => {
            setTimeout(() => {
                this.recording_start_sound.play();
                this.gameState = RECORDING;
                this.setState({
                    isRecording: true,
                    RecordingCircle: true,
                })
                this.setRecording = setInterval(() => {
                    this.setState({
                        RecordingCircle: !this.state.RecordingCircle,
                    });
                }, 500);
                setTimeout(() => {
                    window.BRIDGE.recordAudio(this.props.user.student.gender, this.currentCure.cure_word);
                }, 200);
            }, 800);
        });

        for (let i = 2; i < 5; i++) {
            this.voice[i].addEventListener('ended', () => {
                setTimeout(() => {
                    this.setState({
                        TTobaki: TTobak.ttobak3_1,
                    })
                    setTimeout(() => {
                        if (!!this.currentAudio) {
                            this.playSound();
                            this.setState({
                                TTobaki: TTobak.ttobak3_2,
                                isPlaying: true,
                            })
                        }
                    }, 1000);
                }, 800);
            })
        }

        this.voice[5].addEventListener('ended', async () => {
            const { data } = await T_tutorial.answer(
                this.props.user.student.s_id,
                this.idx_text,
                this.currentCure.com_id);
            console.log(data);
            setTimeout(() => {
                if (this.learning_type !== 'daily') this.newRequest();
                else this.daily();
            }, 1000);
            if (!!this.currentAudio) {
                this.currentAudio.remove();
                this.currentAudio = null;
            }
        })

        setTimeout(() => {
            this.voice[1].play();
        }, 1000);
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
        if (this.gameState !== PAUSED) this.gameState = PLAYING;
        this.setState({
            isRecording: false,
            RecordingCircle: false,
        });
    }

    andriodListener = async () => {
        if (this.gameState === PAUSED) return;
        this.setState({
            TTobaki: TTobak.ttobak2_1,
        });

        if (this.audioResult.status === 'Success') {
            if (this.isTutorial) {
                if (this.audioResult.score < 85 && ++this.failedNum < failedMax) {
                    this.voice[2].play();
                } else if (this.audioResult.rhythm_score < 0 && ++this.failedNum < failedMax) {
                    this.voice[3].play();
                } else if (this.audioResult.speed_score < -5 && ++this.failedNum < failedMax) {
                    this.voice[4].play();
                } else {
                    this.failedNum = 0;
                    this.voice[5].play();
                    this.isTutorial = false;
                }
                return;
            }

            const { user } = this.props;
            const s_id = user.student.s_id;
            const { data } = await T1_Api.answer(
                s_id,
                this.audioResult.score,
                this.audioResult.phone_score,
                this.audioResult.speed_score,
                this.audioResult.rhythm_score,
                this.learning_type === 'review' ? 'T' : 'F',
                this.currentCure.cure_id,
                this.idx_text,
                this.learning_type === 'daily' ? 'T' : 'F',
                this.currentCure.is_first
            );
            console.log(data);

            if (data.code === 1) {
                if (!data.is_pass && ++this.failedNum < failedMax) {
                    this.currentCure.is_first = 'F';
                    if (!!this.retryAudio) {
                        this.retryAudio.remove();
                        this.retryAudio = null;
                    }
                    this.retryAudio = new Audio(soundURL + data.class_voice[0].voc_path);
                    this.retryAudio.addEventListener('ended', () => {
                        this.setState({
                            TTobaki: TTobak.ttobak3_1,
                        })
                        setTimeout(() => {
                            this.playSound();
                        }, 1000);
                    });

                    setTimeout(() => {
                        if (!!this.retryAudio) {
                            this.retryAudio.play();
                            this.setState({
                                TTobaki: TTobak.ttobak3_2,
                            });
                        }
                    }, 1000);
                    return;
                }

                if (!!this.good_script) {
                    this.good_script.remove();
                    this.good_script = null;
                }
                this.failedNum = 0;
                if (data.is_pass) this.good_script = new Audio(soundURL + data.class_voice.voc_path);
                else this.good_script = new Audio(soundURL + data.class_voice[1].voc_path);
                this.good_script.addEventListener('ended', () => this.nextStep());
                setTimeout(() => {
                    if (!!this.good_script) this.good_script.play();
                    this.setState({
                        TTobaki: TTobak.ttobak2_2,
                    });
                }, 500);

            } else if (data.code === 2) {
                this.gameDone();
            }
            else console.log(data.message);

        } else {
            console.log(this.audioResult.message);
        }
    }

    nextStep = () => {
        if (this.currentIndex < this.cure.length - 1) {
            this.currentIndex++;
        } else {
            this.gameDone();
            return;
        }
        this.currentCure = this.cure[this.currentIndex];
        this.currentCure.is_first = 'T';
        if (!!this.currentAudio) {
            this.currentAudio.remove();
            this.currentAudio = null;
        }
        this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
        this.currentAudio.addEventListener('ended', this.currentAudioListner);

        setTimeout(() => {
            this.setState({
                TTobaki: TTobak.ttobak1_1,
                cureText: this.currentCure.cure_word,
                currentIndex: this.currentIndex + 1
            });
        }, 2000);

        setTimeout(() => {
            this.playSound();
        }, 4000);
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.setState({
                TTobaki: TTobak.ttobak3_2,
                isPlaying: true,
            });
            this.currentAudio.play();
            this.gameState = AUDIOPLAYING;
        }
    }

    currentAudioListner = () => {
        this.setState({
            TTobaki: TTobak.ttobak1_1,
            isPlaying: false,
        });
        setTimeout(() => {
            this.recording_start_sound.play();
            this.gameState = RECORDING;
            this.setState({
                isRecording: true,
                RecordingCircle: true,
            })
            this.setRecording = setInterval(() => {
                this.setState({
                    RecordingCircle: !this.state.RecordingCircle,
                });
            }, 500);
            setTimeout(() => {
                window.BRIDGE.recordAudio(this.props.user.student.gender, this.currentCure.cure_word);
            }, 200);
        }, 800);
    };

    gameDone = () => {
        console.log('game doen!');
        if (this.learning_type !== 'daily') {
            this.setState({
                showDonePopup: true,
            })
        } else {
            this.setState({
                showDailyPopup: true,
            })
        }
    }

    imagesPreloading = (picture) => {
        let timeoutPreloading = setTimeout(() => {
            this.props.history.push('/main/main');
        }, 10000);

        for (let i in picture) {
            for (let prop in picture[i]) {
                let img = new Image();
                img.src = picture[i][prop];
                img.onload = () => {
                    this.setState({
                        percent: (++this.numOfLoadedImage / this.totalImages) * 100
                    })
                    if (this.numOfLoadedImage === this.totalImages) {
                        this.setState({
                            isImageLoaded: true,
                            TTobaki: TTobak.ttobak1_1,
                        });
                        clearTimeout(timeoutPreloading);
                        if (this.learning_type !== 'daily') this.newRequest();
                        else this.daily();
                    }
                };
            }
        }
    }

    onContinueButtonHandle = () => {
        this.setState({
            showPopup: false,
        });

        setTimeout(() => {
            if (this.continuePlay === this.currentAudio) {
                this.playSound();
            }
            else {
                this.gameState = AUDIOPLAYING;
                this.continuePlay.play();
            }
            this.setState({
                TTobaki: TTobak.ttobak3_2,
            });
        }, 1000);
    }

    onRestartButtonHandle = () => {
        this.setState({
            showDonePopup: false,
        })
        this.newRequest();
        setTimeout(() => this.playSound(), 2000);
    }

    onPauseButtonHandle = () => {
        if (this.gameState === RECORDING) {
            window.BRIDGE.requestStopRecording();
            this.continuePlay = this.currentAudio;
        }
        this.gameState = PAUSED;
        this.setState({
            showPopup: true,
        });

        let audioArr = [this.currentAudio, this.voice, this.retryAudio, this.good_script];
        console.log(audioArr)

        for (let i = 0; i < audioArr.length; i++) {
            if (!!audioArr[i] && !audioArr[i].paused && audioArr[i].duration > 0) {
                audioArr[i].pause();
                this.continuePlay = audioArr[i];
                break;
            }
        }
    }

    onCompleteButtonHandle = () => {
        if (this.state.isRecording) {
            window.BRIDGE.requestStopRecording();
        }
    }

    render() {
        const { cureText, TTobaki, RecordingCircle, isImageLoaded, isPlaying,
            showPopup, showDonePopup, showDailyPopup, percent,
            currentIndex, totalNum } = this.state;

        if (this.state.err) {
            return <div>error</div>;
        }

        if (isImageLoaded) {
            return (<WordPresenter
                Background={T1.t1_background} TextBox={T1.t1_textbox} bt_complete={T1.bt_complete}
                TTobak={TTobaki} isPlaying={isPlaying}
                text={cureText} RecordingCircle={RecordingCircle}
                onCompleteButtonHandle={this.onCompleteButtonHandle}
                onContinueButtonHandle={this.onContinueButtonHandle}
                onRestartButtonHandle={this.onRestartButtonHandle}
                onPauseButtonHandle={this.onPauseButtonHandle}
                showPopup={showPopup}
                showDailyPopup={showDailyPopup}
                showDonePopup={showDonePopup}
                currentIndex={currentIndex}
                totalNum={totalNum}
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

export default connect(mapStateToProps)(withRouter(Word));