import React, {Component} from 'react'
import {
    View,
    Text,
} from 'react-native'
import TextInputTextComponent from '../../component/user/TextInputTextComponent'
import MyButtonComponent from '../../component/MyButtonComponent'
import * as styles from '../../AppStyles'
import NavigationWithDelete from '../../component/navigation/NavigationWithDelete'

import UserService from '../../service/UserService'

export default class ResetPswPage extends Component {
    render() {
        return (
            <NavigationWithDelete navigation={this.props.navigation}>
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <View style={styles.UserStyles.bg}>
                        <Text style={styles.UserStyles.title}>设置新密码</Text>
                        <Text style={styles.UserStyles.tip}>密码必须6-16位，并包含字母和数字</Text>
                        <TextInputTextComponent style={{marginTop: 20}} autoFocus={true} placeholder='输入新密码'></TextInputTextComponent>
                        <TextInputTextComponent style={{marginTop: 10}} autoFocus={false} placeholder='再次输入密码'
                                       rightText='显示'></TextInputTextComponent>
                        <MyButtonComponent title='完成' onPressFunc={this._updatePsw.bind(this)}></MyButtonComponent>
                    </View>
                </View>
            </NavigationWithDelete>
        )
    }
    //更新密码
    _updatePsw(){
        let params = {
            'mobile': '15201978559',
            'verifyCode':'aaaa',
            'password':'aaaa',
        };
        UserService.updatePsw(params,function (result) {
            //跳转
            const {navigate} = this.state.navigation;
            navigate('mainPage')
        }, function (errorCode, errorDes) {
            alert('更新密码失败:' + errorDes)
        })
    }
}