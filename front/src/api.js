import axios from 'axios';

export const soundURL = 'https://ttobakaudio.s3-ap-northeast-2.amazonaws.com';

const api = axios.create({
    baseURL: "http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/api/"
});

const url = {
    diagnose_ask: 'diagnose/ask',
    diagnose_answer: 'diagnose/answer',
    therapy_ask: 'cure/ask',
    therapy_answer: 'cure/answer',
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
    consocound: 'consocound',
    common: 'common',
    vowelword: 'vowelword',
    consoword: 'consoword',
    review: 'review',
}

export const Root_Api = {
    signin: (id, password) =>
        api.post("user/signin", {
            "email": id,
            "password": password
        }),
}

export const D1_Api = {
    ask: (s_id) =>
        api.post(url.diagnose_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.swp
        }),
    answer: (s_id, ques_id, ori_answer, stu_answer, is_review) =>
        api.post(url.diagnose_answer, {
            "s_id": s_id,
            "ques_id": ques_id,
            "ori_answer1": ori_answer[0],
            "ori_answer2": ori_answer[1],
            "stu_answer1": stu_answer[0],
            "stu_answer2": stu_answer[1],
            "is_review": "T",
            "idx_txt": idx_txt.swp
        }),
};

export const D2_Api = {
    ask: (s_id) =>
        api.post(url.diagnose_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.ph,
        }),
    answer: (s_id, oriAnswer, stdAnswer, ph, is_review) =>
        api.post(url.diagnose_answer, {
            "s_id": s_id,
            "ques_id": ph[0],
            "ques_id2": ph[1],
            "ori_answer": oriAnswer,
            "stu_answer": stdAnswer,
            "is_review": is_review,
            "idx_txt": idx_txt.ph
        }),
};

export const D3_Api = {
    ask: (level, s_id) =>
        api.post(url.diagnose_ask, {
            "level": level,
            "s_id": s_id
        }),
    answer: (s_id, oriAnswer, stdAnswer, ph) =>
        api.post(url.diagnose_answer, {

        }),
};

export const T1_Api = {
    ask: (s_id, idx_txt) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
            // "idx_txt": null
        }),
    answer: (s_id, oriAnswer, stdAnswer, ph) =>
        api.post(url.therapy_answer, {

        }),
};

export default api;