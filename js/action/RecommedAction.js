import SystemService from '../service/SystemService'
import * as Type from './RecommendType'

const RecommendAction = () => {
    return (dispatch, getState) => {
        dispatch({type:Type.GET_RECOMMEND_ING});
        SystemService.getRecommedn(function (result) {
                dispatch({type:Type.GET_RECOMMEND_SUCCEED,result:result})
            },
            function (errorCode, errorDes) {
                dispatch({type:Type.GET_RECOMMEND_FAIL,errorCode:errorCode,errorDes:errorDes})
            })
    }
};
export default RecommendAction