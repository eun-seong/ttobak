
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const List = styled.ul`
display: flex;
&:hover{
background-color:orange;
}
`;

const SLink = styled(Link)``;

function Header() {
    return (
        <header>
            <List>
                <li>
                    <SLink to="/">Movies</SLink>
                </li>
                <li>
                    <SLink to="/tv">TV</SLink>
                </li>
                <li>
                    <SLink to="/search">Search</SLink>
                </li>
            </List>
        </header>
    );
}

export default Header;