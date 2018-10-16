import QuoteService from '../service/QuoteService'
import * as Type from './AnalyseQuoteListType'

const AnalyseQuoteListAction = (areaId,pageNum,pageSize) => {

    return (dispatch, getState) => {
        let params = {
            'areaId':areaId,
            'pageNum':pageNum,
            'pageSize':pageSize,
        }
        dispatch({type:Type.GET_QUOTELIST_ING});
        QuoteService.getQuoteList(params,function (result) {
            dispatch({type:Type.GET_QUOTELIST_SUCCEED,result:result})
        },function (errorCode, errorDes) {
            dispatch({type:Type.GET_QUOTELIST_FAIL,errorCode:errorCode,errorDes:errorDes})
        })
    }
};
export default AnalyseQuoteListAction