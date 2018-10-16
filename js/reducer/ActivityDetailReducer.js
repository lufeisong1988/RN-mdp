import * as types from '../action/ActivityDetailType'
const activityDetailState = {
    detail:{}
}
const ActivityDetailReducer = (state = activityDetailState,action) => {
    switch (action.type){
        case types.GET_ACTIVITYDETAIL_ING:
            return {
                ...state
            }
        case types.GET_ACTIVITYDETAIL_SUCCEED:
            return {
                ...state,
                detail:action.result,
            }
        case types.GET_ACTIVITYDETAIL_FAIL:
            return {
                ...state
            }
        default:
            return {
                detail:{}
            }
    }
}
export default ActivityDetailReducer