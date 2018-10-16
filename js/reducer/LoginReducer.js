import React, {Component} from 'react'
import * as LoginType from '../action/LoginType'

const loginState = {
    status: LoginType.LOGIN_DEFAULT,
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
const LoginReducer = (state =loginState, action) => {
    switch (action.type) {
        case LoginType.LOGIN_ING:
            return {
                ...loginState,
                status:LoginType.LOGIN_ING
            };
        case LoginType.LOGIN_SUCCEED:
            return {
                ...action.result,
                status:LoginType.LOGIN_SUCCEED,
            };
        case LoginType.LOGIN_FAIL:
            return {
                ...loginState,
                status:LoginType.LOGIN_FAIL
            };
        default:
            return {
                ...loginState,
                status: LoginType.LOGIN_DEFAULT,
            }
    }
};
export default LoginReducer