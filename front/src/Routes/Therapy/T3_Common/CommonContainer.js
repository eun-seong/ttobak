import React from 'react';
import { withRouter } from 'react-router-dom';
import { T3, TTobak } from 'images';
import CommonPresenter from './CommonPresenter';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingComp from 'Components/LoadingComp';
import { T_Api2, soundURL } from 'api';

const idx_text = 'common';

class Common extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match, location }) {
        super();
        this.learning_type = match.params.learning_type;
        this.currentAudio = null;
        this.cure = null;
        this.currentIndex = 0;
        this.currentCure = null;
        this.numOfLoadedImage = 0;
        this.picture = { T3, TTobak };
        this.totalImages = Object.keys(T3).length + Object.keys(TTobak).length;

        this.state = {
            is_review: match.params.is_review,
            TTobaki: TTobak.ttobak1_1,
            gameState: false,
            boxTextList: null,
            isAnimate: [false, false, false, false],
            isImageLoaded: false,
            showPopup: false,
        };

        if (this.learning_type === 'daily') {
            console.log(location.state.data.cure);
            this.cure = location.state.data.cure;
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
            this.setCurrent(0);
        }
        this.imagesPreloading(this.picture);
    }

    componentWillUnmount() {
        for (var i = 0; i < 7; i++) {
            this.currentAudio[i].pause();
            this.currentAudio[i] = null;
        }
    }

    newRequest = async () => {
        console.log('new request');
        const { user } = this.props;
        const s_id = user.student.s_id;

        try {
            const { data } = await T_Api2.ask(s_id, idx_text);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.cure = data.cure;
                this.setCurrent(0);
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    setCurrent = (timeout) => {
        this.currentCure = this.cure[this.currentIndex];
        this.currentAudio = [
            new Audio(soundURL + this.currentCure.com_e1path),
            new Audio(soundURL + this.currentCure.com_e2path),
            new Audio(soundURL + this.currentCure.com_e3path),
            new Audio(soundURL + this.currentCure.com_e4path),
            new Audio(soundURL + this.currentCure.com_w1path),
            new Audio(soundURL + this.currentCure.com_w2path),
            new Audio(soundURL + this.currentCure.com_w3path),
        ];

        this.setListener();
        setTimeout(() => {
            this.setState({
                boxTextList: [
                    this.cure[this.currentIndex].com_e1,
                    this.cure[this.currentIndex].com_e2,
                    this.cure[this.currentIndex].com_e3,
                    this.cure[this.currentIndex].com_e4],
                TTobaki: TTobak.ttobak1_1,
            })
        }, timeout);
    }

    setListener = () => {
        this.currentAudio[0].addEventListener('ended', () => {
            this.listenerFunc(0, 500);
        });
        this.currentAudio[1].addEventListener('ended', () => {
            this.listenerFunc(1, 500);
        });
        this.currentAudio[2].addEventListener('ended', () => {
            this.listenerFunc(2, 500);
        });
        this.currentAudio[3].addEventListener('ended', () => {
            this.listenerFunc(3, 1500);
        });
        this.currentAudio[4].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1
            })
            setTimeout(() => {
                if (!!this.currentAudio[5]) {
                    this.currentAudio[5].play();
                    this.setState({
                        TTobaki: TTobak.ttobak3_2
                    })
                }
            }, 1000);
        });
        this.currentAudio[5].addEventListener('ended', () => {
            this.setState({
                TTobaki: TTobak.ttobak1_1
            })
            setTimeout(() => {
                if (!!this.currentAudio[6]) {
                    this.currentAudio[6].play();
                    this.setState({
                        TTobaki: TTobak.ttobak3_2
                    })
                }
            }, 1000);
        });
        this.currentAudio[6].addEventListener('ended', () => {
            this.setState({
                gameState: true,
                TTobaki: TTobak.ttobak1_1
            })
        });
    }

    listenerFunc = (index, time) => {
        this.setState({
            TTobaki: TTobak.ttobak1_1
        });
        setTimeout(() => {
            if (!!this.currentAudio[index + 1]) {
                this.currentAudio[index + 1].play();
                this.setState({
                    TTobaki: TTobak.ttobak1_2
                })
            }
        }, time);
    }

    playSound = () => {
        this.setState({
            gameState: true,
            TTobaki: TTobak.ttobak1_2
        });

        if (!!this.currentAudio[0]) {
            this.currentAudio[0].play();
        }
    }

    onTTobakiTouchHandle = () => {
        const { gameState } = this.state;
        if (gameState) this.playSound();
    }

    onBoxTouchHandle = async (index) => {
        const { gameState } = this.state;
        if (!gameState) return;
        this.setState({
            TTobaki: TTobak.ttobak2_2
        })

        try {
            const { user } = this.props;
            const s_id = user.student.s_id;
            const { boxTextList, is_review } = this.state;
            const { data } = await T_Api2.answer(
                s_id,
                this.cure[this.currentIndex].com_ans,
                boxTextList[index],
                this.cure[this.currentIndex].com_id,
                is_review,
                idx_text
            );
            console.log(data);

            if (data.code === 1) {
                if (this.currentIndex < this.cure.length - 1) {
                    this.currentIndex++;
                } else {
                    this.gameDone();
                    return;
                }

                this.setCurrent(2000);

                setTimeout(() => {
                    this.playSound();
                }, 4000);

            }
        } catch (e) {
            console.log(e);
        }
    }

    gameDone = () => {
        console.log('done!!');
    }

    imagesPreloading = (picture) => {
        for (let i in picture) {
            for (let prop in picture[i]) {
                let img = new Image();
                img.src = picture[i][prop];
                ++this.numOfLoadedImage;

                img.onload = () => {
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

    onPauseButtonHandle = () => {
        this.setState({
            showPopup: true,
        })
    }

    render() {
        const { boxTextList, isAnimate, TTobaki, isImageLoaded, showPopup } = this.state;

        if (isImageLoaded) {
            return (<CommonPresenter
                Background={T3.t3_background}
                TTobak={TTobaki}
                onTTobakiTouchHandle={this.onTTobakiTouchHandle}
                boxTextList={boxTextList || ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ']}
                onBoxTouchHandle={this.onBoxTouchHandle}
                BoxImg={T3.t3_textbox}
                isAnimate={isAnimate}
                showPopup={showPopup}
                onContinueButtonHandle={this.onContinueButtonHandle}
                onPauseButtonHandle={this.onPauseButtonHandle}
            />);
        }
        else {
            return <LoadingComp />
        }
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(Common));