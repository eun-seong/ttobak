import React from 'react';
import SelfPresenter from './SelfPresenter';

import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { T1, TTobak } from 'images';
import { T1_Api, soundURL } from 'api';

class Self extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match, location }) {
        super();
        this.idx_text = match.params.type;
        this.learning_type = match.params.learning_type;
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.audioResult = null;

        this.state = {
            cureText: null,
            isRecording: false,
            TTobaki: TTobak.ttobak1_1,
        }

        if (this.learning_type === 'daily') this.setState({
            data: location.state.data,
        })
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
        setTimeout(() => window.BRIDGE.recordAudio(this.props.user.student.gender, this.currentCure.cure_text), 1000);

        window.addEventListener("android", async (e) => {
            console.log(e.detail);
            this.setState({
                isRecording: false,
            })
            this.audioResult = e.detail;
            this.audioListener();
        });
    }

    componentWillUnmount() {
        if (!!this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
    }

    newRequest = async () => {
        console.log('new request');
        const { user } = this.props;
        const s_id = user.student.s_id;

        try {
            const { data } = await T1_Api.ask(s_id, this.idx_text);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.cure = data.cure;
                this.currentCure = data.cure[this.currentIndex];
                this.setState({
                    cureText: this.currentCure.cure_text
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    audioListener = async () => {
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
                            cureText: this.currentCure.cure_text
                        });
                    }, 2000);

                    setTimeout(() => {
                        this.playSound();
                    }, 3500);

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
                console.log('이제 따라 읽어볼까요?');
                this.setState({
                    TTobaki: TTobak.ttobak1_1,
                    isRecording: true,
                })
                window.BRIDGE.recordAudio(this.props.user.student.gender, this.currentCure.cure_text);
            });
        }
    }

    gameDone = () => {
        console.log('done!!');
    }

    render() {
        const { type, cureText, TTobaki, isRecording } = this.state;

        return (<SelfPresenter
            Background={T1.t1_background}
            TTobak={TTobaki}
            TextBox={T1.t1_textbox}
            type={type}
            text={cureText}
            isRecording={isRecording}
        />);
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(Self));