import React from 'react';
import ShadowingPresenter from './ShadowingPresenter';

import { T1, TTobak } from 'images';

export default class extends React.Component {
    constructor({ match }) {
        super();
        this.state = {
            type: match.params.type
        }
    }

    render() {
        const { type } = this.state;
        console.log(type);

        return (<ShadowingPresenter
            Background={T1.t1_background}
            TTobak={TTobak.ttobak1_1}
            TextBox={T1.t1_textbox}
            type={type}
        />);
    }
}