import React, {Component} from 'react'
import * as Type from '../action/AnalyseQuoteListType'

const analyseQuoteListState = {
    status: Type.GET_QUOTELIST_DEFAULT,
    errorCode: '',
    errorDes: '',
    analyseQuoteList:[],
};
const AnalyseLocationReducer = (state = analyseQuoteListState, action) => {
    switch (action.type) {
        case Type.GET_QUOTELIST_SUCCEED:
            return {
                status: Type.GET_QUOTELIST_SUCCEED,
                analyseQuoteList:[...action.result],
            };
        case Type.GET_QUOTELIST_ING:
            return {
                ...state,
                status: Type.GET_QUOTELIST_ING,
            };
        case Type.GET_QUOTELIST_FAIL:
            return {
                ...state,
                status: Type.GET_QUOTELIST_FAIL,
                errorCode: action.errorCode,
                errorDes: action.errorDes,
            };
        default:
            return {
                ...state,
                status: Type.GET_QUOTELIST_DEFAULT,
            }
    }
};
export default AnalyseLocationReducer