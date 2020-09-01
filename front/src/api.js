import axios from 'axios';

const api = axios.create({
    baseURL: "http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/api/"
});

export const D1_Api = {
    ask: (freg, level, s_id) => {
        api.post("swp_test/ask", {
            "freq": freg,
            "level": level,
            "s_id": s_id
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error);
        })
    }
}

export default api;