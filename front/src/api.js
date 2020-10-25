import axios from 'axios';

export const soundURL = 'https://ttobakaudio.s3-ap-northeast-2.amazonaws.com';

const api = axios.create({
    baseURL: 'http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/api/'
});

const url = {
    diagnose_ask: 'diagnose/ask',
    diagnose_answer: 'diagnose/answer',
    therapy_ask: 'cure/ask',
    therapy_answer: 'cure/answer',
    audio_segscore: 'segscore',
}

const idx_txt = {
    swp: 'swp',
    ph: 'ph',
    foc: 'foc',
    poem: 'poem',
    text: 'text',
    selfpoem: 'selfpoem',
    selftext: 'selfpoem',
    count: 'count',
    vowelsound: 'vowelsound',
    consocommon: 'consocommon',
    consosound: 'consosound',
    consomatch: 'consomatch',
    common: 'common',
    vowelword: 'vowelword',
    consoword: 'consoword',
    review: 'review',
}

export const Root_Api = {
    signin: (id, password) =>
        api.post('user/signin', {
            'email': id,
            'password': password
        }),
}

export const D1_Api = {
    ask: (s_id) =>
        api.post(url.diagnose_ask, {
            's_id': s_id,
            'idx_txt': idx_txt.swp
        }),
    answer: (s_id, ques_id, ori_answer, stu_answer) =>
        api.post(url.diagnose_answer, {
            's_id': s_id,
            'ques_id': ques_id,
            'ori_answer1': ori_answer[0],
            'ori_answer2': ori_answer[1],
            'stu_answer1': stu_answer[0],
            'stu_answer2': stu_answer[1],
            'is_review': 'F',
            'idx_txt': idx_txt.swp
        }),
};

export const D2_Api = {
    ask: (s_id) =>
        api.post(url.diagnose_ask, {
            's_id': s_id,
            'idx_txt': idx_txt.ph,
        }),
    answer: (s_id, oriAnswer, stdAnswer, ph, is_review) =>
        api.post(url.diagnose_answer, {
            's_id': s_id,
            'ques_id': ph[0],
            'ques_id2': ph[1],
            'ori_answer': oriAnswer,
            'stu_answer': stdAnswer,
            'is_review': is_review,
            'idx_txt': idx_txt.ph
        }),
};

export const D3_Api = {
    ask: (s_id) =>
        api.post(url.diagnose_ask, {
            's_id': s_id,
            'idx_txt': idx_txt.foc,
        }),
    answer: (s_id, ques_id, full_score, phone_score, speed_score, rhythm_score) =>
        api.post(url.diagnose_answer, {
            's_id': s_id,
            'idx_txt': idx_txt,
            'ques_id': ques_id,
            'full_score': full_score,
            'phone_score': phone_score,
            'speed_score': speed_score,
            'rhythm_score': rhythm_score,
            'is_review': 'F'
        }),
};

export const Daily_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            's_id': s_id,
        }),
}

export const T1_Api = {
    ask: (s_id, idx_txt) =>
        api.post(url.therapy_ask, {
            's_id': s_id,
            'idx_txt': idx_txt,
        }),
    answer: (s_id, full_score, phone_score, speed_score, rhythm_score, is_review, cure_id, idx_txt) =>
        api.post(url.therapy_answer, {
            's_id': s_id,
            'idx_txt': idx_txt,
            'full_score': full_score,
            'phone_score': phone_score,
            'speed_score': speed_score,
            'rhythm_score': rhythm_score,
            'is_review': is_review,
            'cure_id': cure_id
        }),
};

export const T_Api2 = {
    ask: (s_id, idx_txt) =>
        api.post(url.therapy_ask, {
            's_id': s_id,
            'idx_txt': idx_txt,
        }),
    answer: (s_id, ori_answer, stu_answer, cure_id, is_review, idx_txt) =>
        api.post(url.therapy_answer, {
            's_id': s_id,
            'cure_id': cure_id,
            'idx_txt': idx_txt,
            'is_review': is_review || 'F',
            'ori_answer': ori_answer,
            'stu_answer': stu_answer,
        }),
};

export const T_Api3 = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            's_id': s_id,
            'idx_txt': idx_txt.vowelword,
        }),
    answer: (s_id) =>
        api.post(url.therapy_answer, {
            's_id': s_id,
            'idx_txt': idx_txt.vowelword,
        }),
};

export const T_Api4 = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            's_id': s_id,
            'idx_txt': idx_txt.consomatch,
        }),
    answer: (s_id, cure_id, stu_answer, ori_answer, is_review) =>
        api.post(url.therapy_answer, {
            's_id': s_id,
            'idx_txt': idx_txt.consomatch,
            'cure_id': cure_id[0],
            'cure_id2': cure_id[1],
            'cure_id3': cure_id[2],
            'stu_answer': stu_answer,
            'ori_answer': ori_answer,
            'is_review': is_review
        }),
};

export default api;