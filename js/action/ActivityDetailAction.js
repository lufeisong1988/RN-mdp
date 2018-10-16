import * as types from './ActivityDetailType'
import CircleService from '../service/CircleService'

const getActivityDetailAction = (activeId, tokenId) => {
    let params = {
        'tokenId': tokenId,
        'activeId': activeId,
    }
    return (dispatch, getState) => {
        dispatch({type: types.GET_ACTIVITYDETAIL_ING})
        CircleService.getActivityDetail(params, function (result) {
            dispatch({type: types.GET_ACTIVITYDETAIL_SUCCEED,result:result.result})
        }, function (errorCode, errorDes) {
            dispatch({type: types.GET_ACTIVITYDETAIL_FAIL,errorCode:errorCode,errorDes:errorDes})
        })
    }
}

export default getActivityDetailAction