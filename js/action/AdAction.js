import SystemService from '../service/SystemService'
import * as Type from './AdType'

const AdAction = () => {
    return (dispatch, getState) => {
        dispatch({type:Type.GET_AD_ING});
        SystemService.getAd(function (result) {
                dispatch({type:Type.GET_AD_SUCCEED,result:result})
            },
            function (errorCode, errorDes) {
                dispatch({type:Type.GET_AD_FAIL,errorCode:errorCode,errorDes:errorDes})
            })
    }
};
export default AdAction