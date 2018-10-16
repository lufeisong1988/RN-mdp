import {BaseService} from "./base/BaseService";
import {URL} from "../common/URL"

class CmsService extends BaseService{
    static getArticles(folderId,name,params,f1,f2){
        BaseService.basePost(URL.ARTICLE_URL,params,function (result) {
            f1(folderId,name,result)
        },f2);
    }
    static getInfoTab(f1,f2){
        BaseService.basePost(URL.INFO_TAB_URL,null,f1,f2);
    }

}
export default CmsService