import {BaseService} from "./base/BaseService";
import {URL} from "../common/URL"

class QuoteService extends BaseService{
    static getQuoteForApp(f1,f2){
        BaseService.basePost(URL.QUOTE_FOR_APP_URL,null,f1,f2);
    }
    static getDomainsAndType(params,f1,f2){
        BaseService.basePost(URL.DOMAINS_AND_TYPE_URL,params,f1,f2);
    }
    static getAllQuote(params,f1,f2){
        BaseService.basePost(URL.ALL_QUOTE_URL,params,f1,f2);
    }
    static getAreaInfo(f1,f2){
        BaseService.basePost(URL.AREA_INFO_URL,null,f1,f2);
    }
    static getQuoteList(params,f1,f2){
        BaseService.basePost(URL.QUOTE_LIST_URL,params,f1,f2);
    }
}
export default QuoteService