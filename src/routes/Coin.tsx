import {useEffect, useState} from "react";
import {Link, Outlet, Route, Routes, useLocation, useMatch, useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import styled from "styled-components";
import {useQuery} from "react-query";
import {fetchCoinInfo, fetchCoinTickers} from "../api";

import Price from "./Price";
import Chart from "./Chart";


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
    display: flex;
    align-items: center;
    justify-content: center;
    button{
        margin-left: 1rem;
        font-size: 0.3em;
    }
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
  //background-color: rgba(0, 0, 0, 0.5);
  background-color: ${props=>props.theme.loaderColor};    
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
    line-height:1.4;
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
  background-color: ${props=>props.theme.loaderColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
      &:hover{color:  ${(props) => props.theme.accentColor}; } 
  }
`;

interface RouteParams {
    coinId: string;
}
interface RouteState {
    state : {name: string}
}
const CoinsList = styled.ul``
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
    const {state} = useLocation() as LocationState;
    // const {coinId} = useParams<RouteParams>(); 작동하지 않음
    // const {state} = useLocation<RouteState>(); 작동하지 않음
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const {isLoading: infoLoading, data: infoData}= useQuery<InfoData>(["info", coinId], () =>  fetchCoinInfo(`${coinId}`));
    const {isLoading: tickersLoading, data: tickersData}= useQuery<PriceData>(["tickers", coinId],
        () =>  fetchCoinTickers(`${coinId}`),
        {refetchInterval : 5000}
    );
    const loading = infoLoading || tickersLoading;
    const navigate = useNavigate();
    return(
        <Container>
            <Helmet>
                <title>{state?.name ? state.name : loading ? "Loading1..." : infoData?.name}</title>
            </Helmet>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading1..." : infoData?.name}
                    <button onClick={() => navigate(-1)}>See All Coins </button>
                </Title>
            </Header>

            {loading ? ( <> <Loader>Loading2...</Loader> <div>{infoData?.rank}  </div> </> )
            : (
                <>
                <Overview>
                    <OverviewItem>
                        <span>Rank:</span>
                        <span>{infoData?.rank} rank</span>

                    </OverviewItem>
                    <OverviewItem>
                        <span>Symbol:</span>
                        <span>{infoData?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Price:</span>
                        <span>$ {tickersData?.quotes.USD.price.toFixed(3)}</span>
                    </OverviewItem>
                </Overview>
                <Description>{infoData?.description}</Description>
                <Overview>
                    <OverviewItem>
                        <span>Total Supply:</span>
                        <span>{tickersData?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply:</span>
                        <span>{tickersData?.max_supply}</span>
                    </OverviewItem>
                </Overview>
                <Tabs>
                    <Tab isActive={priceMatch !== null || ( priceMatch == null && chartMatch == null ) }><Link to={`price`}>Price</Link></Tab>
                    <Tab isActive={chartMatch !== null }><Link to={`chart`}>Chart</Link></Tab>
                </Tabs>
                <Outlet context={coinId}/>
                </>
            ) }


        </Container>
    )
}
export default  Coin ;