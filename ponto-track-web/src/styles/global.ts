import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: 0;
    }

    :focus {
        outline: 0;
    }

    body, input, textarea, button,span, p,label {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 500;
    }

    p, label{
        font-size: 0.8rem !important;
    }

    body {
        background-color: #f4f4f4;
    }
`
