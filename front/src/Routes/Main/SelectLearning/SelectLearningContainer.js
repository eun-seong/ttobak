import React from 'react';
import SelectLearningPresenter from './SelectLearningPresenter';

import { MainTherapy } from 'images';
import { withRouter } from 'react-router-dom';

class Select extends React.Component {
    state = {
        s_id: 4,
        isImageLoaded: false,
    }

    numOfLoadedImage = 0;
    ContentsList = [
        {
            index: 0,
            img: MainTherapy[0],
            url: '/therapy/shadowing/poem',
            title: '의미 | 따라 읽기',
            explain: '동요와 동시를 따라 읽어요',
        },
        {
            index: 1,
            img: MainTherapy[1],
            url: '/therapy/shadowing/vowelword',
            title: '모음 | 단어',
            explain: '모음 단어를 듣고 무엇인지 맞혀 봐요',
        },
        {
            index: 2,
            img: MainTherapy[2],
            url: '/therapy/sound/vowel',
            title: '모음 | 소리 구분',
            explain: '단어를 듣고 모음을 구분해 봐요',
        },
        {
            index: 3,
            img: MainTherapy[3],
            url: '/therapy/consomatch',
            title: '자음 | 그림-소리 매칭',
            explain: '그림에 맞는 단어인지 맞혀 봐요',
        },
        {
            index: 4,
            img: MainTherapy[4],
            url: '/therapy/consocommon',
            title: '자음 | 음운 포함 여부',
            explain: '단어를 듣고 어떤 자음이 들어가는지 맞혀 봐요',
        },
        {
            index: 5,
            img: MainTherapy[5],
            url: '/therapy/shadowing/consoword',
            title: '자음 | 단어 발음하기',
            explain: '단어를 발음해  봐요',
        },
        {
            index: 6,
            img: MainTherapy[6],
            url: '/therapy/sound/conso',
            title: '자음 | 소리 구분',
            explain: '단어를 듣고 자음을 구분해 봐요',
        },
        {
            index: 7,
            img: MainTherapy[7],
            url: '/therapy/count',
            title: '음운 | 음절 수 계산',
            explain: '단어를 듣고 몇 글자인지 맞혀 봐요',
        },
        {
            index: 8,
            img: MainTherapy[8],
            url: '/therapy/common',
            title: '음운 | 공통소리 찾기',
            explain: '단어를 듣고 같은 자음을 찾아 봐요',
        },
        {
            index: 9,
            img: MainTherapy[9],
            url: '/diagnose/sweep',
            title: '의미 | 청각처리 속도',
            explain: '소리가 올라가는 것인지 내려가는 것인지 맞혀 봐요',
        },
        {
            index: 10,
            img: MainTherapy[10],
            url: '/diagnose/recognition',
            title: '의미 | 어음청취력',
            explain: '단어를 듣고 첫 글자 자음을 맞혀 봐요',
        },
        {
            index: 11,
            img: MainTherapy[11],
            url: '/diagnose/attention',
            title: '의미 | 선택적 집중력',
            explain: '다른 사람의 말을 집중해서 들어  봐요',
        },
    ]

    componentDidMount() {
        for (var i = 0; i < this.ContentsList.length; i++) {
            let img = new Image();
            img.src = this.ContentsList[i].img;
            img.onload = () => {
                this.numOfLoadedImage++;
                if (this.numOfLoadedImage === 12)
                    this.setState({
                        isImageLoaded: true,
                    })
            };
        }
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        console.log(this.props.history);
        const { s_id, isImageLoaded } = this.state;

        // if (isImageLoaded)
        return (
            <SelectLearningPresenter
                ContentsList={this.ContentsList}
                goBack={this.goBack}
                s_id={s_id}
            />);
        // else
        //     return <div>loading...</div>
    }
}

export default withRouter(Select);