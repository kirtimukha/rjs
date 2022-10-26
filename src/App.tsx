import styled, {createGlobalStyle} from "styled-components";
import React, {useState} from "react";
import Router from "./Router";
import Circle from "./Circle";
const GlobalStyle=createGlobalStyle`   
    *{box-sizing:border-box; }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, menu, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup, 
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
        display: block;
    }

    /* HTML5 hidden-attribute fix for newer browsers */
    *[hidden] {
        display: none;
    }
    body {
        font-family: 'Open Sans', 'Source Sans Pro', sans-serif;
        line-height: 1;
        background-color: ${(props)=> props.theme.bgColor};
        color: ${(props)=> props.theme.textColor};
    }
    menu, ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }


    a{text-decoration: none;color:inherit;}
`
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
background-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.textColor};
`


const App = () => {
    const [value, setValue] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {

        console.log(event.currentTarget.value)
        const { currentTarget: {value}, } = event;
        setValue(value)
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => { 만약 폼에 감싸여 있지 앟다면
        event.preventDefault();
        console.log("hello", value)

    }
    return (
        <>
        <GlobalStyle/>
        {/*<Circle bgColor="teal" borderColor="yellow" />
        <Circle bgColor="tomato"/>*/}
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={value} type="text" placeholder="username"/>
                <Button>Log in</Button>
            </form>
        <Router />

        </>
    );
}


export default App;