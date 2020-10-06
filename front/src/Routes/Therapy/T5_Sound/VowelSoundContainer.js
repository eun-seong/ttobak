import React from 'react';
import VowelSoundPresenter from './VowelSoundPresenter';

import { T5, TTobak, Characters } from 'images';

export default class extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            type: match.params.type,
            TTobaki: TTobak.ttobak1_1,                  // 또박이 이미지 상태
        }
    }

    TTobakiTouch = async () => {
        console.log('ttobaki touched');
    }


    render() {
        const { TTobaki } = this.state;

        return (<VowelSoundPresenter
            Background={T5.t5_background}
            TTobak={TTobaki}
            TTobakiTouch={this.TTobakiTouch}
            Card={[Characters.card1, Characters.card2]}
        />);
    }
}