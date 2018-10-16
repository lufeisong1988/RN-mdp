import React, {Component} from 'react'
import * as Type from '../action/RecommendType'

const recommendState = {
    status: Type.GET_RECOMMEND_DEFAULT,
    errorCode: '',
    errorDes: '',
    recommends:[],
};
const RecommendReducer = (state = recommendState, action) => {
    switch (action.type) {
        case Type.GET_RECOMMEND_SUCCEED:
            return {
                status: Type.GET_RECOMMEND_SUCCEED,
                recommends:[...action.result.recommendationList],
            };
        case Type.GET_RECOMMEND_ING:
            return {
                ...state,
                status: Type.GET_RECOMMEND_ING,
            };
        case Type.GET_RECOMMEND_FAIL:
            return {
                ...state,
                status: Type.GET_RECOMMEND_FAIL,
                errorCode: action.errorCode,
                errorDes: action.errorDes,
            };
        default:
            return {
                ...state,
                status: Type.GET_RECOMMEND_DEFAULT,
            }
    }
};
export default RecommendReducer