import React, {Component} from 'react'
import * as Type from '../action/NoticeType'

const noticeState = {
    status: Type.GET_NOTICE_DEFAULT,
    errorCode: '',
    errorDes: '',
    notices:[],

}
const NoticeReducer = (state = noticeState, action) => {
    switch (action.type) {
        case Type.GET_NOTICE_SUCCEED:
            return {
                status: Type.GET_NOTICE_SUCCEED,
                notices:[...action.result.noticeList],
            };
        case Type.GET_NOTICE_ING:
            return {
                ...state,
                status: Type.GET_NOTICE_ING,
            };
        case Type.GET_NOTICE_FAIL:
            return {
                ...state,
                status: Type.GET_NOTICE_FAIL,
                errorCode: action.errorCode,
                errorDes: action.errorDes,
            };
        default:
            return {
                ...state,
                status: Type.GET_NOTICE_DEFAULT,
            }
    }
};
export default NoticeReducer