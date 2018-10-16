import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import * as styles from '../../AppStyles'
import TableTextComponent from '../../component/TableTextComponent'
import TableImageComponent from '../../component/TableImageComponent'
import NavigationWithDelete from '../../component/navigation/NavigationWithDelete'

export default class UserSettingPage extends Component {

    render() {
        const {navigate} = this.props.navigation
        return (
            <NavigationWithDelete navigation={this.props.navigation}>
                <View style={styles.UserStyles.bg}>
                    <Text style={styles.UserStyles.title}>个人资料</Text>
                    <Text style={styles.UserStyles.tip}>为了给您提供更具个性化的服务，请完善您的个人资料</Text>
                    <View style={[styles.CommonStyles.line, {marginTop: 20}]}/>
                    <TableImageComponent tableTitle="我的头像" style={{height: 102}}
                                image={require('../../../res/img/icon/icon_default_head.png')}/>
                    <View style={[styles.CommonStyles.line]}/>
                    <TableTextComponent style={{height: 55}} tableTitle='我的昵称' info='请填写' tableTip='(必填)' onPressFunc={this._toUserSettingNamePage.bind(this,navigate)}></TableTextComponent>
                    <View style={[styles.CommonStyles.line]}/>
                    <TableTextComponent style={{height: 55}} tableTitle='个人简介' info='请填写' onPressFunc={this._toUserSettingIntroPage.bind(this,navigate)}></TableTextComponent>
                    <View style={[styles.CommonStyles.line]}/>
                </View>
            </NavigationWithDelete>
        )
    }
    _toUserSettingIntroPage(navigate){
        return navigate('userSettingIntroPage')
    }
    _toUserSettingNamePage(navigate){
        return navigate('userSettingNamePage')
    }
}
