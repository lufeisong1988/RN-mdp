import * as types from './ActivityListType'
import CircleService from '../service/CircleService'

const getActivityListAction = (pageSize, pageNum) => {
    let params = {
        'pageSize': pageSize,
        'pageNum': pageNum,
    }
    return (dispatch, getState) => {
        dispatch({type: types.GET_ACTIVITYLIST_ING})
        CircleService.getActivityList(params, function (result) {
            dispatch({type: types.GET_ACTIVITYLIST_SUCCEED,result:result.result})
        }, function (errorCode, errorDes) {
            dispatch({type: types.GET_ACTIVITYLIST_FAIL,errorCode:errorCode,errorDes:errorDes})
        })
    }
}

export default getActivityListAction