import React from 'react';
import styled, { css } from 'styled-components';
import { useDrop } from 'react-dnd'

import { ItemTypes } from 'const';

const Basket = styled.div`
    display: flex;
    justify-content: center;
    width: 70%;
    height: auto;
`;

const BasketImg = styled.div`
    position: absolute;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
    height: 50%;
    width: 70%;
    bottom: 2.5%;
    z-index: 0;
    padding: 1% 20% 5% 20%;
`;

const AppleImg = styled.img`
    position: absolute;
    height: 21vh;
    width: auto;
    max-height: 80px;
    z-index: 1;
    ${props => {
        if (props.numOfApples <= props.id) return css`
            display: none;
        `;
    }}
`;

const AppleStyle = [
    {
        top: '7%',
        left: '35%'
    },
    {
        top: '12%',
        right: '35%',
    },
    {
        top: '30%',
        left: '30%',
    },
    {
        top: '34%',
        left: '43%',
    },
    {
        top: '28%',
        right: '28%',
    }
]

const BasketComp = ({ src, Apple, dropApple }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.APPLE,
        drop: dropApple,
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    return (
        <Basket ref={drop}>
            <BasketImg src={src} alt='바구니' >
                <AppleImg src={Apple.applesInBasket[1]} alt='apple0' style={AppleStyle[0]} id={1} numOfApples={Apple.numOfApples} />
                <AppleImg src={Apple.applesInBasket[2]} alt='apple1' style={AppleStyle[1]} id={2} numOfApples={Apple.numOfApples} />
                <AppleImg src={Apple.applesInBasket[3]} alt='apple2' style={AppleStyle[2]} id={3} numOfApples={Apple.numOfApples} />
                <AppleImg src={Apple.applesInBasket[0]} alt='apple3' style={AppleStyle[3]} id={0} numOfApples={Apple.numOfApples} />
                <AppleImg src={Apple.applesInBasket[4]} alt='apple4' style={AppleStyle[4]} id={4} numOfApples={Apple.numOfApples} />
            </BasketImg>
        </Basket>
    );
}

export default BasketComp;