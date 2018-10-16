import StrategyService from '../service/StrategyService'
import * as Types from './StrategyGetTragetDataType'
const getStrategyTragetData = (date,folderId,code,dataUrlParam,targetId,tokenId) =>{
    let params = {
        'date':date,
        'folderId':folderId,
        'targetId':targetId,
        'code':code,
        'dataUrlParam':dataUrlParam,
        'tokenId':tokenId,
    };
    return(dispatch,getState)=>{
        dispatch({type:Types.GET_STRATEGYTRAGETDATA_ING});
        StrategyService.strategyGetTragetData(params,function (result) {
            dispatch({type:Types.GET_STRATEGYTRAGETDATA_SUCCEED,result:result});
        }, function (errorCode, errorDes) {
            dispatch({type:Types.GET_STRATEGYTRAGETDATA_FAIL,errorCode:errorCode,errorDes:errorDes})
        })
    }
};
export default getStrategyTragetData