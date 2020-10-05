import React from 'react';
import RecognitionPresenter from './RecognitionPresenter';
import { withRouter } from 'react-router-dom';

import { TTobak, D2 } from 'images';
import { D2_Api } from 'api';
class Recognition extends React.PureComponent {
    constructor({ s_id }) {
        super();
        this.state = {
            s_id: s_id || 4,
            gameState: false,
            Box: [D2.d2_Box1_1, D2.d2_Box2_1],
            oriAnswer: null,
            stdAnswer: null,
            path: [],
            answerIndex: null,
            ph: [],
            audio: [],
            TTobaki: TTobak.ttobak3_1
        };
    }

    Clicked = async (id) => {
        const { Box, answerIndex, TTobaki, gameState } = this.state;
        if (!gameState) return;

        switch (id) {
            case 0:
                this.setState({
                    Box: [answerIndex === id ? D2.d2_Box1_3 : D2.d2_Box1_2, Box[1]],
                    TTobaki: [answerIndex === id ? TTobak.ttobak2_1 : TTobaki]
                });
                break;
            case 1:
                this.setState({
                    Box: [Box[0], answerIndex === id ? D2.d2_Box2_3 : D2.d2_Box2_2],
                    TTobaki: [answerIndex === id ? TTobak.ttobak2_1 : TTobaki]
                });
                break;
            default:
                break;
        }

        this.finished();
        console.log(this.state);
    }

    TTobakiTouch = async () => {
        const { gameState } = this.state;

        if (gameState) {
            this.playSound();
        } else {
            try {
                const { data } = await D2_Api.ask(1, 4);
                console.log(data);
                if (data.code === 1) {
                    const { answer } = data;
                    const ph_path = [data.ph1_path, data.ph2_path];
                    const ph = [data.ph1, data.ph2];
                    console.log(ph_path);

                    this.setState({
                        gameState: true,
                        oriAnswer: answer,
                        path: ph_path,
                        answerIndex: (answer === ph[0] ? 0 : 1),
                        audio: [new Audio(ph_path[(answer === ph[0] ? 0 : 1)]), new Audio(ph_path[0]), new Audio(ph_path[1])],
                        ph: ph,
                    });

                    console.log(this.state);
                    this.playSound();
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    changeTTobaki = (ttobaki) => {
        this.setState({
            TTobaki: ttobaki
        });
    }

    playSound = async () => {
        const { audio } = this.state;
        this.changeTTobaki(TTobak.ttobak2_2);
        await audio[0].play();
        this.delay(1300);
        this.changeTTobaki(TTobak.ttobak3_1);

        await audio[1].play();
        this.delay(1300);

        await audio[2].play();
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
                Box: [D2.d2_Box1_1, D2.d2_Box2_1],
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
        const { Box, TTobaki } = this.state;

        return (
            <RecognitionPresenter
                Background={D2.d2_background}
                TTobaki={TTobaki}
                TTobakiTouch={this.TTobakiTouch}
                Box={Box}
                Clicked={this.Clicked}
            />);
    }
}


export default withRouter(Recognition);