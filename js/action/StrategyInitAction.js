import React,{Component} from 'react'

import * as Types from './StrategyInitType'
import StrategyService from '../service/StrategyService'
const getStrategyInitAction = (tokenId)=> {
    let params = {
        'tokenId':tokenId
    };
    return(dispatch,getState)=>{
        dispatch({type:Types.GET_STRATEGYINIT_ING});
        StrategyService.strategyInit(params,function (result) {
            dispatch({type:Types.GET_STRATEGYINIT_SUCCEED,result:result})
        }, function (errorCode, errorDes) {
            dispatch({type:Types.GET_STRATEGYINIT_FAIL,errorCode:errorCode,errorDes:errorDes})
        })
    }
};
export default getStrategyInitAction