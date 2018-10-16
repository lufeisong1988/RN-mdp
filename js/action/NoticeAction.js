import SystemService from '../service/SystemService'
import * as Type from './NoticeType'

const NoticeAction = () => {
    return (dispatch, getState) => {
        dispatch({type:Type.GET_NOTICE_ING});
        SystemService.getNotice(function (result) {
                dispatch({type:Type.GET_NOTICE_SUCCEED,result:result})
            },
            function (errorCode, errorDes) {
                dispatch({type:Type.GET_NOTICE_FAIL,errorCode:errorCode,errorDes:errorDes})
            })
    }
};
export default NoticeAction