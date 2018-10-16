import React, {Component} from 'react'
import * as Type from '../action/ArticleType'

const articleState = {
    status: Type.GET_ARTICLE_DEFAULT,
    errorCode: '',
    errorDes: '',
    articles:[],
};
const ArticleReducer = (state = articleState, action) => {
    switch (action.type) {
        case Type.GET_ARTICLE_SUCCEED:
            return {
                status: Type.GET_ARTICLE_SUCCEED,
                articles:[...action.result],
            };
        case Type.GET_ARTICLE_ING:
            return {
                ...state,
                status: Type.GET_ARTICLE_ING,
            };
        case Type.GET_ARTICLE_FAIL:
            return {
                ...state,
                status: Type.GET_ARTICLE_FAIL,
                errorCode: action.errorCode,
                errorDes: action.errorDes,
            };
        default:
            return {
                ...state,
                status: Type.GET_ARTICLE_DEFAULT,
            }
    }
};
export default ArticleReducer