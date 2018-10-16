import QuoteService from '../service/QuoteService'
import * as Type from './AllQuoteType'

const AllQuoteAction = (tokenId,domainId,productType,currentPage) => {

    return (dispatch, getState) => {
        dispatch({type:Type.GET_ALLQUOTE_ING});
        let params = {
            'tokenId':tokenId,
            'domainId':domainId,
            'productType':productType,
            'currentPage':currentPage,
        };
        QuoteService.getAllQuote(params,function (result) {
            dispatch({type:Type.GET_ALLQUOTE_SUCCEED,result:result.allQuote.result})
        },function (errorCode, errorDes) {
            dispatch({type:Type.GET_ALLQUOTE_FAIL,errorCode:errorCode,errorDes:errorDes})
        })
    }
};
export default AllQuoteAction