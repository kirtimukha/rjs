import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from "styled-components";
import {theme, lightTheme} from "./theme" ;
import App from "./App";
import {QueryClient, QueryClientProvider} from "react-query";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);


reportWebVitals();