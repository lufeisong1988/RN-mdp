import React, {Component} from 'react'
import {
    View,
    Text,

} from 'react-native'
import TextInputTextComponent from '../../../component/user/TextInputTextComponent'
import MyButtonComponent from '../../../component/MyButtonComponent'
import TableArrowComponent from '../../../component/TableArrowComponent'
import IdentityList from './../../../component/IdentityList'
import NavigationWithArrow from '../../../component/navigation/NavigationWithArrow'

export default class ActivityJoinPage extends Component {
    render() {
        return (
            <NavigationWithArrow navigation={this.props.navigation} middleChild={this._renderMidChild()}>
                <View style={{flex: 1, padding: 20}}>
                    <Text style={{color: '#26272A', fontSize: 17}}>请选择身份</Text>
                    <TableArrowComponent onPressFunc={this._showIdentity} tableTitle="饲料厂" style={{marginTop: 20, height: 50}}/>
                    <Text style={{color: '#26272A', fontSize: 17, marginTop: 20}}>请输入姓名</Text>
                    <TextInputTextComponent placeholder="姓名" autoFocus={true} style={{marginTop: 20}}/>
                    <Text style={{color: '#26272A', fontSize: 17, marginTop: 20}}>请输入手机号</Text>
                    <TextInputTextComponent placeholder="手机号" autoFocus={false} style={{marginTop: 20}}/>
                    <MyButtonComponent title="报名"/>
                    <IdentityList/>
                </View>
            </NavigationWithArrow>
        )
    }

    _showIdentity() {
        return IdentityList.showActionSheetWithOptions({
            options: ['雪碧', '可口可乐', '脉动', '芬达', '不喜欢喝饮料'],
            destructiveButtonIndex: 3,
        }, (index) => {
            console.log('index = ' + index)
        })
    }

    _hideIdentity() {
        IdentityList.hide()
    }

    _renderMidChild = () => {
        return (
            <Text style={{color: '#26272A', fontSize: 15}}>活动详情</Text>
        )
    }
}