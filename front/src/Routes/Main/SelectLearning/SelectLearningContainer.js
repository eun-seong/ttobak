import React from 'react';
import SelectLearningPresenter from './SelectLearningPresenter';

import { MainTherapy } from 'images';
import { withRouter } from 'react-router-dom';

class Select extends React.Component {
    state = {
        ContentsList: [
            { index: 0, img: MainTherapy[0] },
            { index: 1, img: MainTherapy[1] },
            { index: 2, img: MainTherapy[2] },
            { index: 3, img: MainTherapy[3] },
            { index: 4, img: MainTherapy[4] },
            { index: 5, img: MainTherapy[5] },
            { index: 6, img: MainTherapy[6] },
            { index: 7, img: MainTherapy[7] },
            { index: 8, img: MainTherapy[8] },
            { index: 9, img: MainTherapy[9] },
            { index: 10, img: MainTherapy[10] },
        ]
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        console.log(this.props.history);
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */
        const { ContentsList } = this.state;

        return (
            <SelectLearningPresenter
                ContentsList={ContentsList}
                goBack={this.goBack}
            />);
    }
}

export default withRouter(Select);