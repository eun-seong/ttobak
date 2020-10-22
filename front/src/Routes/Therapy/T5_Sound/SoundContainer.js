import React from 'react';
import SoundPresenter from './SoundPresenter';

import { T5, TTobak, Characters } from 'images';
import { T_Api2, soundURL } from 'api';
import LoadingComp from 'Components/LoadingComp';

export default class extends React.Component {
    constructor({ match, location }) {
        super();
        this.learning_type = match.params.learning_type;
        this.type = match.params.type;
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.currentAudio = null;
        this.numOfLoadedImage = 0;
        this.picture = { T5, TTobak, Characters };
        this.totalImages = Object.keys(T5).length + Object.keys(TTobak).length + Object.keys(Characters).length;

        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
            is_review: match.params.is_review,
            TTobaki: TTobak.ttobak1_1,                  // 또박이 이미지 상태
            gameState: false,
            CardTextList: null,
            isImageLoaded: false,
        }

        if (this.learning_type === 'daily') {
            console.log(location.state.data.cure);
            this.cure = location.state.data.cure;
            this.currentCure = this.cure[this.currentIndex];
            this.setAudio();
        }
    }

    async componentDidMount() {
        this.imagesPreloading(this.picture);
        if (this.learning_type !== 'daily') this.newRequest();
        else {
            this.setState({
                CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
            })
        }
    }

    componentWillUnmount() {
        this.currentAudio.pause();
        this.currentAudio = null;
    }

    newRequest = async () => {
        console.log('new request');

        try {
            const { s_id } = this.state;
            const { data } = await T_Api2.ask(s_id, this.idx_text);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.cure = data.cure;
                this.currentCure = data.cure[this.currentIndex];
                this.setAudio();
                this.setState({
                    CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
                })
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    setAudio = () => {
        if (this.type === 'conso') {
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
                gameState: true,
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
        })

        try {
            const { s_id, is_review, CardTextList } = this.state;
            console.log(this.currentCure.answer, this.currentCure.cure_word, this.currentCure.cure_word2)
            const { data } = await T_Api2.answer(
                s_id,
                this.currentCure.answer === 1 ? this.currentCure.cure_word : this.currentCure.cure_word2,
                CardTextList[index],
                this.currentCure.cure_id,
                is_review,
                this.idx_text
            );
            console.log(data);

            if (data.code === 1) {
                if (this.currentIndex < this.cure.length - 1) this.currentIndex++;
                else {
                    this.gameDone();
                    return;
                }
                this.currentCure = this.cure[this.currentIndex];
                this.setAudio();

                setTimeout(() => {
                    this.setState({
                        CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2],
                        TTobaki: TTobak.ttobak1_1,
                        gameState: true,
                    });
                }, 2000);

                setTimeout(() => {
                    this.playSound();
                }, 3000);
            }
        } catch (e) {
            console.log(e);
        }
    }

    gameDone = () => {
        console.log('game doen!')
    }

    imagesPreloading = (picture) => {
        for (let i in picture) {
            for (let prop in picture[i]) {
                if (typeof (picture[i][prop]) === 'object') {
                    this.totalImages += picture[i][prop].length;
                    this.totalImages--;

                    let arr = picture[i][prop];
                    for (let i in arr) {
                        let img = new Image();
                        img.src = arr[i];
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

                } else {
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
    }

    render() {
        const { TTobaki, CardTextList, isImageLoaded } = this.state;
        if (isImageLoaded) {
            return (<SoundPresenter
                Background={T5.t5_background}
                TTobak={TTobaki}
                TTobakiTouch={this.onTTobakiTouchHandle}
                Card={[Characters.card1, Characters.card2]}
                CardTextList={CardTextList || ['아', '에']}
                onCardTouchHandle={this.onCardTouchHandle}
            />);
        }
        else {
            return <LoadingComp />
        }
    }
}