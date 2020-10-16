import React from 'react';
import ConsoCommonPresenter from './ConsoCommonPresenter';

import { T7, Characters } from 'images';
import { T7_Api, soundURL } from 'api';

export default class extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            s_id: parseInt(match.params.s_id) || 4,
            is_review: match.params.is_review,
            gameState: false,
        };

        var currentAudio = null;
    }

    async componentDidMount() {
        this.newRequest();
        setTimeout(() => this.playSound(), 1000);
    }

    newRequest = async () => {
        console.log('new request');
        const { s_id } = this.state;

        try {
            const { data } = await T7_Api.ask(s_id);
            console.log(data);

            if (data.code === 'specified' || data.code === 1) {

            }
            else console.log('data message: ' + data.message);
        } catch (e) {
            console.log('error: ' + e);
        }
    }


    playSound = () => {
        this.setState({
            gameState: false,
        });

    }

    render() {
        return (<ConsoCommonPresenter
            Background={T7.t7_background}
            Card={[Characters.card1, Characters.card2]}
        />);
    }
}