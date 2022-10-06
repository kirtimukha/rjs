import {useParams} from "react-router-dom";


const Coin = () => {
   /*
   interface routeParams {
    coinId :  string ;
}
   const {coinId} = useParams<routeParams>(); <--  이 방법은 에러가 난다*/
    const {coinId} = useParams<{coinId:string}>();

    return(
        <h1>Coin : {coinId}</h1>
    )
}
export default  Coin ;