import styled from "styled-components"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchCoins} from "../api";
import {useQuery} from "react-query";

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
        padding: 1rem;
    }
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

interface ICoin {
    id: string,
    name:  string,
    symbol:  string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

const Coins = () => {
    //useQuery 74~84 라인을 대체하는 내용임 대박
    // needs 2 args, 1. query key, 2. fetcher function
    const {isLoading, data}= useQuery<ICoin[]>(
        "allCoins",  fetchCoins
    );
    console.log(data, ":: DATA");
    return(
        <Container>
            <Header>
                <Title >코인</Title>
            </Header>
            {isLoading ?
                (<Loader>Loading...</Loader>)
                :
                (
                <CoinsList>
                    {data?.slice(0, 10).map( (coin) =>
                        <Coin key={coin.id}>

                            <Link to={`/${coin.id}`} //react 18 pathname  안 씀
                                  state={coin} // state : 링크를 통해서 정보를 백그라운드(비하인드 더 씬)에서 다른 컴포넌트에 보내는 방법
                            >
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={`${coin.name}`}/>{
                                coin.name} &rarr;
                            </Link>
                        </Coin>
                        )
                    }
                    <Coin></Coin>
                </CoinsList>
                )
            }

        </Container>

    )
}
export default  Coins ;