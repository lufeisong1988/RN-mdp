import {BaseService} from "./base/BaseService";
import {URL} from "../common/URL"

class StrategyService extends BaseService{
    static strategyInit(params,f1,f2){
        BaseService.basePost(URL.STRATEGYINIT_URL,params,f1,f2);
    }
    static strategyGetTraget(params,f1,f2){
        BaseService.basePost(URL.STRATEGYGETTRAGET_URL,params,f1,f2);
    }
    static strategyGetTragetData(params,f1,f2){
        BaseService.basePost(URL.STRATEGYGETTRADATA_URL,params,f1,f2);
    }
    static strategyGetPaper(params,f1,f2){
        BaseService.basePost(URL.STRATEGYPAPER_URL,params,f1,f2);
    }
}
export default StrategyService