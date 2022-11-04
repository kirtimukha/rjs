const BASE_URL = `https://api.coinpaprika.com/v1`;
//const BASE_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

export async function fetchCoins(){
    return fetch(`${BASE_URL}/coins`)
    .then((response) => response.json());
    // const response = await fetch ("https://api.coinpaprika.com/v1/coins");
    // const json = await response.json();
    //
    // return json;
}

export async function fetchCoinInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}`)
        .then((response) => response.json());
}

export async function fetchCoinTickers(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}`)
        .then((response) => response.json());
}


export async function fetchCoinHistory(coinId:string){
    const endDate = Math.floor(Date.now() / 1000 );
    const startDate = endDate - 60*60*24*7; //일주일전

    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
        .then((response) => response.json());
}

