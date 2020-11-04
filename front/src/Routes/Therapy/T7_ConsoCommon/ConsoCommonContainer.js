import React from 'react';
import ConsoCommonPresenter from './ConsoCommonPresenter';

import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingComp from 'Components/LoadingComp';
import { T7, Characters } from 'images';
import { T_Api2, soundURL, T_tutorial } from 'api';

const idx_txt = 'consocommon';
const initState = {
    gameState: false,
    picBox: null,
    CardTextList: null,
    isImageLoaded: false,
    showPopup: false,
    showDonePopup: false,
    showDailyPopup: false,
    percent: 0,
    currentIndex: 1,
    totalNum: 0,
};

class ConsoCommon extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match }) {
        super();
        this.learning_type = match.params.learning_type;
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.numOfLoadedImage = 0;
        this.picture = { T7, Characters };
        this.totalImages = Object.keys(T7).length + Object.keys(Characters).length;

        this.state = initState;
    }

    async componentDidMount() {
        const { user } = this.props;

        if (!user.user.u_id || !user.student.s_id) {
            this.props.history.push('/root/signin');
            return;
        }

        this.imagesPreloading(this.picture);
    }

    componentWillUnmount() {
        if (!!this.voice) {
            for (let i = 0; i < this.voice.length; i++) {
                if (!!this.voice[i]) {
                    this.voice[i].pause();
                    this.voice[i].remove();
                    this.voice[i] = null;
                }
            }
        }
    }

    newRequest = async () => {
        console.log('new request');
        const { user } = this.props;
        const s_id = user.student.s_id;

        const { data } = await T_Api2.ask(s_id, idx_txt);
        console.log(data);

        if (data.code === 'tutorial') {
            this.tutorial(data);
            return;
        }

        if (data.code === 'specified' || data.code === 1) {
            this.currentIndex = 0;
            this.cure = data.cure;
            this.totalImages += this.cure.length;
            this.pictursPreloading(this.cure);
            this.currentCure = this.cure[this.currentIndex];
            this.currentCure.is_first = 'T';
            for (let i in this.cure) {
                this.cure[i].answer = Math.floor(Math.random() * 2);
            }

            this.setState({
                gameState: true,
                picBox: soundURL + this.currentCure.cure_path,
                CardTextList: this.currentCure.answer === 0 ?
                    [this.currentCure.cure_word, this.currentCure.cure_word2] :
                    [this.currentCure.cure_word2, this.currentCure.cure_word],
                totalNum: this.cure.length,
                currentIndex: this.currentIndex + 1,
            })
        }
        else console.log('data message: ' + data.message);
    }

    daily = () => {
        if (this.props.location.state.data.code === 'tutorial') {
            this.tutorial(this.props.location.state.data);
            return;
        }

        console.log(this.props.location.state.data.cure);
        this.cure = this.props.location.state.data.cure;
        this.currentCure = this.cure[this.currentIndex];
        this.currentCure.is_first = 'T';
        this.setState({
            totalNum: this.cure.length,
            currentIndex: this.currentIndex + 1,
            picBox: soundURL + this.currentCure.cure_path,
            CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2]
        });
    }

    tutorial = (data) => {
        this.voice = [
            new Audio(soundURL + data.tut_voice[0].voc_path),
            new Audio(soundURL + data.tut_voice[1].voc_path),
        ];
        this.currentCure = data.sample_ques;
        this.setState({
            picBox: soundURL + this.currentCure.cure_path,
            CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2]
        });

        this.voice[0].addEventListener('ended', () => {
            this.setState({
                gameState: 'tutorial',
            })
        });

        this.voice[1].addEventListener('ended', async () => {
            const { data } = await T_tutorial.answer(this.props.user.student.s_id, idx_txt, this.currentCure.cure_id);
            console.log(data);
            this.setState({
                gameState: false,
            });
            if (this.learning_type === 'daily') this.daily();
            else this.newRequest();

            this.voice = null;
        });

        setTimeout(() => {
            this.voice[0].play();
        }, 2000);
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.setState({
                gameState: false,
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

    onCardTouchHandle = async (id) => {
        const { gameState } = this.state;
        if (gameState === 'tutorial') {
            if (id === 0) {
                this.setState({ gameState: false });
                setTimeout(() => {
                    this.voice[1].play();
                }, 1000);
            }
            return;
        }

        if (gameState === false) return;

        this.setState({
            gameState: false,
        })

        const { user } = this.props;
        const s_id = user.student.s_id;

        const { data } = await T_Api2.answer(
            s_id,
            this.currentCure.cure_word,
            this.state.CardTextList[id],
            this.currentCure.cure_id,
            this.learning_type === 'review' ? 'T' : 'F',
            idx_txt,
            this.learning_type === 'daily' ? 'T' : 'F',
            this.currentCure.is_first
        );
        console.log(data);

        if (data.code === 1) {
            if (data.correct_voice.voc_desc === 'retry') {
                this.currentCure.is_first = 'F';
                this.retry_script = new Audio(soundURL + data.correct_voice.voc_path);
                this.retry_script.addEventListener('ended', () => {
                    this.setState({
                        gameState: true,
                    });
                });

                setTimeout(() => {
                    this.retry_script.play();
                    this.setState({
                        gameState: false,
                    });
                }, 1000);
                return;
            } else {
                this.good_script = new Audio(soundURL + data.correct_voice.voc_path);
                this.good_script.addEventListener('ended', () => this.nextStep());
                setTimeout(() => {
                    this.good_script.play();
                    this.setState({
                        gameState: false,
                    });
                }, 1000);
            }
        }
    }

    nextStep = () => {
        if (this.currentIndex < this.cure.length - 1) this.currentIndex++;
        else {
            this.gameDone();
            return;
        }
        this.currentCure = this.cure[this.currentIndex];
        this.currentCure.is_first = 'T';

        this.setState({
            gameState: true,
            picBox: soundURL + this.currentCure.cure_path,
            CardTextList: this.currentCure.answer === 0 ?
                [this.currentCure.cure_word, this.currentCure.cure_word2] :
                [this.currentCure.cure_word2, this.currentCure.cure_word],
            currentIndex: this.currentIndex + 1
        })
    }

    onTreeTouchEndHandle = () => {
        this.setState({
            isDragging: false,
        })
    }

    pictursPreloading = (picture) => {
        let timeoutPreloading = setTimeout(() => {
            this.props.history.push('/main/main');
        }, 10000);

        try {
            for (let i in picture) {
                let img = new Image();
                img.src = soundURL + picture[i].cure_path;
                img.onload = () => {
                    this.setState({
                        percent: (++this.numOfLoadedImage / this.totalImages) * 100
                    })
                    if (this.numOfLoadedImage === this.totalImages) {
                        this.setState({
                            isImageLoaded: true,
                        })
                        clearTimeout(timeoutPreloading);
                    }
                };
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
                    })
                    if (this.numOfLoadedImage === this.totalImages) {
                        this.setState({
                            isImageLoaded: true,
                        })
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
        setTimeout(() => this.playSound(), 2000);
    }

    onPauseButtonHandle = () => {
        this.setState({
            showPopup: true,
        })
    }

    render() {
        const { CardTextList, picBox, isImageLoaded, showPopup, showDonePopup, showDailyPopup, percent, gameState,
            currentIndex, totalNum } = this.state;

        if (isImageLoaded) {
            return (<ConsoCommonPresenter
                Background={T7.t7_background}
                Card={[Characters.card1, Characters.card2]}
                CardTextList={CardTextList || ['ㄱ', 'ㄴ']}
                picBox={picBox || T7.t7_excpic}
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

export default connect(mapStateToProps)(withRouter(ConsoCommon));