import React, {Component} from 'react'
import {
    View,
    Text,
} from 'react-native'
import TextInputTextComponent from '../../component/user/TextInputTextComponent'
import MyButtonComponent from '../../component/MyButtonComponent'
import * as styles from '../../AppStyles'
import NavigationWithDelete from '../../component/navigation/NavigationWithDelete'

import * as UserInfoAction from '../../action/UserInfoAction'
import {connect} from 'react-redux'

import UserService from '../../service/UserService'
class PswSetPage extends Component {
    constructor(porps){
        super(porps)
        this.state = {
            navigation:this.props.navigation
        }
    }
    render() {

        return (
            <NavigationWithDelete navigation={this.props.navigation}>
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <View style={styles.UserStyles.bg}>
                        <Text style={styles.UserStyles.title}>设置登录密码</Text>
                        <Text style={styles.UserStyles.tip}>密码必须6-16位，并包含字母和数字</Text>
                        <TextInputTextComponent style={{marginTop: 20}} autoFocus={true} placeholder='输入密码'></TextInputTextComponent>
                        <TextInputTextComponent style={{marginTop: 10}} autoFocus={false} placeholder='再次输入密码'
                                       rightText='显示'></TextInputTextComponent>
                        <MyButtonComponent title='下一步' onPressFunc={this._register.bind(this)}></MyButtonComponent>
                    </View>
                </View>
            </NavigationWithDelete>
        )
    }
    //注册
    _register(){
        let params = {
            'mobile': '15201978559',
            'verifyCode':'aaaa',
            'password':'aaaa',
        };
        UserService.register(params,function (result) {
            //更新用户信息
            this.props.onUpdateUserInfo(result);
            //跳转
            const {navigate} = this.state.navigation;
            navigate('mainPage')
        }, function (errorCode, errorDes) {
            alert('注册失败:' + errorDes)
        })
    }
}
const state = (state) => {
    return{
        userInfo:state.UserInfo
    }
}
const action = (dispatch) =>{
    return{
        onUpdateUserInfo:(userInfo) => {
            dispatch(UserInfoAction.updateUserInfoAction(userInfo))
        }

    }
}
export default connect(state,action)(PswSetPage)