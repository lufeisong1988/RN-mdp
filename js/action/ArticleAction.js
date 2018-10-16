import CmsService from '../service/CmsService'
import * as Type from './ArticleType'

const ArticleAction = (folderId,currentPage,tokenId) => {
    let params = {
        'folderId': folderId,
        'currentPage': currentPage,
        'tokenId': tokenId,
    }
    return (dispatch, getState) => {
        dispatch({type:Type.GET_ARTICLE_ING});
        // CmsService.getArticles(params,function (result) {
        //         dispatch({type:Type.GET_ARTICLE_SUCCEED,result:result})
        //     },
        //     function (errorCode, errorDes) {
        //         dispatch({type:Type.GET_ARTICLE_FAIL,errorCode:errorCode,errorDes:errorDes})
        //     })
    }
};
export default ArticleAction