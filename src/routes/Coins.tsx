import styled from "styled-components"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

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

const Loader = styled.span`
    display:block;
    text-align: center;
`
interface CoinInterface {
    id: string,
    name:  string,
    symbol:  string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

const Coins = () => {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        (async () => {
            const response = await fetch ("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoading(false);
        })();
    }, []);
    console.log(coins.length);
    return(
        <Container>

            <Header>
                <Title >코인</Title>
            </Header>
            {loading ?
                (<Loader>Loading...</Loader>)
                :
                (
                <CoinsList>

                    {coins.map(coin =>

                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`}> {coin.name} &rarr;</Link>

                        </Coin> )
                    }
                    <Coin></Coin>
                </CoinsList>
                )
            }

        </Container>

    )
}
export default  Coins ;