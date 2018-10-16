import {BaseService} from "./base/BaseService";
import {URL} from "../common/URL"

class UserService extends BaseService{
    static login(params,f1,f2){
        BaseService.basePost(URL.LOGIN_URL,params,f1,f2);
    }
    static register(params,f1,f2){
        BaseService.basePost(URL.REGISTER_URL,params,f1,f2);
    }
    static updatePsw(params,f1,f2){
        BaseService.basePost(URL.UPDATE_PSW_URL,params,f1,f2);
    }
    static updateUserInfo(params,f1,f2){
        BaseService.basePost(URL.UPDATE_USERINFO_URL,params,f1,f2);
    }
}
export default UserService