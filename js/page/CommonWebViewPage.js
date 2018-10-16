import React, {Component} from 'react'
import {
    View,
    WebView,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native'
import * as styles from '../AppStyles'
import ShareComponent from '../component/ShareComponent'

/**
 * 通用webview页面
 */
var _this = null;
export default class CommonWebViewPage extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            uri: props.navigation.state.params.uri,
        }
    }
    componentDidMount(){
        setTimeout(function () {
            _this.refs.webView.postMessage('aaaa')
        },2000)

    }
    render() {
        return (
            <View style={[this.props.style, styles.CommonStyles.bg]}>
                <WebView ref="webView" style={{flex:1}}  source={require('../../assets/priceMap/priceMap.html')}/>
                <View style={styles.CommonStyles.line}>
                </View>
                <View style={styles.CommonWebViewStyles.navigationBg}>
                    <TouchableWithoutFeedback style={{flex:1}} onPress={this._back.bind(this)}>
                        <Image style={styles.CommonWebViewStyles.backImg}
                               source={require('../../res/img/navigition/icon_nav_back.png')}></Image>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this._showShare.bind(this)}>
                        <Image style={styles.CommonWebViewStyles.shareImg}
                               source={require('../../res/img/cms/icon_cms_share.png')}></Image>
                    </TouchableWithoutFeedback>
                </View>
                <ShareComponent ref='shareComponent'/>
            </View>
        )
    }


    _back () {
        this.props.navigation.pop()
    }
    _showShare(){
        this.refs.shareComponent._showActionSheetWithOptions((index) => {
            console.log('index = ' + index)
        })
    }
}
