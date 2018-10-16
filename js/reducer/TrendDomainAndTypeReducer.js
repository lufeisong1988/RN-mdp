import React, {Component} from 'react'
import * as Type from '../action/TrendDomainAndType'

const trendDomainAndTypeState = {
    status: Type.GET_TRENDDOMAINANDTYPE_DEFAULT,
    errorCode: '',
    errorDes: '',
    domainAndType:{
        domains:[],
        productType:[]
    },
};
const TrendDomainAndTypeReducer = (state = trendDomainAndTypeState, action) => {
    switch (action.type) {
        case Type.GET_TRENDDOMAINANDTYPE_SUCCEED:
            return {
                status: Type.GET_TRENDDOMAINANDTYPE_SUCCEED,
                domainAndType:action.result,
            };
        case Type.GET_TRENDDOMAINANDTYPE_ING:
            return {
                ...state,
                status: Type.GET_TRENDDOMAINANDTYPE_ING,
            };
        case Type.GET_TRENDDOMAINANDTYPE_FAIL:
            return {
                ...state,
                status: Type.GET_TRENDDOMAINANDTYPE_FAIL,
                errorCode: action.errorCode,
                errorDes: action.errorDes,
            };
        default:
            return {
                ...state,
                status: Type.GET_TRENDDOMAINANDTYPE_DEFAULT,
            }
    }
};
export default TrendDomainAndTypeReducer