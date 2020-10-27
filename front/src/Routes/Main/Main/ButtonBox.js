import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled(Link)`
    align-items: center;
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};
    background-color: ${props => props.color || 'grey'};
    border-radius: 15px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 1.3rem;
    background-color: ${props => props.color || 'red'};
    border-radius: 15px 15px 0px 0px;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    height: calc(100% - 40px);
    font-size: 0.8rem;
    text-align: ${props => props.isDaily ? 'start' : 'center'};
`;

const ButtonBox = ({ text, Contents, color, headercolor, width, height, linkto, isImageLoaded, data }) => {
    let to_data = null;
    let isDaily = false;
    if (!!data) {
        to_data = {
            pathname: linkto + '/daily',
            state: {
                data: data,
            }
        };
        isDaily = true;
    } else {
        to_data = {
            pathname: linkto,
            state: {
                isImageLoaded: isImageLoaded
            }
        }
    }

    return (
        <Box to={to_data} color={color} width={width} height={height}>
            <Header color={headercolor}>{text}</Header>
            <Content isDaily={isDaily}>
                {Contents}
            </Content>
        </Box>
    );
}

export default ButtonBox;