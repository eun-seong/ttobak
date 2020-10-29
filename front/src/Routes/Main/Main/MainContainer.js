import React from 'react';
import { withRouter } from 'react-router-dom';
import MainPresenter from './MainPresenter';

import { Daily_Api } from 'api';
import ContentsList from '../ContentsList';
import Images, { MainRoot, Pause } from 'images';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { student_get, user_get } from 'Sessions/action.js';

class Main extends React.Component {
    static propTypes = {
        user: PropTypes.objectOf(PropTypes.any).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isImageLoaded: false,
            daily_custom: null,
            daily_link: null,
        }
        this.numOfLoadedImage = 0;
        this.pictures = { Images, MainRoot, Pause };

        const { user } = this.props;
        const { dispatch } = this.props;

        if (!user.user.u_id) {
            this.props.history.push('/root/signin');
            return;
        }

        if (!user.student.s_id) {
            this.props.history.push('/root/selectstd');
            return;
        }

        dispatch(user_get(user.user.u_id));
        dispatch(student_get(user.student.s_id, user.user.u_id));
    }

    goBack = () => {
        this.props.history.goBack();
    }

    async componentDidMount() {
        const { user } = this.props;
        if (!user.student.s_id) return;

        this.request();
        this.imagesPreloading(this.pictures);
    }

    request = async () => {
        const { user } = this.props;
        try {
            const { data } = await Daily_Api.ask(user.student.s_id);
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
        const { user } = this.props;

        if (!(user.student.s_id && user.student.name)) {
            return null;
        }
        return (
            <MainPresenter
                goBack={this.goBack}
                student={user.student}
                data={data}
                isImageLoaded={isImageLoaded}
                daily_custom={daily_custom}
                daily_link={daily_link}
            />
        );


    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(Main));