import axios from 'axios';

export const soundURL = 'https://ttobak.s3.ap-northeast-2.amazonaws.com';


export const api = axios.create({
    baseURL: 'http://ec2-3-35-71-135.ap-northeast-2.compute.amazonaws.com:8000/api/'
});

const url = {
    diagnose_ask: 'diagnose/ask',
    diagnose_answer: 'diagnose/answer',
    diagnose_okay: 'diagnose/okay',
    diagnose_did: 'diagnose/did',
    therapy_ask: 'cure/ask',
    therapy_answer: 'cure/answer',
    therapy_save: 'cure/save',
    audio_segscore: 'segscore',
    diag_result: 'diagnose/result',
    statistic_ask: 'statistic/get',
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
    user_register: (email, pw, name) =>
        api.post('user/register', {
            'email': email,
            'pw': pw,
            'name': name
        }),
    user_signin: (email, pw) =>
        api.post('user/signin', {
            'email': email,
            'pw': pw
        }),
    user_modify: (email, pw, name, u_id) =>
        api.post('user/modify', {
            'email': email,
            'pw': pw,
            'name': name,
            'id': u_id
        }),
    user_delete: (u_id) =>
        api.post('user/delete', {
            'id': u_id
        }),
    user_get: (u_id) =>
        api.post('user/get', {
            'id': u_id
        }),
    student_add: (name, birth, gender, u_id) =>
        api.post('student/add', {
            'u_id': u_id,
            'name': name,
            'birth': birth,
            'gender': gender
        }),
    student_modify: (name, birth, gender, s_id, u_id) =>
        api.post('student/modify', {
            's_id': s_id,
            'u_id': u_id,
            'name': name,
            'birth': birth,
            'gender': gender
        }),
    student_delete: (s_id, u_id) =>
        api.post('student/delete', {
            's_id': s_id,
            'u_id': u_id
        }),
    student_get: (s_id, u_id) =>
        api.post('student/get', {
            's_id': s_id,
            'u_id': u_id
        }),
};

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
    answer: (s_id, oriAnswer, stdAnswer, ph) =>
        api.post(url.diagnose_answer, {
            's_id': s_id,
            'ques_id': ph[0],
            'ques_id2': ph[1],
            'ori_answer': oriAnswer,
            'stu_answer': stdAnswer,
            'is_review': 'F',
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
            'idx_txt': idx_txt.foc,
            'ques_id': ques_id,
            'full_score': full_score,
            'phone_score': phone_score,
            'speed_score': speed_score,
            'rhythm_score': rhythm_score,
            'is_review': 'F'
        }),
};

export const D_tutorial = {
    answer: (s_id, idx_txt) =>
        api.post(url.diagnose_answer, {
            "s_id": s_id,
            "idx_txt": idx_txt,
            "tutorial": "true"
        })
}

export const Daily_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            's_id': s_id,
        }),
    save: (s_id) =>
        api.post(url.therapy_save, {
            's_id': s_id,
        }),
    okay: (s_id) =>
        api.post(url.diagnose_okay, {
            's_id': s_id,
        }),
    did: (s_id) =>
        api.post(url.diagnose_did, {
            's_id': s_id,
        })
}

export const T_tutorial = {
    answer: (s_id, idx_txt, ques_id) =>
        api.post(url.therapy_answer, {
            "s_id": s_id,
            "idx_txt": idx_txt,
            "tutorial": "true",
            "ques_id": ques_id
        }),
}

export const T1_Api = {
    ask: (s_id, idx_txt) =>
        api.post(url.therapy_ask, {
            's_id': s_id,
            'idx_txt': idx_txt,
        }),
    answer: (s_id, full_score, phone_score, speed_score, rhythm_score, is_review, cure_id, idx_txt, is_daily, is_first) =>
        api.post(url.therapy_answer, {
            's_id': s_id,
            'idx_txt': idx_txt,
            'full_score': full_score,
            'phone_score': phone_score,
            'speed_score': speed_score,
            'rhythm_score': rhythm_score,
            'is_review': is_review,
            'cure_id': cure_id,
            'is_daily': is_daily,
            'is_first': is_first,
        }),
};

export const T_Api2 = {
    ask: (s_id, idx_txt) =>
        api.post(url.therapy_ask, {
            's_id': s_id,
            'idx_txt': idx_txt,
        }),
    answer: (s_id, ori_answer, stu_answer, cure_id, is_review, idx_txt, is_daily, is_first) =>
        api.post(url.therapy_answer, {
            's_id': s_id,
            'cure_id': cure_id,
            'idx_txt': idx_txt,
            'is_review': is_review || 'F',
            'ori_answer': ori_answer,
            'stu_answer': stu_answer,
            'is_daily': is_daily,
            'is_first': is_first,
        }),
};

export const T_Api3 = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            's_id': s_id,
            'idx_txt': idx_txt.vowelword,
        }),
    answer: (s_id, is_daily, is_first) =>
        api.post(url.therapy_answer, {
            's_id': s_id,
            'idx_txt': idx_txt.vowelword,
            'is_daily': is_daily,
            'is_first': is_first,
        }),
};

export const T_Api4 = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            's_id': s_id,
            'idx_txt': idx_txt.consomatch,
        }),
    answer: (s_id, cure_id, stu_answer, ori_answer, is_review, is_daily, is_first) =>
        api.post(url.therapy_answer, {
            's_id': s_id,
            'idx_txt': idx_txt.consomatch,
            'cure_id': cure_id[0],
            'cure_id2': cure_id[1],
            'cure_id3': cure_id[2],
            'stu_answer': stu_answer,
            'ori_answer': ori_answer,
            'is_review': is_review,
            'is_daily': is_daily,
            'is_first': is_first,
        }),
};

export const Result_Api = {
    ask: (s_id) =>
        api.post(url.diag_result, {
            's_id': s_id,
        })
}

export const Stat_Api = {
    ask: (s_id, is_cure, period) =>
        api.post(url.statistic_ask, {
            's_id': s_id,
            'cure_or_test': (is_cure ? 'cure' : 'test'),
            'period': period,
        }),
}

export default api;