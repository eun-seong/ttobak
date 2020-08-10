import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
        
    }
    body{
        font-size:12px;
        overflow: hidden;
        background-color:rgb(FD,F5,DB);
    }
`;

export default globalStyles;