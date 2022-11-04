import {useEffect, useState} from "react";
import {Link, Outlet, Route, Routes, useLocation, useMatch, useParams} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import chart from "./Chart";
const Loader = styled.span`
    margin-top: 3rem;
    display:block;
    text-align: center;
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

const Header = styled.div`

`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteParams {
    coinId: string;
}
interface RouteState {
    state : {name: string}
}
const CoinsList = styled.ul`

`


interface LocationState {
    state :{
        name: string
        rank: number
    }
}
// interface Itag {
//     coin_number: number,
//     ico_counter: number,
//     id: string,
//     name: string
// }

interface InfoData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    //tags: Itag[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;

}
interface PriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD : {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}
const Coin = () => {
    const {coinId} = useParams<{coinId:string}>();
    const {state} = useLocation() as LocationState; /*state를 받을 수있음*/
    const [loading, setLoading] = useState(false);// 이미 api 를 불렀을 때
                                                            // state를 통해 불러진 데이터를 이용해서 api 다시 로드 하지 않고 빠르게 앱을 다시 부를 수 있다
    /* interface routeParams { coinId :  string ; } const {coinId} = useParams<routeParams>(); <--  이 방법은 에러가 난다*/


    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch (`https://api.coinpaprika.com/v1/coins/${coinId}`)
                                    ).json();
            //console.log(infoData);
            const priceData = await (
                await fetch (`https://api.coinpaprika.com/v1/tickers/${coinId}`)
                                    ).json();
           //console.log(priceData);
            setInfo(infoData);
            setPriceInfo(priceData);
        })();
    }, [coinId]);

    return(
        <Container>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading1..." : info?.name}
                </Title>
            </Header>

            {loading ? ( <> <Loader>Loading2...</Loader> <div>{info?.rank}  </div> </> )
            : (
                <>
                <Overview>
                    <OverviewItem>
                        <span>Rank:</span>
                        <span>{info?.rank} rank</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Symbol:</span>
                        <span>${info?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Open Source:</span>
                        <span>{info?.open_source ? "Yes" : "No"}</span>
                    </OverviewItem>
                </Overview>
                <Description>{info?.description}</Description>
                <Overview>
                    <OverviewItem>
                        <span>Total Supply:</span>
                        <span>{priceInfo?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{priceInfo?.max_supply}</span>
                    </OverviewItem>
                </Overview>
                <Tabs>

                    <Tab isActive={priceMatch !== null }><Link to={`price`}>Price</Link></Tab>
                    <Tab isActive={chartMatch !== null }><Link to={`chart`}>Chart</Link></Tab>
                </Tabs>
                <Outlet/>
                </>
            ) }


        </Container>
    )
}
export default  Coin ;