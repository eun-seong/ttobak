import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingComp from 'Components/LoadingComp';
import AttentionPresenter from './AttentionPresenter';
import recording_end from 'recording_end.mp3';
import recording_start from 'recording_start.mp3';

import { D3, TTobak } from 'images';
import { D3_Api, soundURL } from 'api';

class Attention extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor() {
        super();
        this.recording_start_sound = new Audio(recording_start);
        this.recording_end_sound = new Audio(recording_end);
        this.numOfLoadedImage = 0;
        this.picture = { D3, TTobak };
        this.totalImages = Object.keys(D3).length + Object.keys(TTobak).length;
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.audioResult = null;

        this.state = {
            gameState: false,
            s_id: 4,
            isImageLoaded: false,
            percent: 0,
            showPopup: false,
            showNextPopup: false,
            isRecording: false,
            TTobak: TTobak.ttobak1_1,
            currentIndex: 1,
            totalNum: 0,
        };
    }

    async componentDidMount() {
        const { user } = this.props;

        if (!user.user.u_id) {
            this.props.history.push('/root/signin');
            return;
        }

        if (!user.student.s_id) {
            this.props.history.push('/root/selectstd');
            return;
        }

        this.newRequest();
        this.imagesPreloading(this.picture);

        window.addEventListener("android", this.androidResponse);
    }

    componentWillUnmount() {
        if (!!this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        window.removeEventListener("android", this.androidResponse)
    }

    androidResponse = async (e) => {
        console.log(e.detail);
        this.setState({
            isRecording: false,
        })
        this.recording_end_sound.play();
        this.audioResult = e.detail;
        this.andriodListener();
    }

    newRequest = async () => {
        const { user } = this.props;

        const data = await D3_Api.ask(1, user.student.s_id);
        console.log(data);

        if (data.code === 1) {
            this.cure = data.focus;
            this.currentIndex = 0;
            this.currentCure = this.cure[this.currentIndex];
            this.currentAudio = new Audio(soundURL + this.currentCure.ques_path1);
            this.setState({
                totalNum: this.cure.length,
            })
        }
    }

    andriodListener = async () => {
        this.setState({
            TTobaki: TTobak.ttobak2_1,
        });

        try {
            if (this.audioResult.status === 'Success') {
                const { s_id } = this.state;
                console.log(
                    s_id,
                    this.currentCure.ques_id,
                    this.audioResult.score,
                    this.audioResult.phone_score,
                    this.audioResult.speed_score,
                    this.audioResult.rhythm_score)
                const { data } = await D3_Api.answer(
                    s_id,
                    this.currentCure.ques_id,
                    this.audioResult.score,
                    this.audioResult.phone_score,
                    this.audioResult.speed_score,
                    this.audioResult.rhythm_score,
                );
                console.log(data);

                if (data.code === 1) {
                    if (data.is_stop) {
                        this.gameDone();
                    } else if (data.to_next_level) {
                        this.newRequest();
                        setTimeout(() => {
                            this.playSound();
                        }, 3000);
                    } else {
                        if (this.currentIndex < this.cure.length - 1) {
                            this.currentIndex++;
                        } else {
                            this.gameDone();
                            return;
                        }
                        this.currentCure = this.cure[this.currentIndex];
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
            this.setState({
                TTobaki: TTobak.ttobak3_2,
            });
            this.currentAudio.play();
            this.currentAudio.addEventListener('ended', () => {
                this.setState({
                    TTobaki: TTobak.ttobak1_1,
                });
                setTimeout(() => {
                    console.log('이제 따라 읽어볼까요?');
                    this.recording_start_sound.play();
                    this.setState({
                        isRecording: true,
                    });
                    window.BRIDGE.recordAudio('m', this.currentCure.ques_char);
                }, 1000);
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
                        setTimeout(() => this.playSound(), 2000);
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
        this.props.history.replace('/diagnose/result');
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
        const { isImageLoaded, showPopup, showNextPopup, percent, TTobak, isRecording } = this.state;

        if (isImageLoaded) {
            return (<AttentionPresenter
                Background={D3.d3_background}
                TTobak={TTobak}
                isRecording={isRecording}
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

export default connect(mapStateToProps)(withRouter(Attention));