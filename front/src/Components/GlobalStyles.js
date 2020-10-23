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
        -webkit-tap-highlight-color: rgba(0,0,0,0);
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

@font-face {
        font-family: 'NanumBarunGothic';
        font-style: normal;
        font-weight: 400;
        src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot');
        src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf') format('truetype');
    }

    @font-face {
        font-family: 'NanumBarunGothic';
        font-style: normal;
        font-weight: 700;
        src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot');
        src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.ttf') format('truetype')
    }

    @font-face {
        font-family: 'NanumBarunGothic';
        font-style: normal;
        font-weight: 300;
        src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot');
        src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.ttf') format('truetype');
    }

    .nanumbarungothic * {
        font-family: 'NanumBarunGothic', sans-serif;
    }
`;

export default globalStyles;