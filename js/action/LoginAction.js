import UserService from '../service/UserService'
import * as LoginType from './LoginType'
import myGlobal from '../Global'
import * as constant from '../common/Constant'

const LoginAction = (name, password) => {
    let params = {
        'password': password,
        'mobile': name,
    };
    return (dispatch, getState) => {
        dispatch({type: LoginType.LOGIN_ING});
        UserService.login(params, function (result) {
            myGlobal.storage.save({key:constant.storageKey.userInfo,data:{...result,isLogin:true}});
            dispatch({type: LoginType.LOGIN_SUCCEED,result:result})
        }, function (errorCode, errorDes) {
            dispatch({type: LoginType.LOGIN_FAIL})
        });
    }

};

export default LoginAction