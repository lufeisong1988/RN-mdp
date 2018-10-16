import QuoteService from '../service/QuoteService'
import * as Type from './AnalyseAreaInfoType'

const AnalyseAreaInfoAction = () => {

    return (dispatch, getState) => {
        dispatch({type:Type.GET_ANALYSEAREAINFO_ING});
        QuoteService.getAreaInfo(function (result) {
            dispatch({type:Type.GET_ANALYSEAREAINFO_SUCCEED,result:result})
        },function (errorCode, errorDes) {
            dispatch({type:Type.GET_ANALYSEAREAINFO_FAIL,errorCode:errorCode,errorDes:errorDes})
        })
    }
};
export default AnalyseAreaInfoAction