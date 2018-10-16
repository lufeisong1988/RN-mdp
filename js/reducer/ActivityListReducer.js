import * as types from '../action/ActivityListType'
const activityListState = {
    type:types.GET_ACTIVITYLIST_DEFAULT,
    list:[]
}
const ActivityListReducer = (state = activityListState,action) => {
    switch (action.type){
        case types.GET_ACTIVITYLIST_ING:
            return {
                ...state,
                type:types.GET_ACTIVITYLIST_ING
            }
        case types.GET_ACTIVITYLIST_SUCCEED:
            return {
                ...state,
                list:action.result,
                type:types.GET_ACTIVITYLIST_SUCCEED
            }
        case types.GET_ACTIVITYLIST_FAIL:
            return {
                ...state,
                type:types.GET_ACTIVITYLIST_FAIL
            }
        default:
            return {
                list:[],
                type:types.GET_ACTIVITYLIST_DEFAULT
            }
    }
}
export default ActivityListReducer