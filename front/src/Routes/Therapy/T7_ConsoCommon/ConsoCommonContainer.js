import React from 'react';
import ConsoCommonPresenter from './ConsoCommonPresenter';

import LoadingComp from 'Components/LoadingComp';
import { T7, Characters } from 'images';
import { T_Api2, soundURL } from 'api';

const idx_text = 'consocommon';

export default class extends React.Component {
    constructor({ match, location }) {
        super();
        this.learning_type = match.params.learning_type;
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.numOfLoadedImage = 0;
        this.picture = { T7, Characters };
        this.totalImages = Object.keys(T7).length + Object.keys(Characters).length;

        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
            gameState: false,
            picBox: null,
            CardTextList: null,
            isImageLoaded: false,
            showPopup: false,
            showDonePopup: false,
            showDailyPopup: false,
            percent: 0,
        };

        if (this.learning_type === 'daily') {
            console.log(location.state.data.cure);
            this.cure = location.state.data.cure;
            this.currentCure = this.cure[this.currentIndex];
        }
    }

    async componentDidMount() {
        if (this.learning_type !== 'daily') this.newRequest();
        else {
            this.setState({
                picBox: soundURL + this.currentCure.cure_path,
                CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2]
            })
        }
        this.imagesPreloading(this.picture);
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id } = this.state;

        try {
            const { data } = await T_Api2.ask(s_id, idx_text);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.currentIndex = 0;
                this.cure = data.cure;
                this.pictursPreloading(this.cure);
                this.currentCure = this.cure[this.currentIndex];
                for (let i in this.cure) {
                    this.cure[i].answer = Math.floor(Math.random() * 2);
                }

                this.setState({
                    gameState: true,
                    picBox: soundURL + this.currentCure.cure_path,
                    CardTextList: this.currentCure.answer === 0 ?
                        [this.currentCure.cure_word, this.currentCure.cure_word2] :
                        [this.currentCure.cure_word2, this.currentCure.cure_word]
                })
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }


    playSound = () => {
        if (!!this.currentAudio) {
            this.setState({
                gameState: false,
            });
            // this.currentAudio.play();
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
        if (!this.state.gameState) return;
        this.setState({
            gameState: false,
        })

        try {
            const { s_id } = this.state;
            const { data } = await T_Api2.answer(
                s_id,
                this.currentCure.cure_word,
                this.state.CardTextList[id],
                this.currentCure.cure_id,
                this.learning_type === 'review' ? 'T' : 'F',
                idx_text
            );
            console.log(data);

            if (data.code === 1) {
                if (this.currentIndex < this.cure.length - 1) this.currentIndex++;
                else {
                    this.gameDone();
                    return;
                }
                this.currentCure = this.cure[this.currentIndex];

                this.setState({
                    gameState: true,
                    picBox: soundURL + this.currentCure.cure_path,
                    CardTextList: this.currentCure.answer === 0 ?
                        [this.currentCure.cure_word, this.currentCure.cure_word2] :
                        [this.currentCure.cure_word2, this.currentCure.cure_word]
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    onTreeTouchEndHandle = () => {
        this.setState({
            isDragging: false,
        })
    }

    pictursPreloading = (picture) => {
        try {
            for (let i in picture) {
                let img = new Image();
                img.src = soundURL + picture[i].cure_path;
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
                        // setTimeout(() => this.playSound(), 1000);
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
        const { CardTextList, picBox, isImageLoaded, showPopup, showDonePopup, showDailyPopup, percent, gameState } = this.state;

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
            />);
        }
        else {
            return <LoadingComp percent={percent} />
        }
    }
}