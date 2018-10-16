import React, {Component} from 'react'
import * as Type from '../action/AllQuoteType'

const allQuoteState = {
    status: Type.GET_ALLQUOTE_DEFAULT,
    errorCode: '',
    errorDes: '',
    allQuote:[],
};
const AllQuoteReducer = (state = allQuoteState, action) => {
    switch (action.type) {
        case Type.GET_ALLQUOTE_SUCCEED:
            return {
                status: Type.GET_ALLQUOTE_SUCCEED,
                allQuote:[...action.result],
            };
        case Type.GET_ALLQUOTE_ING:
            return {
                ...state,
                status: Type.GET_ALLQUOTE_ING,
            };
        case Type.GET_ALLQUOTE_FAIL:
            return {
                ...state,
                status: Type.GET_ALLQUOTE_FAIL,
                errorCode: action.errorCode,
                errorDes: action.errorDes,
            };
        default:
            return {
                ...state,
                status: Type.GET_ALLQUOTE_DEFAULT,
            }
    }
};
export default AllQuoteReducer