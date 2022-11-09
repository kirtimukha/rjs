import React, {useState} from "react";
import Router from "./Router";
import {ReactQueryDevtools} from "react-query/devtools";
import styled, {ThemeProvider, createGlobalStyle} from "styled-components";
import {darkTheme, lightTheme} from "./theme" ;
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "./atom";
import Header from "./components/Header";
// import Circle from ".Router/Circle";
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
        font: inherit;
        font-size: 100%;
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
    button {
        display: inline-block;      
        border-radius: 3px;
        padding: 2px 6px;
        color: ${props => props.theme.btnTextColor};
        background-color: ${props => props.theme.accentColor};
        cursor: pointer;
        transition: all .75s;
        border: none;
        &:hover {
            color: ${props => props.theme.btnTextHoverColor};
            border: none;
        }
    }
`
const Button = styled.div`
    color: #fff;
    background-color: ${(props) => props.theme.accentColor};
    display: inline-block;
    padding:3px 6px;
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
    }
    //const [isDark, setDark ] = useState(true);
    //const ToggleMode = () => setDark ( current => !current );
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <>
        <ThemeProvider theme={isDark? darkTheme: lightTheme}>
        <GlobalStyle/>
        <Header />
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={value} type="text" placeholder="username"/>
            <Button>Log in</Button>
        </form>
        <Router/>
        <ReactQueryDevtools initialIsOpen={true} />
        </ThemeProvider>
        {/*<Circle bgColor="teal" borderColor="yellow" />
        <Circle bgColor="tomato"/>*/}

        </>


    );
}


export default App;