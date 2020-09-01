import axios from 'axios';

const api = axios.create({
    baseURL: "http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/api/"
});

export const D1_Api = {
    ask: (freg, level, s_id) =>
        api.post("swp_test/ask", {
            "freq": freg,
            "level": level,
            "s_id": s_id
        }),
    answer: (s_id, swp_id, oriAnswer, Answer) =>
        api.post("swp_test/answer", {
            "s_id": s_id,
            "swp_id": swp_id,
            "ori_answer1": oriAnswer[0],
            "ori_answer2": oriAnswer[1],
            "stu_answer1": Answer[0],
            "stu_answer2": Answer[1],
        }),
};

export default api;