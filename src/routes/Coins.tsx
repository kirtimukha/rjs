import styled from "styled-components"
import {Link} from "react-router-dom";

const Title = styled.h1`
color: ${props => props.theme.accentColor };
font-size: 3rem;
`

const Container = styled.div`
    padding:0 1.5rem;
    max-width: 30rem;
    margin:0 auto;
`
const Header = styled.div`

`

const CoinsList = styled.ul`

`


const Coin = styled.li`
    background-color: white;
    color:  ${props => props.theme.bgColor };
    margin-bottom: 0.75rem;
    border-radius: 0.875rem;
    a{transition : color 0.2s ease-in;display:block;
        padding: 1.125rem;}
    &:hover{
        a{
            color:${props => props.theme.accentColor };
        }
    }
`

const coins = [
    {
        id: "btc-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        rank: 1,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "eth-ethereum",
        name: "Ethereum",
        symbol: "ETH",
        rank: 2,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "hex-hex",
        name: "HEX",
        symbol: "HEX",
        rank: 3,
        is_new: false,
        is_active: true,
        type: "token",
    },
];

const Coins = () => {
    return(
        <Container>

            <Header>
                <Title >코인</Title>
            </Header>

            <CoinsList>

                {coins.map(coin =>

                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`}> {coin.name} &rarr;</Link>
                       {/* {coin.rank} &nbsp;

                        {coin.symbol} &nbsp;



                        {coin.is_new}

                        {coin.is_active}

                        {coin.type}*/}
                    </Coin> )
                }
                <Coin></Coin>
            </CoinsList>

        </Container>

    )
}
export default  Coins ;