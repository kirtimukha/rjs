import {BrowserRouter, Route, Routes} from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

interface IRouterProps {
}
const Router = () => {
  return(
    <BrowserRouter>
        <Routes>{/*한번에 하나만 라우트/렌더링 되게 함*/}
            <Route path="/:coinId" element={ <Coin/> }>
                <Route path="chart" element={ <Chart/> }></Route>
                <Route path="price" element={ <Price/> }></Route>
            </Route>
            <Route path="/"  element={ <Coins/> } ></Route>
        </Routes>
    </BrowserRouter>

  )
}

export default Router;