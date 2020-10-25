import React from 'react';
import { withRouter } from 'react-router-dom';
import AttentionPresenter from './AttentionPresenter';

import LoadingComp from 'Components/LoadingComp';

import { D3, TTobak } from 'images';
import { D3_Api } from 'api';

class Attention extends React.Component {
    constructor() {
        super();
        this.numOfLoadedImage = 0;
        this.picture = { D3, TTobak };
        this.totalImages = Object.keys(D3).length + Object.keys(TTobak).length;

        this.state = {
            gameState: false,
            s_id: 4,
            isImageLoaded: false,
            percent: 0,
            showPopup: false,
            showNextPopup: false,                        // 학습자 아이디
        };
    }

    async componentDidMount() {
        this.newRequest();
        this.imagesPreloading(this.picture);
    }

    componentWillUnmount() {

    }

    newRequest = async () => {
        const { data } = await D3_Api.ask(this.state.s_id);
        console.log(data);

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
                        // setTimeout(() => this.playSound(), 1000);
                    }
                };
            }
        }
    }

    onPopupButtonHandle = () => {
        this.props.history.replace('/diagnose/recognition');
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
        const { isImageLoaded, showPopup, showNextPopup, percent } = this.state;

        if (isImageLoaded) {
            return (<AttentionPresenter
                Background={D3.d3_background}
                showPopup={showPopup}
                showNextPopup={showNextPopup}
                onPopupButtonHandle={this.onPopupButtonHandle}
                onContinueButtonHandle={this.onContinueButtonHandle}
                onPauseButtonHandle={this.onPauseButtonHandle}
            />);
        }
        else {
            return <LoadingComp percent={percent} />
        }
    }
}

export default withRouter(Attention);