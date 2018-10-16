import React, {Component} from 'react'
import * as Type from '../action/AdType'

const adState = {
    status: Type.GET_AD_DEFAULT,
    errorCode: '',
    errorDes: '',
    ads:[],

};
const AdReducer = (state = adState, action) => {
    switch (action.type) {
        case Type.GET_AD_SUCCEED:
            return {
                status: Type.GET_AD_SUCCEED,
                ads:[...action.result],
            };
        case Type.GET_AD_ING:
            return {
                ...state,
                status: Type.GET_AD_ING,
            };
        case Type.GET_AD_FAIL:
            return {
                ...state,
                status: Type.GET_AD_FAIL,
                errorCode: action.errorCode,
                errorDes: action.errorDes,
            };
        default:
            return {
                ...state,
                status: Type.GET_AD_DEFAULT,
            }
    }
};
export default AdReducer