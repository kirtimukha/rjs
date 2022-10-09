import {useLocation, useParams} from "react-router-dom";
import styled from "styled-components";
import {useEffect, useState} from "react";

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

const Header = styled.div`

`

const CoinsList = styled.ul`

`

const Loader = styled.span`
    margin-top: 3rem;
    display:block;
    text-align: center;
`
interface LocationState {
    state :{
        name: string
        rank: number
    }
}


interface InfoData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: object;
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;

}
interface PriceData{

}
const Coin = () => {
    const {coinId} = useParams<{coinId:string}>();
    const [loading, setLoading] = useState(true);// d이미 api 를 불렀을 때 state를 통해 불러진  데이터를 이용해서 api 다시 로드 하지 않고 빠르게 앱을 다시 부를 수 있다
    /*
       interface routeParams {
        coinId :  string ;
    }
    const {coinId} = useParams<routeParams>(); <--  이 방법은 에러가 난다*/

    const {state} = useLocation() as LocationState; /*state를받을 수있음*/
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});
    useEffect(() => {
        (async () => {
            const infoData = await ( await fetch (`https://api.coinpaprika.com/v1/coins/${coinId}`)
                                    ).json();
            console.log(infoData);
            const priceData = await ( await fetch (`https://api.coinpaprika.com/v1/tickers/${coinId}`)
                                    ).json();
            console.log(priceData);
            setInfo(infoData);
            setPriceInfo(priceData);
        })();
    }, []);


    return(

        <Container>
            <Header>
                    <Title >{/*코인 {coinId}*/}코인명 {state?.name || "Loading..."}</Title>
            </Header>
            {loading ?
                (<Loader>Loading...</Loader>)
                : null }
            <div>
              {/*  information
                https://api.coinpaprika.com/v1/coins/btc-bitcoin
                https://api.coinpaprika.com/#operation/getCoinById
                price
                https://api.coinpaprika.com/v1/tickers/btc-bitcoin
                https://api.coinpaprika.com/#operation/getTickerById*/}
            </div>
        </Container>

    )
}
export default  Coin ;