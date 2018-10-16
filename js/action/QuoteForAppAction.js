import QuoteService from '../service/QuoteService'
import * as Type from './QuoteForAppType'

const QuoteForAppAction = () => {
    return (dispatch, getState) => {
        dispatch({type:Type.GET_QUOTE_FOR_APP_ING});
        QuoteService.getQuoteForApp(function (result) {
                dispatch({type:Type.GET_QUOTE_FOR_APP_SUCCEED,result:result})
            },
            function (errorCode, errorDes) {
                dispatch({type:Type.GET_QUOTE_FOR_APP_FAIL,errorCode:errorCode,errorDes:errorDes})
            })
    }
};
export default QuoteForAppAction