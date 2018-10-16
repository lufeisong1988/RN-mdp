import React, {Component} from 'react'
import {
    View,
    WebView,
    Image,
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native'

/**
 * webview，内容详情组件
 *
 */
export default class TrendDetailComponent extends Component {

    render() {
        return (
            <View style={[this.props.style,{flex: 1}]}>
                <View style={styles.webViewBg}>
                    <WebView style={styles.webViewBg} source={require('../../../assets/strategy/index.html')}/>
                </View>
                <View style={styles.contentBg}>
                    <Image style={styles.waterMark}
                           source={require('../../../res/img/strategy/watermark.png')}/>
                    <View style={styles.content}>
                        <ScrollView style={styles.contentScrollView}>
                            <Text style={styles.contentText}>套利策略：5月豆菜粕逢低建仓，加大波动操作;近期5月菜粕价格表现偏强，豆菜粕价差回落至460-470，菜粕现货压力较大，后期若豆菜粕现货价差维持在目前水平，菜粕压力会依然较大，建议逢低建仓套利策略：5月豆菜粕逢低建仓，加大波动操作;近期5月菜粕价格表现偏强，豆菜粕价差回落至460-470，菜粕现货压力较大，后期若豆菜粕现货价差维持在目前水平，菜粕压力会依然较大，建议逢低建仓。</Text>
                        </ScrollView>
                        <View style={styles.tipBg}>
                            <Text style={styles.tipText}>本预测仅供参考，不为任何投资行为负责。</Text>
                            <Image style={styles.tipImage}
                                   source={require('../../../res/img/strategy/maidoupo_logo.png')}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    webViewBg:{
        height: 188,
        margin: 10,
    },
    contentBg:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    waterMark:{
        width: 355,
        height: 203,
    },
    content:{
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        position: 'absolute',
        justifyContent: 'space-between'
    },
    contentScrollView:{
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentText:{
        fontSize: 17,
        color: '#26272A',
    },
    tipBg:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 20,
    },
    tipText:{
        fontSize: 12,
        color: '#9FA4AB',
    },
    tipImage:{
        width: 47,
        height: 12,
    }
});