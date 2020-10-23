import React from 'react';
import { withRouter } from 'react-router-dom';
import MainPresenter from './MainPresenter';

import { Daily_Api } from 'api';
import ContentsList from '../ContentsList';
import Images, { MainRoot, Pause } from 'images';

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
        this.pictures = { Images, MainRoot, Pause };
    }

    goBack = () => {
        this.props.history.goBack();
    }

    async componentDidMount() {
        this.request();
        this.imagesPreloading(this.pictures);
    }

    request = async () => {
        try {
            const { data } = await Daily_Api.ask(this.state.s_id);
            console.log(data);

            if (data.code === 1) {
                this.setState({
                    data: data,
                    daily_custom: data.daily_cure,
                    daily_link: ContentsList.filter(c => {
                        return c.name === data.daily_cure;
                    })[0].url,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    imagesPreloading = (picture) => {
        for (let i = 0; i < ContentsList.length; i++) {
            let img = new Image();
            img.src = ContentsList[i].img;
        }

        for (let i in picture) {
            for (let prop in picture[i]) {
                if (typeof (picture[i][prop]) === 'object') {
                    let arr = picture[i][prop];
                    for (let i in arr) {
                        let img = new Image();
                        img.src = arr[i];
                        ++this.numOfLoadedImage;
                    }
                } else {
                    let img = new Image();
                    img.src = picture[i][prop];
                    ++this.numOfLoadedImage;
                }
            }
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