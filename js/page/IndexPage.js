import React, {Component} from 'react'
import {Image} from 'react-native'
import {connect} from 'react-redux'
import myGlobal from '../Global'
import * as constant from '../common/Constant'
import {initUserInfoAction} from '../action/UserInfoAction'

/**
 * app首页
 * debug模式下，会导致setTimeout延迟很久
 */
let _this = null;
class IndexPage extends Component {
    constructor(){
        super();
        _this = this
    }
    render() {
        const {navigate} = this.props.navigation;
        this._initData();
        this._goTo(navigate);
        return (
            <Image source={require('../../res/img/SplashScreen.png')}></Image>
        )
    }

    /**
     * 初始化数据
     * @private
     */
    _initData(){
        myGlobal.storage.load({key:constant.storageKey.userInfo},function (userInfo) {
            _this.props.onInitUserInfo && _this.props.onInitUserInfo(userInfo)
        })
    }
    /**
     * 跳转
     * @param navigate
     * @private
     */
    _goTo(navigate) {
        myGlobal.storage.load({key: constant.storageKey.appIsFirstOpen}, function (appIsFirstOpen) {
            setTimeout(function () {
                if (appIsFirstOpen) {
                    // 跳转到引导页面
                    navigate('guidancePage');
                    // 缓存app是否第一次打开状态
                    myGlobal.storage.save({key: constant.storageKey.appIsFirstOpen, data: false})
                } else {
                //     //跳转到主页
                    navigate('mainPage')
                }
            }, 2000)
        })
    }
}
const state = (state)=>{
    return{

    }
};
const dispatch = (dispatch)=>{
    return{
        onInitUserInfo:(userInfo)=>{
            dispatch(initUserInfoAction(userInfo))
        }
    }
};
export default connect(state,dispatch)(IndexPage)

