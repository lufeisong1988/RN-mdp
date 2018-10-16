import * as Types from '../action/StrategyGetTragetType'
const strategyTragetState = {
    status:'',
};
const StrategyGetTragetReducer = (state = strategyTragetState,action)=>{
    switch (action.type){
        case Types.GET_STRATEGYTRAGET_ING:
            return {
                ...state,
                status:Types.GET_STRATEGYTRAGET_ING
            };
            break;
        case Types.GET_STRATEGYTRAGET_SUCCEED:
            return {
                ...state,
                ...action.result,
                status:Types.GET_STRATEGYTRAGET_SUCCEED
            };
            break;
        case Types.GET_STRATEGYTRAGET_FAIL:
            return {
                ...state,
                status:Types.GET_STRATEGYTRAGET_FAIL
            };
            break;
        default:
            return {
                ...state,
                status:Types.GET_STRATEGYTRAGET_DEFAULT
            };
            break;

    }
};
export default StrategyGetTragetReducer