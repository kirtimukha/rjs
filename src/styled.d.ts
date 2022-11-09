import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        btnTextColor: string;
        btnTextHoverColor:string,
        textColor: string;
        bgColor: string;
        accentColor: string;
        loaderColor: string;
    }
    export interface LightTheme {
        btnTextColor: string;
        btnTextHoverColor:string,
        textColor: string;
        bgColor: string;
        accentColor: string;
        loaderColor: string;
    }
}