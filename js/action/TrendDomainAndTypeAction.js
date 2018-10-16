import QuoteService from '../service/QuoteService'
import * as Type from './TrendDomainAndType'

const TrendDomainAndTypeAction = () => {
    return (dispatch, getState) => {
        dispatch({type:Type.GET_TRENDDOMAINANDTYPE_ING});
        let params = {
            'tokenId':''
        };
        QuoteService.getDomainsAndType(params,function (result) {
            dispatch({type:Type.GET_TRENDDOMAINANDTYPE_SUCCEED,result:result})
        },function (errorCode, errorDes) {
            dispatch({type:Type.GET_TRENDDOMAINANDTYPE_FAIL,errorCode:errorCode,errorDes:errorDes})
        })
    }
};
export default TrendDomainAndTypeAction