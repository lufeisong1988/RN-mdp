import React, {Component} from 'react'
import * as Type from '../action/AnalyseAreaInfoType'

const analyseAreaInfoState = {
    status: Type.GET_ANALYSEAREAINFO_DEFAULT,
    errorCode: '',
    errorDes: '',
    analyseAreaInfo:[],
};
const AnalyseAreaInfoReducer = (state = analyseAreaInfoState, action) => {
    switch (action.type) {
        case Type.GET_ANALYSEAREAINFO_SUCCEED:
            return {
                status: Type.GET_ANALYSEAREAINFO_SUCCEED,
                analyseAreaInfo:[...action.result],
            };
        case Type.GET_ANALYSEAREAINFO_ING:
            return {
                ...state,
                status: Type.GET_ANALYSEAREAINFO_ING,
            };
        case Type.GET_ANALYSEAREAINFO_FAIL:
            return {
                ...state,
                status: Type.GET_ANALYSEAREAINFO_FAIL,
                errorCode: action.errorCode,
                errorDes: action.errorDes,
            };
        default:
            return {
                ...state,
                status: Type.GET_ANALYSEAREAINFO_DEFAULT,
            }
    }
};
export default AnalyseAreaInfoReducer