import React from 'react';
import RecognitionPresenter from './RecognitionPresenter';

import { TTobak, Recognition } from 'images';
import { D2_Api } from 'api';

export default class extends React.Component {
    /* 
    모든 로직 추가 
    api 가져오기
    error 처리 등 모든 것
     */

    state = {
        s_id: 4,
        gameState: false,
        Box: [Recognition.Box1_1, Recognition.Box2_1],
        oriAnswer: null,
        stdAnswer: null,
        path: [],
        answerIndex: null,
        ph: [],
        TTobaki: TTobak.ttobak3_1
    };

    Clicked = async (id) => {
        const { Box, answerIndex, TTobaki } = this.state;
        switch (id) {
            case 0:
                this.setState({
                    Box: [answerIndex === id ? Recognition.Box1_3 : Recognition.Box1_2, Box[1]],
                    TTobaki: [answerIndex === id ? TTobak.ttobak2_1 : TTobaki]
                });
                break;
            case 1:
                this.setState({
                    Box: [Box[0], answerIndex === id ? Recognition.Box2_3 : Recognition.Box2_2],
                    TTobaki: [answerIndex === id ? TTobak.ttobak2_1 : TTobaki]
                });
                break;
            default:
                break;
        }

        this.finished();
        console.log(this.state);

        // console.log(id);

    }

    TTobakiTouch = async () => {
        const { gameState } = this.state;

        if (gameState) {
            const { path, answerIndex } = this.state;

            await new Audio(path[0]).play();
            this.delay(1000);
            await new Audio(path[1]).play();
            this.delay(1300);
            await new Audio(path[answerIndex]).play();

        } else {
            try {
                this.setState({
                })
                const { data } = await D2_Api.ask(1, 4);
                console.log(data);
                if (data.code === 1) {
                    const [ph_path, ph] = [[data.ph1_path, data.ph2_path], [data.ph1, data.ph2]];
                    const { answer } = data;

                    this.setState({
                        gameState: true,
                        oriAnswer: answer,
                        path: ph_path,
                        answerIndex: (answer === ph[0] ? 0 : 1),
                        ph: ph,
                    });

                    console.log(this.state);
                    const { path, answerIndex } = this.state;
                    await new Audio(path[0]).play();
                    this.delay(1000);
                    await new Audio(path[1]).play();
                    this.delay(1300);
                    await new Audio(path[answerIndex]).play();
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    finished = async () => {
        console.log('finished');
        const { s_id, oriAnswer, stdAnswer, ph } = this.state;

        try {
            const data = await D2_Api.answer(s_id, oriAnswer, stdAnswer, ph);
            console.log(data);
        } catch (e) {
            console.log(e);
        } finally {
            this.delay(2000);
            this.setState({
                gameState: false,
                Box: [Recognition.Box1_1, Recognition.Box2_1],
                oriAnswer: null,
                stdAnswer: null,
                path: [],
                answerIndex: null,
                ph: [],
                TTobaki: TTobak.ttobak3_1
            });
        }

    }

    delay = (ms) => {
        const now = new Date().getTime()
        while (new Date().getTime() < now + ms) { }
    }

    render() {
        /*
        presenter로 가는 모든 스테이트 값 렌더링
        예시) const { nowPlaying, upcoming, popular, error, loading } = this.state;
        */

        const { Box, TTobaki } = this.state;
        return (
            <RecognitionPresenter
                TTobaki={TTobaki}
                TTobakiTouch={this.TTobakiTouch}
                Box={Box}
                Clicked={this.Clicked}
            />);
    }
}