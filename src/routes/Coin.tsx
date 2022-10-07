import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useState} from "react";

const Container = styled.div`
    padding:0 1.5rem;
    max-width: 30rem;
    margin:0 auto;
`
const Header = styled.div`

`

const CoinsList = styled.ul`

`

const Title = styled.h1`
color: ${props => props.theme.accentColor };
font-size: 3rem;
`
const Loader = styled.span`
    display:block;
    text-align: center;
`
const Coin = () => {
    const [loading, setLoading] = useState(true);
   /*
   interface routeParams {
    coinId :  string ;
}
   const {coinId} = useParams<routeParams>(); <--  이 방법은 에러가 난다*/
    const {coinId} = useParams<{coinId:string}>();

    return(

        <Container>
            <Header>
                    <Title >코인{coinId}</Title>
            </Header>
            {loading ?
                (<Loader>Loading...</Loader>)
                : null }
        </Container>

    )
}
export default  Coin ;