import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native'
import CollapsibleTextComponent from '../CollapsibleTextComponent'
import ViewPager from '../../../lib/vhviewpager/ViewPager'

/**
 * 成交分析
 * 列表item
 */
const screenWidth = Dimensions.get('window').width
export default class CmsItemComponent extends Component {
    render() {
        return (
            <View style={styles.bg}>
                <View style={styles.square}/>
                <Text style={styles.locationText}>东北</Text>
                <View style={styles.rightBg}>
                    <CollapsibleTextComponent lines={3} style={styles.detailText}
                                              title='小程序如何区分和实现转发好友和转发群的功能前言群内隔段时间就有同学问小程序的转发是否可以区分转发给好友还是转发给微信群今天给大家说说如'/>
                    <View style={styles.reviewBg}>
                        <Image style={styles.reviewImg}
                               source={require('../../../res/img/cms/icon_cms_review.png')}/>
                        <Text style={styles.reviewText}>查看详情</Text>
                    </View>

                    <View style={styles.linkBg}>
                        <CollapsibleTextComponent lines={2} style={styles.detailText}
                                                  title='小程序如何区分和实现转发好友和转发群的功能前言群内隔段时间就有同学问小程序的转发是否可以区分转发给好友还是转发给微信群今天给大家说说如'/>
                    </View>
                    <View style={{marginTop:10}}>
                        {this._renderCmsImg([{},{},{},{},{}])}
                    </View>
                    <View style={styles.floatBg}>
                        <Text style={styles.floatText}>利多</Text>
                        <Image style={styles.shareImg}
                               source={require('../../../res/img/cms/icon_cms_share.png')}></Image>
                    </View>
                    <View style={styles.bottomBg}>
                        <View style={styles.userBg}>
                            <Image style={styles.userHeaderImg}
                                   source={require('../../../res/img/icon/icon_default_head.png')}></Image>
                            <Text style={styles.userNameText}>赵某某</Text>
                        </View>
                        <Image style={styles.shareImg}
                               source={require('../../../res/img/cms/icon_cms_share.png')}></Image>
                    </View>
                </View>
            </View>
        )
    }

    _renderCmsImg(items) {
        if (items.length == 0) {
            return null;
        } else if (items.length == 1) {
            return <Image style={{width:screenWidth - 90}} source={require('../../../res/img/icon/icon_default_head.png')}/>
        } else {
            let render = items.map(function (item, key) {
                return (
                    <Image key={key} style={{width: 90, height: 90, marginRight: 7}} source={require('../../../res/img/icon/icon_default_head.png')}/>
                )
            })
            return <View style={{height: 90,width:screenWidth - 90}}>
                <ViewPager horizontal={true} viewPagerWidth={screenWidth - 90}
                           viewPagerHeight={90} scorllDistance={97}>
                    {render}
                </ViewPager>
            </View>
        }
    }
}
const styles = StyleSheet.create({
    bg: {
        flexDirection: 'row',
        paddingBottom: 30,
        backgroundColor: 'white',
    },
    square: {
        width: 5,
        height: 5,
        backgroundColor: '#408AFF',
        marginLeft: 20,
        marginTop: 7
    },
    locationText: {
        fontSize: 13,
        color: '#408AFF',
        marginLeft: 5
    },
    rightBg: {
        flex: 1,
        marginLeft: 15,
        marginRight: 20
    },
    detailText: {
        fontSize: 16,
        color: '#26272A',
        flex: 1
    },
    reviewBg: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'center'
    },
    reviewImg: {
        width: 11,
        height: 13,
        resizeMode: 'contain'
    },
    reviewText: {
        color: '#408AFF',
        fontSize: 13,
        textAlign: 'right',
        marginLeft: 3
    },

    linkBg: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F9FAFB'
    },
    floatBg: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    floatText: {
        textAlign: 'center',
        padding: 4,
        borderRadius: 2,
        width: 30,
        fontSize: 10,
        backgroundColor: '#F9FAFB'
    },
    bottomBg: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    userBg: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userHeaderImg: {
        width: 18,
        height: 18,
        borderRadius: 9,
    },
    userNameText: {
        marginLeft: 4,
        color: '#9FA4AB',
        fontSize: 8
    },
    shareImg: {
        width: 15,
        height: 15
    }

});