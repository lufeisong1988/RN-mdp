import StrategyService from '../service/StrategyService'
import * as Types from './StrategyGetTragetType'
const getStrategyTraget = (date,folderId,tokenId) =>{
    let params = {
        'date':date,
        'folderId':folderId,
        'tokenId':tokenId,
    };
    return(dispatch,getState)=>{
        dispatch({type:Types.GET_STRATEGYTRAGET_ING});
        StrategyService.strategyGetTraget(params,function (result) {
            dispatch({type:Types.GET_STRATEGYTRAGET_SUCCEED,result:result});
        }, function (errorCode, errorDes) {
            dispatch({type:Types.GET_STRATEGYTRAGET_FAIL,errorCode:errorCode,errorDes:errorDes})
        })
    }
};
export default getStrategyTraget