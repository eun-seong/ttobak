import React from 'react';
import { withRouter } from 'react-router-dom';
import AttentionPresenter from './AttentionPresenter';

import { D3 } from 'images';
import { D3_Api } from 'api';

class Attention extends React.Component {
    constructor(s_id) {
        super();
        this.state = {
            gameState: false,
            s_id: s_id || 4,                            // 학습자 아이디
        };
    }

    Test = async () => {
        const data = await D3_Api.ask(1, 4);
        console.log(data);
    }

    render() {
        this.Test();
        return (<AttentionPresenter
            Background={D3.d3_background}
        />);
    }
}

export default withRouter(Attention);