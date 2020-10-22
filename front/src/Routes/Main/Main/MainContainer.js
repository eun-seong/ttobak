import React from 'react';
import { withRouter } from 'react-router-dom';
import MainPresenter from './MainPresenter';

import { Daily_Api } from 'api';
import ContentsList from '../ContentsList';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            s_id: 4,
            data: null,
            isImageLoaded: false,
            daily_custom: null,
            daily_link: null,
        }
        this.numOfLoadedImage = 0;
    }

    goBack = () => {
        this.props.history.goBack();
    }

    async componentDidMount() {
        this.request();
        this.imagesPreloading();
    }

    request = async () => {
        try {
            const { data } = await Daily_Api.ask(this.state.s_id);
            console.log(data);

            if (data.code === 1) {
                this.setState({
                    data: data,
                    // daily_custom: data.daily_cure,
                    // daily_link: ContentsList.filter(c => {
                    //     return c.name === data.daily_cure;
                    // })[0].url,
                    daily_custom: 'common',
                    daily_link: ContentsList.filter(c => {
                        return c.name === 'common';
                    })[0].url,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    imagesPreloading = () => {
        for (var i = 0; i < ContentsList.length; i++) {
            let img = new Image();
            img.src = ContentsList[i].img;
            img.onload = () => {
                this.numOfLoadedImage++;
                if (this.numOfLoadedImage === ContentsList.length)
                    this.setState({
                        isImageLoaded: true,
                    })
            };
        }
    }

    render() {
        const { data, isImageLoaded, daily_custom, daily_link } = this.state;
        console.log(this.props.history);

        return (
            <MainPresenter
                goBack={this.goBack}
                data={data}
                isImageLoaded={isImageLoaded}
                daily_custom={daily_custom}
                daily_link={daily_link}
            />);
    }
}

export default withRouter(Main);