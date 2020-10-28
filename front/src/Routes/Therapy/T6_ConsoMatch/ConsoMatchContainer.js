import React from 'react';
import { withRouter } from 'react-router-dom';
import ConsoMatchPresenter from './ConsoMatchPresenter';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingComp from 'Components/LoadingComp';
import { T6, Characters } from 'images';
import { T_Api4, soundURL } from 'api';

class ConsoMatch extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor({ match, location }) {
        super();
        this.learning_type = match.params.learning_type;
        this.cure = null;
        this.answer = null;
        this.currentCure = null;
        this.currentAudio = null;
        this.currentIndex = 0;
        this.numOfLoadedImage = 0;
        this.picture = { T6, Characters };
        this.totalImages = Object.keys(T6).length + Object.keys(Characters).length;

        this.state = {
            gameState: false,
            PicBoxList: null,
            Worm: Characters.worm2_2,
            isImageLoaded: false,
            showPopup: false,
        };

        if (this.learning_type === 'daily') {
            console.log(location.state.data.cure);
            this.answer = location.state.data.answer;
            this.cure = location.state.data.cure;

            this.currentCure = this.answer[this.currentIndex];
            console.log(soundURL + this.getListFilter('cure_tid', this.currentCure[0]).cure_path2);

            this.currentAudio = new Audio(soundURL + this.getListFilter('cure_tid', this.currentCure[3][0]).cure_path);
            this.currentAudio.addEventListener('ended', () => {
                this.setState({
                    gameState: true,
                    Worm: Characters.worm2_2,
                })
            })
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
                PicBoxList: [
                    soundURL + this.getListFilter('cure_tid', this.currentCure[0]).cure_path2,
                    soundURL + this.getListFilter('cure_tid', this.currentCure[1]).cure_path2,
                    soundURL + this.getListFilter('cure_tid', this.currentCure[2]).cure_path2,
                ]
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

    getListFilter = (key, value) => {
        return this.cure.filter((object) => { return object[key] === value })[0]
    }

    newRequest = async () => {
        console.log('new request');
        const { user } = this.props;
        const s_id = user.student.s_id;

        try {
            const { data } = await T_Api4.ask(s_id);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {
                this.answer = data.answer;
                this.cure = data.cure;

                this.pictursPreloading(this.cure);
                this.setCurrent(0);
            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }

    setCurrent = (timeout) => {
        this.currentCure = this.answer[this.currentIndex];

        this.currentAudio = new Audio(soundURL + this.getListFilter('cure_tid', this.currentCure[3][0]).cure_path);
        this.currentAudio.addEventListener('ended', () => {
            this.setState({
                gameState: true,
                Worm: Characters.worm2_2,
            })
        })

        setTimeout(() => {
            this.setState({
                PicBoxList: [
                    soundURL + this.getListFilter('cure_tid', this.currentCure[0]).cure_path2,
                    soundURL + this.getListFilter('cure_tid', this.currentCure[1]).cure_path2,
                    soundURL + this.getListFilter('cure_tid', this.currentCure[2]).cure_path2,
                ]
            })
        }, timeout);
    }

    playSound = () => {
        if (!!this.currentAudio) {
            this.setState({
                gameState: true,
                Worm: Characters.worm2_1,
            });
            this.currentAudio.play();
        }
    }

    gameDone = () => {
        console.log('done!');
    }

    onFrameTouchHandle = async (id) => {
        const { gameState } = this.state;
        if (!gameState) return;
        this.setState({
            gameState: false,
        });

        try {
            const { user } = this.props;
            const s_id = user.student.s_id;
            const cure_id = [
                this.getListFilter('cure_tid', this.currentCure[0]).cure_id,
                this.getListFilter('cure_tid', this.currentCure[1]).cure_id,
                this.getListFilter('cure_tid', this.currentCure[2]).cure_id,
            ];
            const { data } = await T_Api4.answer(
                s_id,
                cure_id,
                this.getListFilter('cure_tid', this.currentCure[id]).cure_word,
                this.getListFilter('cure_tid', this.currentCure[3][0]).cure_word,
                this.learning_type === 'review' ? 'T' : 'F'
            );
            console.log(data);

            switch (data.code) {
                case 1:
                    if (this.currentIndex < this.answer.length - 1) this.currentIndex++;
                    else {
                        this.gameDone();
                        return;
                    }
                    this.setCurrent(2000);

                    setTimeout(() => {
                        this.playSound();
                    }, 3000);
                    break;
                case 2:
                    console.log(data.message);
                    this.gameDone();
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    }

    onWormTouchHandle = () => {
        if (this.state.gameState) this.playSound();
    }

    pictursPreloading = (picture) => {
        try {
            for (let i in picture) {
                let img = new Image();
                img.src = soundURL + picture[i].cure_path2;
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
        const { PicBoxList, Worm, isImageLoaded, showPopup } = this.state;

        if (isImageLoaded) {
            return (<ConsoMatchPresenter
                Background={T6.t6_background}
                Worm={Worm}
                onWormTouchHandle={this.onWormTouchHandle}
                frameList={PicBoxList || [T6.t6_excpic, T6.t6_excpic, T6.t6_excpic]}
                onFrameTouchHandle={this.onFrameTouchHandle}
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

export default connect(mapStateToProps)(withRouter(ConsoMatch));