import React from 'react';
import { withRouter } from 'react-router-dom';
import SoundPresenter from './SoundPresenter';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { T5, TTobak, Characters } from 'images';
import { T_Api2, soundURL } from 'api';
import LoadingComp from 'Components/LoadingComp';

class Sound extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match, location }) {
        super();
        this.learning_type = match.params.learning_type;
        this.type = match.params.type + 'sound';
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.numOfLoadedImage = 0;
        this.picture = { T5, TTobak, Characters };
        this.totalImages = Object.keys(T5).length + Object.keys(TTobak).length + Object.keys(Characters).length;

        this.state = {
            TTobaki: TTobak.ttobak1_1,                  // 또박이 이미지 상태
            gameState: false,
            CardTextList: null,
            isImageLoaded: false,
            showPopup: false,
            showDonePopup: false,
            showDailyPopup: false,
            percent: 0,
            currentIndex: 0,
            totalNum: 0,
        }

        if (this.learning_type === 'daily') {
            console.log(location.state.data.cure);
            this.cure = location.state.data.cure;
            this.currentCure = this.cure[this.currentIndex];
            this.setAudio();
            this.state = {
                ...this.state,
                totalNum: this.cure.length,
            }
        }
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

        if (this.learning_type !== 'daily') this.newRequest();
        else {
            this.setState({
                CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
            })
        }
        this.imagesPreloading(this.picture);
    }

    componentWillUnmount() {
        if (!!this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
    }

    newRequest = async () => {
        console.log('new request');

        try {
            const { user } = this.props;
            const s_id = user.student.s_id;
            const { data } = await T_Api2.ask(s_id, this.idx_text);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.currentIndex = 0;
                this.cure = data.cure;
                this.currentCure = data.cure[this.currentIndex];
                this.setAudio();

                this.setState({
                    CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
                    totalNum: this.cure.length,
                })
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    setAudio = () => {
        if (this.type === 'consosound') {
            this.currentCure.answer = Math.floor(Math.random() * 2) + 1;
            this.currentAudio = new Audio(soundURL + this.currentCure.cure_path);
            if (this.currentCure.answer === 2) {
                var tmp = this.currentCure.cure_word;
                this.currentCure.cure_word = this.currentCure.cure_word2;
                this.currentCure.cure_word2 = tmp;
            }
        } else {
            this.currentAudio = this.currentCure.answer === 1
                ? new Audio(soundURL + this.currentCure.cure_path) :
                new Audio(soundURL + this.currentCure.cure_path2);
        }

        this.currentAudio.addEventListener('ended', () => {
            this.setState({
                gameState: true,
                TTobaki: TTobak.ttobak1_1
            })
        })
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.setState({
                gameState: false,
                TTobaki: TTobak.ttobak1_2
            });
            this.currentAudio.play();
        }
    }

    onTTobakiTouchHandle = () => {
        const { gameState } = this.state;
        if (gameState) this.playSound();
    }

    onCardTouchHandle = async (index) => {
        const { gameState } = this.state;
        if (!gameState) return;

        this.setState({
            gameState: false,
            TTobaki: TTobak.ttobak2_2
        });

        try {
            const { user } = this.props;
            const s_id = user.student.s_id;
            const { CardTextList } = this.state;
            console.log(this.currentCure.answer, this.currentCure.cure_word, this.currentCure.cure_word2)
            const { data } = await T_Api2.answer(
                s_id,
                this.currentCure.answer === 1 ? this.currentCure.cure_word : this.currentCure.cure_word2,
                CardTextList[index],
                this.currentCure.cure_id,
                this.learning_type === 'review' ? 'T' : 'F',
                this.type
            );
            console.log(data);

            if (data.code === 1) {
                if (this.currentIndex < this.cure.length - 1) this.currentIndex++;
                else {
                    setTimeout(() => {
                        this.gameDone();
                    }, 1000);
                    return;
                }
                this.currentCure = this.cure[this.currentIndex];
                this.setAudio();

                setTimeout(() => {
                    this.setState({
                        CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
                        TTobaki: TTobak.ttobak1_1,
                        currentIndex: this.currentIndex + 1
                    });
                }, 2000);

                setTimeout(() => {
                    this.playSound();
                }, 3000);
            } else if (data.code === 2) {
                this.setState({
                    showPopup: true,
                })
            } else {
                this.props.history.replace('/main/main');
            }
        } catch (e) {
            console.log(e);
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
                    });

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
        const { TTobaki, CardTextList, isImageLoaded, showPopup, showDonePopup, showDailyPopup, percent, gameState,
            currentIndex, totalNum } = this.state;
        if (isImageLoaded) {
            return (<SoundPresenter
                Background={T5.t5_background}
                TTobak={TTobaki}
                TTobakiTouch={this.onTTobakiTouchHandle}
                Card={[Characters.card1, Characters.card2]}
                CardTextList={CardTextList || ['아', '에']}
                onCardTouchHandle={this.onCardTouchHandle}
                onContinueButtonHandle={this.onContinueButtonHandle}
                onRestartButtonHandle={this.onRestartButtonHandle}
                onPauseButtonHandle={this.onPauseButtonHandle}
                showPopup={showPopup}
                showDailyPopup={showDailyPopup}
                showDonePopup={showDonePopup}
                gameState={gameState}
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

export default connect(mapStateToProps)(withRouter(Sound));