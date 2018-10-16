import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'
import TextInputTextComponent from '../../component/user/TextInputTextComponent'
import * as styles from '../../AppStyles'
import NavigationWithArrow from '../../component/navigation/NavigationWithArrow'

import {connect} from 'react-redux'
import * as UserInfoAction from '../../action/UserInfoAction'

import UserService from '../../service/UserService'

var _this = null;
class UserSettingNamePage extends Component {
    constructor(props){
        super(props)
        _this = this;
    }
    render() {
        return (
            <NavigationWithArrow navigation={this.props.navigation} rightChild={this._renderRightChild()}>
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <View style={styles.UserStyles.bg}>
                        <Text style={styles.UserStyles.title}>我的昵称</Text>
                        <TextInputTextComponent style={{marginTop: 20}} autoFocus={true} placeholder='输入昵称'></TextInputTextComponent>
                        <View style={[styles.UserStyles.rightNumberTextBg]}>
                            <Text style={[styles.UserStyles.rightNumberText]}>0/12</Text>
                        </View>
                    </View>
                </View>
            </NavigationWithArrow>
        )
    }
    //更新昵称
    _updateNickName(){
        let params = {
            'nickName':'react-native',
            'portraitId':'',
            'intro':'',
            'tokenId':'dd97e63491a225d3b9c4bd867194a79b',
        }
        UserService.updateUserInfo(params,function (result) {
            _this.props.onUpdateUserInfo({'nickName':result.nickName})
            alert('更新昵称成功')
        }, function (errorCode, errorDes) {
            alert('更新昵称失败:' + errorDes)
        })
    }
    //渲染状态栏右侧按钮
    _renderRightChild = () => {
        return(
            <TouchableWithoutFeedback onPress={_this._updateNickName.bind(this)}>
                <Text style={{ fontSize: 15, color: '#408AFF',}}>保存</Text>
            </TouchableWithoutFeedback>
        )
    }
}

const state = (state) => {
    return{
        userInfo:state.UserInfo
    }
};
const action = (dispatch) => {
    return {
        onUpdateUserInfo:(userInfo) => {
            dispatch(UserInfoAction.updateUserInfoAction(userInfo))
        },
    }
};
export default connect(state,action)(UserSettingNamePage)