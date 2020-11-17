import React from 'react';
import { withRouter } from 'react-router-dom';
import MainPresenter from './MainPresenter';

import { Daily_Api, Result_Api } from 'api';
import Images, { MainRoot, Pause } from 'images';
import ContentsList from '../ContentsList';

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
            daily_complete: false,
            isFirstDiagnose: false,
            showPopUp: false,
            develop: false,
        }
        this.numOfLoadedImage = 0;
        this.pictures = { Images, MainRoot, Pause };
    }

    goBack = () => {
        this.props.history.goBack();
    }

    async componentDidMount() {
        const { user } = this.props;
        const { dispatch } = this.props;

        if (!user.user.u_id || !user.student.s_id) {
            this.props.history.push('/root/signin');
            return;
        }

        dispatch(user_get(user.user.u_id));
        dispatch(student_get(user.student.s_id, user.user.u_id));

        const { data } = await Daily_Api.did(user.student.s_id);
        if (data.is_first) {
            this.setState({
                isFirstDiagnose: true,
            });
        }

        this.request();
        this.imagesPreloading(this.pictures);
    }

    request = async () => {
        const { user } = this.props;
        try {
            console.log(user.student.s_id);
            const { data } = await Daily_Api.ask(user.student.s_id);
            const save = await Daily_Api.save(user.student.s_id);
            console.log('data', data);
            console.log('save', save.data.current);

            if (data.code === 1 || data.code === 'tutorial') {
                // if (save.data.current.length === 0) {
                //     this.setState({
                //         daily_complete: true,
                //     })
                // }
                // else 
                {
                    const content = ContentsList.filter(c => {
                        return c.name === save.data.current;
                    })[0];

                    this.setState({
                        data: data,
                        daily_custom: ContentsList[0],
                        daily_link: ContentsList[0].url,
                    });
                }
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

    isDiagOkay = async () => {
        const { user } = this.props;
        const { data } = await Daily_Api.okay(user.student.s_id);

        console.log(data);
        if (data.is_okay) this.props.history.push('/diagnose/sweep');
        else this.setState({
            showPopUp: true,
        });
        // this.props.history.push('/diagnose/sweep');
    }

    onOkButtonHandle = () => {
        this.setState({
            showPopUp: false,
        });
    }

    developMode = () => {
        this.setState({
            develop: true,
            isFirstDiagnose: false,
        })
    }

    render() {
        const { data, isImageLoaded, daily_custom, daily_link, daily_complete, isFirstDiagnose, showPopUp } = this.state;
        const { user } = this.props;

        if (!user.student.s_id || !user.student.name) {
            console.log('nnn', user);
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
                daily_complete={daily_complete}
                isDiagOkay={this.isDiagOkay}
                isFirstDiagnose={isFirstDiagnose}
                onOkButtonHandle={this.onOkButtonHandle}
                showPopUp={showPopUp}
                developMode={this.developMode}
            />
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(withRouter(Main));