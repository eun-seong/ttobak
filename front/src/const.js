const level = {
    level1: {
        text: '미흡',
        color: '#D17869'
    },
    level2: {
        text: '보통',
        color: '#F5CF66'
    },
    level3: {
        text: '우수',
        color: '#8BAB8D'
    },
}

export const colors = {
    background: '#FDF5DB',
    border_purple: '#AC9BC9',
    main_header_yellow: '#F6DB57',
    main_header_blue: '#62AAF5',
    main_header_red: '#F59F6E',
    main_blue: '#97C3EB',
    main_red: '#F7BC93',
    main_yellow: '#F8E384'
}

export const ItemTypes = {
    APPLE: 'apple',
}

export const Diagnose_explain = {
    swp: {
        title: '청각처리속도',
        explain: '500Hz, 1000Hz, 2000Hz 의 주파수와 80ms부터 30ms 까지 시간의 짧은 기계음을 들려줍니다.' +
            '이 기계음은 올라가는 음과 내려가는 음이 있습니다.' +
            ' 주파수가 높을 수록 시간이 짧을 수록 레벨이 올라가며, 어느 수준까지 듣고 올라가는 소리인지, 내려가는 소리인지 판단할 수 있는지 확인하는 검사입니다.'
    },
    recognition: {
        title: '음운청취력',
        explain: '한 음절의 단어를 두 개 들려줍니다. 그 중 또박이가 말하는 음절과 같은 음절을 소리만 듣고 판단할 수 있는지 확인하는 검사입니다. '
    },
    attention: {
        title: '선택적집중력',
        explain: '여러 사람의 목소리가 들리는 상황에서, 가장 크고 명확하게 들리는 소리를 잘 인지할 수 있는지 확인하는 검사입니다. ' +
            '목소리를 듣고 따라 말하면 발음 정확도와 속도 등을 체크합니다. '
    }
}

export default level;