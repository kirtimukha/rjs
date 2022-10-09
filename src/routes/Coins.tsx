import styled from "styled-components"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
const Header = styled.div`

`
const Title = styled.h1`
    margin:2rem auto 1.5rem;
    text-align:center;
    font-size: 3rem;
    letter-spacing: -0.25rem;
    color: ${props => props.theme.accentColor };
`

const Container = styled.div`
    padding:0 1.5rem;
    max-width: 30rem;
    margin:0 auto;
`


const CoinsList = styled.ul`

`

const Coin = styled.li`
    background-color: white;
    color:  ${props => props.theme.bgColor };
    margin-bottom: 0.75rem;
    border-radius: 0.875rem;
    a{
        display:flex;
        align-items:center;
        transition : color 0.2s ease-in;
        padding: 1rem;}
    &:hover{
        a{
            color:${props => props.theme.accentColor };
        }
    }
`

const Img= styled.img`
    width: 35px;
    height: 35px;
    margin-right:10px;
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
                            {/*<Link to={`/${coin.id}`} state: {name : coin.name}>
                               <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt=""/>{
                                coin.name} &rarr;
                            </Link>*/}

                            <Link to={`/${coin.id}`} //react 18 pathname  안 씀
                                  state={coin} // state : 정보를 백그라운드에서 다른 컴포넌트에 보내는 방법
                            >
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={`${coin.name}`}/>{
                                coin.name} &rarr;
                            </Link>


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