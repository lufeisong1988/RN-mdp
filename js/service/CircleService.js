import {BaseService} from "./base/BaseService";
import {URL} from "../common/URL"

class CircleService extends BaseService{

    static getActivityList(params,f1,f2){
        BaseService.basePost(URL.ACTIVITY_LIST_URL,params,f1,f2);
    }
    static getActivityDetail(params,f1,f2){
        BaseService.basePost(URL.ACTIVITY_DETAIL_URL,params,f1,f2);
    }
}
export default CircleService