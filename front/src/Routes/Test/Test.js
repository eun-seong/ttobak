import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { T2 } from 'images';

const Div = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const Apple = styled.img`
    position: absolute;
    height: 20%;
    width: auto;
    ${props => {
        if (!props.isDrag) {
            return css`
                display: none;
            `;
        } else {
            const { position, clientHeight } = props;
            const [posX, posY] = [position[0] - 0.1 * clientHeight, position[1] - 0.1 * clientHeight];
            return css`
                left: ${posX + 'px'};
                top: ${posY + 'px'};
            `;
        }
    }};
`;

const Left = styled.div`
    flex:1;
    background-color: skyblue;
`;

const Right = styled.div`
    flex:1;
    background-color: rebeccapurple;
`;

const TestComponent = React.memo(({ position, onTouchStart, onTouchMove, onTouchEnd, isDrag, size }) => {
    return (
        <Div >
            <Left onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onTouchCancel={onTouchEnd}></Left>
            <Apple src={T2.t2_Apples[0]} alt='apple' isDrag={isDrag} position={position} clientHeight={size} />
            <Right onTouchMove={() => console.log('right touch')}></Right>
        </Div>
    );
});

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            isDrag: false,
            posX: 0,
            posY: 0,
            clientHeight: document.documentElement.clientHeight,
        }
    }

    onTouchStart = e => {
        console.log('onTouchStart()');
        this.setState({
            isDrag: true,
            posX: e.changedTouches[0].clientX,
            posY: e.changedTouches[0].clientY
        })
    }

    onTouchMove = e => {
        console.log('onTouchMove()');
        this.setState({
            posX: e.changedTouches[0].clientX,
            posY: e.changedTouches[0].clientY
        })
    }

    onTouchEnd = () => {
        console.log('onTouchEnd()');
        this.setState({
            isDrag: false,
        })
    }

    render() {
        const { posX, posY, isDrag, clientHeight } = this.state;

        return (
            <TestComponent
                position={[posX, posY]}
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
                isDrag={isDrag}
                size={clientHeight}
            />
        );
    }
}
export default withRouter(Test);