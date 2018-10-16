import * as Types from '../action/StrategyInitType'
const strategyInitState = {
    status:Types.GET_STRATEGYINIT_DEFAULT,
    spotFolderList:[],
    auths:[],
};
const StrategyInitReducer = (state = strategyInitState,action)=>{
  switch (action.type){
      case Types.GET_STRATEGYINIT_ING:
          return {
              ...state,
              status:Types.GET_STRATEGYINIT_ING
          };
          break;
      case Types.GET_STRATEGYINIT_SUCCEED:
          return {
              spotFolderList:action.result.spotFolderList,
              auths:action.result.auths,
              status:Types.GET_STRATEGYINIT_SUCCEED
          };
          break;
      case Types.GET_STRATEGYINIT_FAIL:
          return {
              ...state,
              status:Types.GET_STRATEGYINIT_FAIL
          };
          break;
      default:
          return {
              ...state,
              status:Types.GET_STRATEGYINIT_DEFAULT
          };
          break;
  }
};
export default StrategyInitReducer