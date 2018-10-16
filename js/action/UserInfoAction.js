import * as types from './UserInfoType'

const initUserInfoAction = (userInfo) => {
    return {type:types.INIT_USER_INFO,result:userInfo}
};
const updateUserInfoAction = (userInfo) => {
    return {type:types.UPDATE_USER_INFO,result:userInfo}
};
const getUserInfoAction = () => {
    return {type:types.GET_USER_INFO}
};
const clearUserInfoAction = () => {
    return {type:types.CLEAR_USER_INFO}
};
export {initUserInfoAction,updateUserInfoAction,getUserInfoAction,clearUserInfoAction}