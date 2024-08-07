import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle` 
    html {
        font-size: 62.5%;
    }
    body, #root {
        height: 100dvh;
    }
    * {
        padding: 0;
        margin: 0;  
        box-sizing: border-box;
    }
    li {
        list-style: none;
    }
`;

export default GlobalStyles;
