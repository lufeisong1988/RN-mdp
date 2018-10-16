import {
    StyleSheet,
    Dimensions,
} from 'react-native'

const screenWidth = Dimensions.get('window').width;
export const CommonStyles = StyleSheet.create({
    commonPadding: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    commonMargin: {
        marginLeft: 20,
        marginRight: 20,
    },
    centerInParent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        height: 1,
        backgroundColor: '#E7E7E7',
        left: 0,
        right: 0,
    },
    bg:{
        backgroundColor: 'white',
        flex:1,
    }
})
export const HomePageStyles = StyleSheet.create({
    user_bg: {
        height: 66,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    user_icon: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    user_text: {
        color: '#9FA4AB',
        fontSize: 29,
        marginLeft: 10,
    },
    message: {
        width: 40,
        height: 40,
    },
    phone: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    dot: {
        backgroundColor: '#9c8a81',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4
    },
    activeDot: {
        backgroundColor: '#fefdfd',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4
    },
    notice_bg: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth,
        height: 36,
    },
    notice_icon: {
        width: 12,
        height: 12,
    },
    notice_text: {
        color: 'red',
        fontSize: 13,
    },
    notice_content_bg: {
        flex: 1,
        justifyContent: 'center',
    },
    notice_content: {
        marginLeft: 10,
        fontSize: 13,
        color: 'black',
    },
    line: {
        height: 5,
        width: screenWidth,
        backgroundColor: '#F9FAFB',
    },
    recommed_bg: {
        paddingTop: 25,
    },
    recommed_content_bg: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recommed_content: {
        fontSize: 16,
        color: 'black',
        marginLeft: 5,
    },
    recommed_time: {
        marginLeft: 10,
        fontSize: 12,
        color: '#9FA4AB',
        marginTop: 3,
    },
    recommed_line: {
        marginLeft: 10,
        height: 1,
        backgroundColor: '#F1F3F4',
        marginBottom: 0,
    },
    quote_bg: {
        width: screenWidth,
        height: 180,
        backgroundColor: '#F9FAFB',
    },
    quote_label: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        justifyContent: 'space-between',
    },
    quote_item: {
        backgroundColor: '#3CC177',
        width: 238,
        height: 96,
        padding: 12,
        flexDirection: 'row',
        marginLeft: 20,
        borderRadius: 4,
    },
    quote_item_left: {
        flex: 1,
        justifyContent: 'space-between',
    },
    quote_item_right: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    article_bg: {
        backgroundColor: 'white',
        width: screenWidth,
        paddingTop: 20,
    },
    article_label: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    article_item_bg: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        width: screenWidth,
    },
    article_item_right: {
        marginLeft: 10,
        justifyContent: 'space-between',
        width: screenWidth - 85 - 10 - 40,
    }
});
export const UserStyles = StyleSheet.create({
    bg: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        backgroundColor: 'white',
    },
    title: {
        color: '#26272A',
        fontSize: 29,
    },
    tip: {
        color: '#26272A',
        fontSize: 17,
        marginTop: 30,
    },
    forgetPswTip: {
        marginTop: 20,
        left: 0,
        right: 0,
        height: 16,
        flexDirection: 'row',
    },
    rightNumberTextBg: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rightNumberText: {
        color: '#757A81',
        fontSize: 15,
        marginTop: 20,
    }
});
export const ActivityStyles = StyleSheet.create({
    activityDetailBg: {
        flex: 1,
        position: 'relative',
    },
    activityDetailContentBg: {
        flex: 1,
        padding: 20,
    },
    activityDetailTitle: {
        color: '#45474E',
        fontSize: 15,
        paddingTop: 8,
        paddingBottom: 8,
        fontWeight: 'bold',
    },
    activityDetailText: {
        color: '#45474E',
        fontSize: 15,
        marginLeft: 0,
        fontWeight: 'normal',
    },
    activityDetailButtom:{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 55,
    }
});
export const CommonWebViewStyles = StyleSheet.create({
    navigationBg: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backImg: {
        width: 40,
        height: 40,
        marginLeft: 20
    },
    shareImg: {
        width: 20,
        height: 20,
        marginRight: 20
    }
});
export const QuoteStyles = StyleSheet.create({
    bg:{
        flex: 1,
        backgroundColor: 'white'
    },
    indicatorBg:{
        flex: 1,
        flexDirection: 'column-reverse',
        marginTop: 20
    },
});
export const QuoteMapStyles = StyleSheet.create({
    flexBg:{
        flex: 1,
    },
    refreshImg:{
        width: 30,
        height: 30,
        position: 'absolute',
        right: 20,
        bottom: 20
    }
});
export const StrategyStyles = StyleSheet.create({
    bg:{
        flex: 1,
        backgroundColor:'white'
    },
    indicator:{
        flex: 1,
        flexDirection: 'column-reverse',
        marginTop: 20
    },

});
export const StrategyFragmentStyles = StyleSheet.create({
    webViewBg: {
        height: 188,
        margin: 10,
    },
    contentBg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    waterMark: {
        width: 355,
        height: 203,
    },
    content: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        position: 'absolute',
        justifyContent: 'space-between'
    },
    contentScrollView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentText: {
        fontSize: 17,
        color: '#26272A',
    },
    tipBg: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 20,
    },
    tipText: {
        fontSize: 12,
        color: '#9FA4AB',
    },
    tipImage: {
        width: 47,
        height: 12,
    }
})
