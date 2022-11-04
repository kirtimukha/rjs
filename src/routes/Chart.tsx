import {useOutletContext} from "react-router-dom";
import {fetchCoinHistory} from "../api";
import {useQuery} from "react-query";

interface ChartProps {
    coinId : string
}
const Chart = () => {
    const coinId =useOutletContext();

    const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
        fetchCoinHistory(`${coinId}`) // ohlcFetch(coinId)에서 coinId Error
    );
    console.log(`${coinId}`);
    return <h1>Chart</h1>


}
export default Chart