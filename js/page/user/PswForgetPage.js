import React, {Component} from 'react'
import {
    View,
    Text,
} from 'react-native'
import TextInputTextComponent from '../../component/user/TextInputTextComponent'
import TextInputButtonComponent from '../../component/user/TextInputButtonComponent'
import MyButtonComponent from '../../component/MyButtonComponent'
import * as styles from '../../AppStyles'
import NavigationWithDelete from '../../component/navigation/NavigationWithDelete'

export default class ForgetPswPage extends Component {
    render() {
        const {navigate} = this.props.navigation
        return (
            <NavigationWithDelete navigation={this.props.navigation}>
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <View style={styles.UserStyles.bg}>
                        <Text style={styles.UserStyles.title}>找回密码</Text>
                        <Text style={styles.UserStyles.tip}>请输入手机号，并获取动态码</Text>
                        <TextInputTextComponent style={{marginTop: 20}} autoFocus={true} placeholder='手机号'
                                         rightText='获取动态码'></TextInputTextComponent>
                        <TextInputTextComponent style={{marginTop: 10}} autoFocus={false} placeholder='动态码'></TextInputTextComponent>
                        <MyButtonComponent title='下一步' onPressFunc={this._toPswResetPage.bind(this,navigate)}></MyButtonComponent>
                    </View>
                </View>
            </NavigationWithDelete>
        )
    }
    _toPswResetPage(navigate){
       return navigate('pswResetPage')
    }
}