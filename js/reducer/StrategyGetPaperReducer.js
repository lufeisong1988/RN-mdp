import * as Types from '../action/StrategyGetPaperType'
const strategyPaperState = {
    status:'',
};
const StrategyGetPaperReducer = (state = strategyPaperState,action)=>{
    switch (action.type){
        case Types.GET_STRATEGYPAPER_ING:
            return {
                ...state,
                status:Types.GET_STRATEGYPAPER_ING
            };
            break;
        case Types.GET_STRATEGYPAPER_SUCCEED:
            return {
                ...state,
                ...action.result,
                status:Types.GET_STRATEGYPAPER_SUCCEED
            };
            break;
        case Types.GET_STRATEGYPAPER_FAIL:
            return {
                ...state,
                status:Types.GET_STRATEGYPAPER_FAIL
            };
            break;
        default:
            return {
                ...state,
                status:Types.GET_STRATEGYPAPER_DEFAULT
            };
            break;

    }
};
export default StrategyGetPaperReducer