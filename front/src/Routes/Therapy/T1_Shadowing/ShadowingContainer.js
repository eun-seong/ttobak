import React from 'react';
import ShadowingPresenter from './ShadowingPresenter';
import recording_end from 'recording_end.mp3';
import recording_start from 'recording_start.mp3';

import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { T1, TTobak } from 'images';
import { T1_Api, soundURL } from 'api';
import LoadingComp from 'Components/LoadingComp';

class Shadowing extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match, location }) {
        super();
        this.idx_text = match.params.type;
        this.learning_type = match.params.learning_type;
        this.recording_start_sound = new Audio(recording_start);
        this.recording_end_sound = new Audio(recording_end);
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.audioResult = null;
        this.picture = { T1, TTobak };
        this.totalImages = Object.keys(this.picture.T1).length + Object.keys(this.picture.TTobak).length;
        this.numOfLoadedImage = 0;

        this.state = {
            cureText: null,
            isRecording: false,
            TTobaki: TTobak.ttobak1_1,
            isImageLoaded: false,
            showPopup: false,
            showDonePopup: false,
            showDailyPopup: false,
            percent: 0,
            currentIndex: 0,
            totalNum: 0,
        }

        if (this.learning_type === 'daily') {
            console.log(location.state.data.read);
            this.cure = location.state.data.read;
            this.state = {
                ...this.state,
                totalNum: this.cure.length,
            }
        }
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

        if (this.learning_type !== 'daily') this.newRequest();
        else {
            this.currentCure = this.cure[this.currentIndex];
            this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
            if (this.idx_text === 'vowelword' || this.idx_text === 'consoword')
                this.currentCure.cure_text = this.currentCure.cure_word;
            this.state = {
                cureText: this.currentCure.cure_text
            };
        }
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
        console.log('new request');
        const { user } = this.props;
        const s_id = user.student.s_id;

        try {
            const { data } = await T1_Api.ask(s_id, this.idx_text);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.currentIndex = 0;
                this.cure = data.cure;
                this.currentCure = data.cure[this.currentIndex];
                this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
                if (this.idx_text === 'vowelword' || this.idx_text === 'consoword')
                    this.currentCure.cure_text = this.currentCure.cure_word;
                this.setState({
                    TTobaki: TTobak.ttobak1_1,
                    cureText: this.currentCure.cure_text,
                    totalNum: this.cure.length,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    andriodListener = async () => {
        this.setState({
            TTobaki: TTobak.ttobak2_1,
        });

        try {
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
                    this.idx_text
                );
                console.log(data);

                if (data.code === 1) {
                    if (this.currentIndex < this.cure.length - 1) {
                        this.currentIndex++;
                    } else {
                        this.gameDone();
                        return;
                    }
                    this.currentCure = this.cure[this.currentIndex];
                    this.currentAudio = null;
                    this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
                    if (this.idx_text === 'vowelword' || this.idx_text === 'consoword')
                        this.currentCure.cure_text = this.currentCure.cure_word;

                    setTimeout(() => {
                        this.setState({
                            TTobaki: TTobak.ttobak1_1,
                            cureText: this.currentCure.cure_text,
                            currentIndex: this.currentIndex + 1
                        });
                    }, 3000);

                    setTimeout(() => {
                        this.playSound();
                    }, 5500);

                } else if (data.code === 2) {
                    this.gameDone();
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
                    window.BRIDGE.recordAudio('m', this.currentCure.cure_text);
                }, 1000);
            });
        }
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
                        })
                        setTimeout(() => this.playSound(), 1000);
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
        setTimeout(() => this.playSound(), 2000);
    }

    onPauseButtonHandle = () => {
        this.setState({
            showPopup: true,
        })
    }

    render() {
        const { type, cureText, TTobaki, isRecording, isImageLoaded,
            showPopup, showDonePopup, showDailyPopup, percent,
            currentIndex, totalNum } = this.state;

        if (isImageLoaded) {
            return (<ShadowingPresenter
                Background={T1.t1_background}
                TextBox={T1.t1_textbox}
                TTobak={TTobaki}
                type={type}
                text={cureText}
                isRecording={isRecording}
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

export default connect(mapStateToProps)(withRouter(Shadowing));