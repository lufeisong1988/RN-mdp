import * as Types from '../action/StrategyGetTragetDataType'
const strategyTragetDataState = {
    status:'',
};
const StrategyGetTragetDataReducer = (state = strategyTragetDataState,action)=>{
    switch (action.type){
        case Types.GET_STRATEGYTRAGETDATA_ING:
            return {
                ...state,
                status:Types.GET_STRATEGYTRAGETDATA_ING
            };
            break;
        case Types.GET_STRATEGYTRAGETDATA_SUCCEED:
            return {
                ...state,
                ...action.result,
                status:Types.GET_STRATEGYTRAGETDATA_SUCCEED
            };
            break;
        case Types.GET_STRATEGYTRAGETDATA_FAIL:
            return {
                ...state,
                status:Types.GET_STRATEGYTRAGETDATA_FAIL
            };
            break;
        default:
            return {
                ...state,
                status:Types.GET_STRATEGYTRAGETDATA_DEFAULT
            };
            break;

    }
};
export default StrategyGetTragetDataReducer