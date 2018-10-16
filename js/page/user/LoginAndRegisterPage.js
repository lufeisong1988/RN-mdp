import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'
import PagerTitleIndicator from '../../../lib/viewpager/indicator/PagerTitleIndicator'
import IndicatorViewPager from '../../../lib/viewpager/IndicatorViewPager'
import TextInputTextComponent from '../../component/user/TextInputTextComponent'
import TextInputButtonComponent from '../../component/user/TextInputButtonComponent'
import MyButtonComponent from '../../component/MyButtonComponent'
import NavigationWithDelete from '../../component/navigation/NavigationWithDelete'
import * as styles from '../../AppStyles'

import UserService from '../../service/UserService'
import SystemService from '../../service/SystemService'

import {connect} from 'react-redux'
import {initUserInfoAction,updateUserInfoAction,getUserInfoAction,clearUserInfoAction} from '../../action/UserInfoAction'
import * as UserInfoType from '../../action/UserInfoType'

import StringUtil from '../../utils/StringUtil'

let _this = null;
class LoginAndRegisterPage extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            focused: true,
            navigation:props.navigation
        }
    }

    render() {
        return (
            <NavigationWithDelete navigation={this.props.navigation}>
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <IndicatorViewPager style={{flex: 1, flexDirection: 'column-reverse', marginTop: 20}}
                                        indicator={this._renderTitleIndicator()}>
                        <View style={[styles.UserStyles.bg, {paddingTop: 0}]}>
                            <Text style={styles.UserStyles.tip}>请输入手机号和密码</Text>
                            <TextInputTextComponent ref='phoneTextInput' style={{marginTop: 20}} autoFocus={true} placeholder='手机号' keyboardType='numeric' maxLength={11}/>
                            <TextInputTextComponent ref='pswTextInput' style={{marginTop: 10}} autoFocus={false} placeholder='密码'
                                           rightText='显示'/>
                            <MyButtonComponent title='登录'
                                      onPressFunc={this._login.bind(this)}/>
                            <TouchableWithoutFeedback onPress={this._toPage.bind(this, 'pswForgetPage')}>
                                <View style={[styles.CommonStyles.centerInParent, styles.UserStyles.forgetPswTip]}>
                                    <Text style={{color: '#757A81', fontSize: 15}}>忘记密码?</Text>
                                    <Text style={{color: '#408AFF', fontSize: 15, marginLeft: 5}}></Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.UserStyles.bg, {paddingTop: 0}]}>
                            <Text style={styles.UserStyles.tip}>请输入手机号，并获取动态码</Text>
                            <TextInputTextComponent ref="countDownButton" style={{marginTop: 20}} autoFocus={true} placeholder='手机号'
                                             rightText='获取动态码'onPressFunc={this._getAuthCode.bind(this)} ></TextInputTextComponent>
                            <TextInputButtonComponent style={{marginTop: 10}} autoFocus={false} placeholder='动态码'></TextInputButtonComponent>
                            <MyButtonComponent title='下一步' onPressFunc={this._checkAuthCode.bind(this)}></MyButtonComponent>
                        </View>
                    </IndicatorViewPager>
                </View>
            </NavigationWithDelete>
        )
    }

    //渲染导航页面
    _renderTitleIndicator() {
        return <PagerTitleIndicator
            style={{height: 50, backgroundColor: 'white'}}
            itemStyle={{width: 60, alignItems: 'center', justifyContent: 'space-between', marginLeft: 20}}
            selectedItemStyle={{width: 60, alignItems: 'center', justifyContent: 'space-between', marginLeft: 20}}
            itemTextStyle={{
                color: '#757A81',
                textAlign: 'center',
                fontSize: 29,
            }}
            selectedItemTextStyle={{
                color: '#26272A',
                textAlign: 'center',
                fontSize: 29,
            }}
            selectedBorderStyle={{
                backgroundColor: '#26272A',
                height: 2,
                width: 10,
            }}
            borderStyle={{
                backgroundColor: 'white',
                height: 2,
                width: 10,
            }}
            titleParent={{
                flex: 1,
                flexDirection: 'row',
            }}
            titles={['登录', '注册']}/>;
    }

    //登录
    _login() {
        const phone = this.refs.phoneTextInput.state.text;
        const psw = this.refs.pswTextInput.state.text;
        if(!StringUtil.isPhone(phone)){
            alert('请输入正确的手机号码');
            return
        }
        if(StringUtil.isEmpty(psw)){
            alert('请输密码');
            return
        }
        let params = {
            'password': psw,
            'mobile': phone,
        };
        return UserService.login(params, function (result) {
            _this.props.onUpdateUserInfo({...result,isLogin:true});
            _this.props.navigation.pop()
        }, function (errorCode, errorDes) {
            alert('登录失败:' + errorDes)
        })

    }
    //获取验证码
    _getAuthCode(){
        let params = {
            'mobile': '15201978559',
        };
        return  SystemService.sendAutoCode(params,function (result) {
            alert('动态码发送成功，请留意查看短信')
        }, function (errorCode, errorDes) {
            let endCount = _this.refs.countDownButton.endCount
            endCount();
            alert('发送验证码失败:' + errorDes)
        })
    }
    //校验验证码
    _checkAuthCode(){
        let params = {
            'mobile': '15201978559',
            'verifyCode':'aaaa'
        };
        SystemService.checkAutoCode(params,function (result) {
            _this._toPage('pswSetPage')
        }, function (errorCode, errorDes) {
            alert('验证码验证失败:' + errorDes)
        })
    }
    //页面跳转
    _toPage(pageName){
        const {navigate} = this.state.navigation
        return navigate(pageName)
    }
}
const state = (state) => {
    return{
        userInfo:state.UserInfo
    }
};
const action = (dispatch) => {
    return {
        //更新用户信息
        onUpdateUserInfo:(userInfo) => {
            dispatch(updateUserInfoAction(userInfo))
        },
    }
};
export default connect(state,action)(LoginAndRegisterPage)
