import React,{Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from 'react-redux'
import LoginAction from '../action/LoginAction'
import myGlobal from '../Global'
import * as constant from '../common/Constant'
class LoginPage extends Component{

    _login(name,password){
        if(this.props.onLogin){
            this.props.onLogin(name,password)
        }
    }
    _getUserInfo(){
        myGlobal.storage.load({key:constant.storageKey.userInfo},function (userInfo) {

            // this.setState({
            //     id: '22'
            // })
        })

    }
    render(){
        return(
            <View style={{marginTop:50,marginLeft:50}}>
                <Text onPress={() => this._login('15201978559','cc123456')}>login</Text>
                <Text >{this.props.id}</Text>
                <Text onPress={() => this._getUserInfo()} >获取数据</Text>
                <Text >{this.props.status}</Text>
            </View>
        )
    }
}

const loginState = (state) => {
    return{
        status:state.status,
        id:state.id
    }
}
const loginDispatch = (dispatch) => {
    return {
        onLogin:(name,password) => {
            dispatch(LoginAction(name,password))
        }
    }
}
export default connect(loginState,loginDispatch)(LoginPage)
