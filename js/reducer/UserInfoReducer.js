import * as types from '../action/UserInfoType'

import myGlobal from '../Global'
import * as constant from '../common/Constant'
const userInfoState = {
    status:types.INIT_USER_INFO,
    isLogin:false,
    id:"",
    name:"",
    type:"",
    typeName:"",
    mobile:"",
    account:"",
    tokenId:"",
    enterId:"",
    enterName:"",
    enterStatus:"",
    enterType:"",
    enterTypeName:"",
    isBuyer:"",
    bankSignStatus:"",
    payChannels:[],
    payPassword:"",
    isContracted:"",
    buyerInformation:"",
    sellerInformation:"",
    grade:"",
    gradeName:"",
    gradeEndTime:"",
    gradePic:"",
    imToken:"",
    serviceLevel:"",
    counselorStatus:"",
    serviceStatus:"",
    nickName:"",
    intro:"",
    portraitUrl:"",
    hasPublishPermission:""
};

const UserInfoReducer = (state = userInfoState,action) => {
    switch (action.type){
        case types.INIT_USER_INFO:
            console.log('initUserInfo tokenId = ' + state.tokenId);
            return {
                ...state,
                ...action.result,
                status:types.INIT_USER_INFO,
            };
        case types.GET_USER_INFO:
            console.log('getUserInfo tokenId = ' + state.tokenId);
            return {
                ...state,
                status:types.GET_USER_INFO,
            };
        case types.UPDATE_USER_INFO:
            console.log('updateUserInfo tokenId = ' + state.tokenId);
            let userInfo = {
                ...state,
                ...action.result,
            };
            myGlobal.storage.save({key: constant.storageKey.userInfo, data: userInfo});
            return { ...state, ...action.result,status:types.UPDATE_USER_INFO};
        case types.CLEAR_USER_INFO:
            return {
                isLogin:false,
                id:"",
                name:"",
                type:"",
                typeName:"",
                mobile:"",
                account:"",
                tokenId:"",
                enterId:"",
                enterName:"",
                enterStatus:"",
                enterType:"",
                enterTypeName:"",
                isBuyer:"",
                bankSignStatus:"",
                payChannels:[],
                payPassword:"",
                isContracted:"",
                buyerInformation:"",
                sellerInformation:"",
                grade:"",
                gradeName:"",
                gradeEndTime:"",
                gradePic:"",
                imToken:"",
                serviceLevel:"",
                counselorStatus:"",
                serviceStatus:"",
                nickName:"",
                intro:"",
                portraitUrl:"",
                hasPublishPermission:"",
                status:types.CLEAR_USER_INFO,
            };
        default:
            return{
                ...state,
                status:types.INIT_USER_INFO,
            }
    }
};
export default UserInfoReducer