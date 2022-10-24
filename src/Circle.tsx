import styled from "styled-components";

interface ContainerProps {
    bgColor: string;
    borderColor:string;
}

interface CircleProps {
    bgColor: string;
    borderColor?:string;
}
const Container = styled.div<ContainerProps>`
    width:100px;
    height:100px;
    background-color: ${props => props.bgColor};
    border-radius: 100px;
    border: 1px solid ${props => props.borderColor};
`

function Circle ({bgColor, borderColor}: CircleProps ){
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}/>
    )
}
export default Circle;

/*

interface PlayerShape{
name: string
    age: number
}
const sayHello = (playerObj:PlayerShape) => `hello ${playerObj.name, playerObj.age}`;
sayHello({name:'nico', age: 18});*/
