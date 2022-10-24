import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from "styled-components";
import {theme, lightTheme} from "./theme" ;
import App from "./App";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);


reportWebVitals();