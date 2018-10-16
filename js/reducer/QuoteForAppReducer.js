import React, {Component} from 'react'
import * as Type from '../action/QuoteForAppType'

const quoteForAppState = {
    status: Type.GET_QUOTE_FOR_APP_DEFAULT,
    errorCode: '',
    errorDes: '',
    quotes:[],
};
const QuoteForAppReducer = (state = quoteForAppState, action) => {
    console.log('')
    switch (action.type) {
        case Type.GET_QUOTE_FOR_APP_SUCCEED:
            return {
                status: Type.GET_QUOTE_FOR_APP_SUCCEED,
                quotes:[...action.result.quotePrice.result],
            };
        case Type.GET_QUOTE_FOR_APP_ING:
            return {
                ...state,
                status: Type.GET_QUOTE_FOR_APP_ING,
            };
        case Type.GET_QUOTE_FOR_APP_FAIL:
            return {
                ...state,
                status: Type.GET_QUOTE_FOR_APP_FAIL,
                errorCode: action.errorCode,
                errorDes: action.errorDes,
            };
        default:
            return {
                ...state,
                status: Type.GET_QUOTE_FOR_APP_DEFAULT,
            }
    }
};
export default QuoteForAppReducer