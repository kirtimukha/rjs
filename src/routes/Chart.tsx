import {useOutletContext} from "react-router-dom";
import {fetchCoinHistory} from "../api";
import {useQuery} from "react-query";
import ApexChart from "react-apexcharts";
import {isDarkAtom} from "../atom";
import {useRecoilValue} from "recoil";

// interface ChartProps {
//     coinId : string
// }

interface IHistorical {
   time_open : string;
   time_close : number;
   open : number;
   high : number;
   low : number;
   close : number;
   volume : number;
   market_cap  : number;
}

const Chart = () => {
    const isDark = useRecoilValue(isDarkAtom);
    const coinId =useOutletContext();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(`${coinId}`), // ohlcFetch(coinId)에서 coinId Error
        {refetchInterval: 10000}
    );
    console.log(data, "DATA");
    return <div>{isLoading ? "Loading chrart..." :
        <ApexChart
            type="line"
           series={[
               {
                   name: "Price",
                   data: data?.map( (price) => price.close) as number[],
               }

           ]}
            options={{
                theme:{
                    mode: isDark? "dark" : "light"
                },
                chart: {
                    height: 300,
                    width: 500,
                    toolbar: {
                        show: false,

                    },
                    background:"transparent"
                },
                grid: {show:false},
                yaxis:{
                    show: false,
                    axisBorder: {show: true},
                },
                xaxis: {
                    labels:{
                        show: false,
                        datetimeFormatter: {month: "mmm 'yy"}
                    },
                    axisTicks: {show: false},
                    axisBorder: {show: false},
                   categories: data?.map( (price) => new Date(price.time_close * 1000).toISOString() ),
                },
                stroke: {
                    curve: "smooth",
                    width:4,
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        gradientToColors: ["#0be881" ],
                        stops: [0,100]
                    }
                },
                colors: ["#0fbcf9"],
                tooltip: {
                    y:{
                        formatter : val => `$ ${val.toFixed(3)}`
                    },
                },
        }}
        />
    }
    </div>


}
export default Chart;