import React from 'react';
import ConsoCommonPresenter from './ConsoCommonPresenter';

import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingComp from 'Components/LoadingComp';
import { T7, Characters } from 'images';
import { T_Api2, soundURL } from 'api';

const idx_text = 'consocommon';

class ConsoCommon extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match, location }) {
        super();
        this.learning_type = match.params.learning_type;
        this.cure = null;
        this.currentCure = null;
        this.currentIndex = 0;
        this.ori_answer = null;
        this.numOfLoadedImage = 0;
        this.picture = { T7, Characters };
        this.totalImages = Object.keys(T7).length + Object.keys(Characters).length;

        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
            is_review: match.params.is_review,
            gameState: false,
            picBox: null,
            CardTextList: null,
            isImageLoaded: false,
            showPopup: false,
        };

        if (this.learning_type === 'daily') {
            console.log(location.state.data.cure);
            this.cure = location.state.data.cure;
            this.currentCure = this.cure[this.currentIndex];
            this.ori_answer = [this.currentCure.cure_word, this.currentCure.cure_word2];
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
                this.cure = data.cure;
                this.pictursPreloading(this.cure);
                this.currentCure = this.cure[this.currentIndex];
                this.ori_answer = [this.currentCure.cure_word, this.currentCure.cure_word2];

                this.setState({
                    picBox: soundURL + this.currentCure.cure_path,
                    CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2]
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
        console.log('done!');
    }

    onCardTouchHandle = async (id) => {
        try {
            const { s_id, is_review } = this.state;
            const { data } = await T_Api2.answer(
                s_id, this.ori_answer[this.currentCure.cure_level - 1],
                this.ori_answer[id],
                this.currentCure.cure_id,
                is_review,
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
                this.ori_answer = [this.currentCure.cure_word, this.currentCure.cure_word2];

                this.setState({
                    picBox: soundURL + this.currentCure.cure_path,
                    CardTextList: [this.currentCure.cure_word, this.currentCure.cure_word2]
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
                ++this.numOfLoadedImage;
                img.onload = () => {
                    if (this.numOfLoadedImage === this.totalImages) {
                        this.setState({
                            isImageLoaded: true,
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
        const { CardTextList, picBox, isImageLoaded, showPopup } = this.state;

        if (isImageLoaded) {
            return (<ConsoCommonPresenter
                Background={T7.t7_background}
                Card={[Characters.card1, Characters.card2]}
                CardTextList={CardTextList || ['ㄱ', 'ㄴ']}
                picBox={picBox || T7.t7_excpic}
                onCardTouchHandle={this.onCardTouchHandle}
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

export default connect(mapStateToProps)(withRouter(ConsoCommon));