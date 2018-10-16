import {BaseService} from "./base/BaseService";
import {URL} from "../common/URL"

class SystemService extends BaseService{
    static getAd(f1,f2){
        BaseService.basePost(URL.AD_URL,null,f1,f2);
    }
    static getNotice(f1,f2){
        BaseService.basePost(URL.NOTICE_URL,null,f1,f2);
    }
    static getRecommedn(f1,f2){
        BaseService.basePost(URL.RECOMMEDN_URL,null,f1,f2);
    }
    static sendAutoCode(params,f1,f2){
        BaseService.basePost(URL.SEND_AUTHCODE_URL,params,f1,f2);
    }
    static checkAutoCode(params,f1,f2){
        BaseService.basePost(URL.CHECK_AUTHCODE_URL,params,f1,f2);
    }
}
export default SystemService