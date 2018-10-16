import StrategyService from '../service/StrategyService'
import * as Types from './StrategyGetPaperType'
const getStrategyPaper = (date,folderId,tokenId) =>{
    let params = {
        'date':date,
        'folderId':folderId,
        'tokenId':tokenId,
    };
    return(dispatch,getState)=>{
        dispatch({type:Types.GET_STRATEGYPAPER_ING});
        StrategyService.strategyGetPaper(params,function (result) {
            dispatch({type:Types.GET_STRATEGYPAPER_SUCCEED,result:result});
        }, function (errorCode, errorDes) {
            dispatch({type:Types.GET_STRATEGYPAPER_FAIL,errorCode:errorCode,errorDes:errorDes})
        })
    }
};
export default getStrategyPaper