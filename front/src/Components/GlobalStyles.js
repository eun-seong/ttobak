import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
        margin: 0px;
        padding: 0px;
        
    }
    body{
        font-family: 'paybooc-Medium';
        font-size:12px;
        overflow: hidden;
        background-color:#FDF5DB;
    }
@font-face { 
  font-family: 'paybooc-Bold'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Bold.woff') format('woff'); 
  font-weight: bold; 
  font-style: normal; 
}

@font-face { 
  font-family: 'paybooc-Light';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Light.woff') format('woff'); 
  font-weight: lighter; 
  font-style: normal; 
}

@font-face { 
  font-family: 'paybooc-Medium';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-Medium.woff') format('woff'); 
  font-weight: normal; 
  font-style: normal; 
}

@font-face { 
  font-family: 'paybooc-ExtraBold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/paybooc-ExtraBold.woff') format('woff'); 
  font-weight: bolder; 
  font-style: normal; 
}
`;

export default globalStyles;