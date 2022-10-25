import styled from "styled-components" ;
import {useState} from "react";

interface ContainerProps{
    bgColor: string
    borderColor:string
}
interface CircleProps {
    bgColor: string
    borderColor?:string
}

const Container = styled.div<ContainerProps>`
    width: 20px;
    height:20px;
    background-color:${(props) => props.bgColor};
    border-radius: 10px;
    border : 1px solid ${props => props.borderColor }
`


function Circle({bgColor, borderColor }: CircleProps){
    const [conter, setCounter] = useState(0);
    setCounter(2);
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} /> /*정해진 값이 없다면 초기값으로 bgColor를 줌*/
    )
}

export default Circle;
