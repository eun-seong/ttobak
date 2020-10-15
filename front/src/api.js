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

export const Daily_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
        }),
}

export const T1_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.poem,
        }),
    answer: (s_id, full_score, phone_score, speed_score, rhythm_score, is_review, cure_id) =>
        api.post(url.therapy_answer, {
            "s_id": s_id,
            "idx_txt": idx_txt.poem,
            "full_score": full_score,
            "phone_score": phone_score,
            "speed_score": speed_score,
            "rhythm_score ": rhythm_score,
            "is_review": is_review,
            "cure_id": cure_id
        }),
};

export const Audio_Api = {
    segscroe: (gender, transcript, file) => {
        api.post(url.audio_segscore, {
            gender: gender,
            transcript: transcript,
            file: file,
        })
    }
}

export const T2_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.count,
        }),
    answer: (s_id, ori_answer, stu_answer, cure_id, is_review) =>
        api.post(url.therapy_answer, {
            "s_id": s_id,
            "cure_id": cure_id,
            "idx_txt": idx_txt.count,
            "is_review": is_review || "F",
            "ori_answer": ori_answer,
            "stu_answer": stu_answer,
        }),
};

export const T3_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.common,
        }),
    answer: (s_id) =>
        api.post(url.therapy_answer, {
            "s_id": s_id,
            "idx_txt": idx_txt.common,
        }),
};

export const T4_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.vowelword,
        }),
    answer: (s_id) =>
        api.post(url.therapy_answer, {
            "s_id": s_id,
            "idx_txt": idx_txt.vowelword,
        }),
};

export const T5_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.vowelsound,
        }),
    answer: (s_id) =>
        api.post(url.therapy_answer, {
            "s_id": s_id,
            "idx_txt": idx_txt.vowelsound,
        }),
};

export const T6_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.consomatch,
        }),
    answer: (s_id) =>
        api.post(url.therapy_answer, {
            "s_id": s_id,
            "idx_txt": idx_txt.consomatch,
        }),
};

export const T7_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.consocommon,
        }),
    answer: (s_id) =>
        api.post(url.therapy_answer, {
            "s_id": s_id,
            "idx_txt": idx_txt.consocommon,
        }),
};

export const T8_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.consoword,
        }),
    answer: (s_id) =>
        api.post(url.therapy_answer, {
            "s_id": s_id,
            "idx_txt": idx_txt.consoword,
        }),
};

export const T9_Api = {
    ask: (s_id) =>
        api.post(url.therapy_ask, {
            "s_id": s_id,
            "idx_txt": idx_txt.consosound,
        }),
    answer: (s_id) =>
        api.post(url.therapy_answer, {
            "s_id": s_id,
            "idx_txt": idx_txt.consosound,
        }),
};

export default api;