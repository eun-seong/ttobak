import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/browser';

import SelfPresenter from './SelfPresenter';
import { T1, TTobak, SoundEffect } from 'images';
import { T1_Api, soundURL, T_tutorial } from 'api';
import LoadingComp from 'Components/LoadingComp';

const idx_txt = 'selfpoem';
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
    RecordingCircle: false,
    err: false,
    errorInfo: false,
};

class Selfpoem extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match }) {
        super();
        this.learning_type = match.params.learning_type;
        this.recording_start_sound = new Audio(SoundEffect.recording_start);
        this.recording_end_sound = new Audio(SoundEffect.recording_end);
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.audioResult = null;
        this.retryAudio = null;
        this.picture = { T1, TTobak };
        this.totalImages = Object.keys(this.picture.T1).length + Object.keys(this.picture.TTobak).length;
        this.numOfLoadedImage = 0;
        this.state = inistState;
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
        if (!!this.retryAudio) {
            this.retryAudio.pause();
            this.retryAudio = null;
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

        const { data } = await T1_Api.ask(s_id, idx_txt);
        console.log(data);


        if (data.code === 'specified' || data.code === 1) {
            this.currentIndex = 0;
            this.cure = data.cure;
            this.currentCure = data.cure[this.currentIndex];
            this.currentCure.is_first = 'T';
            if (idx_txt === 'vowelword' || idx_txt === 'consoword')
                this.currentCure.cure_text = this.currentCure.cure_word;
            this.setState({
                TTobaki: TTobak.ttobak1_1,
                cureText: this.currentCure.cure_text,
                totalNum: this.cure.length,
            });
        }
        setTimeout(() => this.playRecording(), 2000);
        // this.intro(data.read_voice);
    }

    daily = () => {
        console.log(this.props.location.state.data);

        this.cure = this.props.location.state.data.read;
        this.currentCure = this.cure[this.currentIndex];
        this.currentCure.is_first = 'T';

        if (idx_txt === 'vowelword' || idx_txt === 'consoword')
            this.currentCure.cure_text = this.currentCure.cure_word;

        this.setState({
            totalNum: this.cure.length,
            cureText: this.currentCure.cure_text
        });
        this.intro(this.props.location.state.data.read_voice);
    }

    intro = (data) => {
        this.reac_voice = null;
        this.read_voice = [
            new Audio(soundURL + data[0].voc_path),
        ];

        this.read_voice[0].addEventListener('ended', () => {
            setTimeout(() => this.playRecording(), 2000);
        });

        if (!!this.read_voice[0]) this.read_voice[0].play();
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

    andriodListener = async () => {
        this.setState({
            TTobaki: TTobak.ttobak2_1,
        });

        if (this.audioResult.status === 'Success') {
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
                idx_txt,
                this.learning_type === 'daily' ? 'T' : 'F',
                this.currentCure.is_first
            );
            console.log(data);

            if (data.code === 1) {
                if (data.retry) {
                    this.currentCure.is_first = 'F';
                    this.retryAudio = new Audio(soundURL + data.class_voice.voc_path);
                    this.retryAudio.addEventListener('ended', () => {
                        this.setState({
                            TTobaki: TTobak.ttobak3_1,
                        })
                        setTimeout(() => {
                            this.playRecording();
                        }, 2000);
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
                } else {
                    this.good_script = new Audio(soundURL + data.class_voice.voc_path);
                    this.good_script.addEventListener('ended', () => this.nextStep());
                    setTimeout(() => {
                        this.good_script.play();
                        this.setState({
                            TTobaki: TTobak.ttobak2_2,
                        });
                    }, 1000);
                }

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

        setTimeout(() => {
            this.setState({
                TTobaki: TTobak.ttobak1_1,
                cureText: this.currentCure.cure_text,
                currentIndex: this.currentIndex + 1
            });
        }, 2000);

        setTimeout(() => {
            this.playRecording();
        }, 4000);
    }

    playRecording = () => {
        this.setState({
            TTobaki: TTobak.ttobak1_1,
        });
        setTimeout(() => {
            this.recording_start_sound.play();
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
                window.BRIDGE.recordAudio(this.props.user.student.gender, this.currentCure.cure_text);
            }, 200);
        }, 800);
    }

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
            this.props.history.replace('/main/main');
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
        })
    }

    onRestartButtonHandle = () => {
        this.setState({
            showDonePopup: false,
        })
        this.newRequest();
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
        const { cureText, TTobaki, RecordingCircle, isImageLoaded,
            showPopup, showDonePopup, showDailyPopup, percent,
            currentIndex, totalNum } = this.state;

        if (this.state.err) {
            return <div>error</div>;
        }

        if (isImageLoaded) {
            return (<SelfPresenter
                Background={T1.t1_background} TextBox={T1.t1_textbox} bt_complete={T1.bt_complete}
                TTobak={TTobaki}
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

export default connect(mapStateToProps)(withRouter(Selfpoem));