import React, {Component} from 'react'
import {
    WebView,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native'

import * as styles from '../../AppStyles'

import {getUserInfoAction} from '../../action/UserInfoAction'
import * as UserInfoType from '../../action/UserInfoType'
import {connect} from 'react-redux'
/**
 * 报价地图
 */
var _this = null;
class QuoteMapFragment extends Component {
    constructor(){
        super();
        _this = this;
    }
    componentDidMount(){
        this.props.onGetUserInfo && this.props.onGetUserInfo()
    }
    render() {
        return (
            <View style={styles.QuoteMapStyles.flexBg}>
                <View style={styles.CommonStyles.line}/>
                <WebView ref="webView" style={styles.QuoteMapStyles.flexBg} source={require('../../../assets/priceMap/priceMap.html')}/>
                <TouchableWithoutFeedback onPress={this._onPressRefresh.bind(this)}>
                    <Image style={styles.QuoteMapStyles.refreshImg}
                           source={require('../../../res/img/icon_floatbtn_refresh.png')}/>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    _onPressRefresh(){
        this.props.onGetUserInfo && this.props.onGetUserInfo()
    };
}
const state=(state)=>{
    if(state.UserInfo.status == UserInfoType.UPDATE_USER_INFO || state.UserInfo.status == UserInfoType.GET_USER_INFO){
        _this.refs.webView.postMessage(state.UserInfo.tokenId)
    }
    return{

    }
};
const dispatch=(dispatch)=>{
    return{
        onGetUserInfo:()=>{
            dispatch(getUserInfoAction())
        }
    }
};
export default connect(state,dispatch,null,{withRef:true})(QuoteMapFragment)