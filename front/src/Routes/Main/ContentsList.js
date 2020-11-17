import { MainTherapy } from 'images';

const ContentsList = [
    {
        name: 'poem',
        img: MainTherapy[0],
        url: '/therapy/poem',
        title: '의미 | 따라 읽기',
        explain: '동요와 동시를 따라 읽어요',
    },
    // {
    //     name: 'selfpoem',
    //     img: MainTherapy[0],
    //     url: '/therapy/selfpoem',
    //     title: '의미 | 혼자 읽기',
    //     explain: '동요와 동시를 혼자 읽어요',
    // },
    {
        name: 'vowelword',
        img: MainTherapy[1],
        url: '/therapy/word/vowelword',
        title: '모음 | 단어',
        explain: '모음 단어를 듣고 무엇인지 맞혀 봐요',
    },
    {
        name: 'vowelsound',
        img: MainTherapy[2],
        url: '/therapy/sound/vowel',
        title: '모음 | 소리 구분',
        explain: '단어를 듣고 모음을 구분해 봐요',
    },
    {
        name: 'consomatch',
        img: MainTherapy[3],
        url: '/therapy/consomatch',
        title: '자음 | 그림-소리 매칭',
        explain: '그림에 맞는 단어인지 맞혀 봐요',
    },
    {
        name: 'consocommon',
        img: MainTherapy[4],
        url: '/therapy/consocommon',
        title: '자음 | 음운 포함 여부',
        explain: '단어를 듣고 어떤 자음이 들어가는지 맞혀 봐요',
    },
    {
        name: 'consoword',
        img: MainTherapy[5],
        url: '/therapy/word/consoword',
        title: '자음 | 단어 발음하기',
        explain: '단어를 발음해  봐요',
    },
    {
        name: 'consosound',
        img: MainTherapy[6],
        url: '/therapy/sound/conso',
        title: '자음 | 소리 구분',
        explain: '단어를 듣고 자음을 구분해 봐요',
    },
    {
        name: 'count',
        img: MainTherapy[7],
        url: '/therapy/count',
        title: '음운 | 음절 수 계산',
        explain: '단어를 듣고 몇 글자인지 맞혀 봐요',
    },
    {
        name: 'common',
        img: MainTherapy[8],
        url: '/therapy/common',
        title: '음운 | 공통소리 찾기',
        explain: '단어를 듣고 같은 자음을 찾아 봐요',
    }
]

export default ContentsList;