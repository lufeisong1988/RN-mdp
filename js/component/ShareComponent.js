/**

 */
import React, {Component} from 'react';
import {
    Modal,
    Text,
    View,
    Animated,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

/**
 * 分享组件
 * @type {number}
 */
const TITLE_HEIGHT = 44;
const BUTTON_HEIGHT = 55;
const HEIGHT = 400;

let _this = null
export default class ShareComponent extends Component {
    constructor(props, state) {
        super(props, state);
        _this = this
        this.state = {
            marginBottomValue: new Animated.Value(0),
            height: HEIGHT,
            showAble:false,
        };

        this.state.marginBottomValue.addListener(({value}) => {
            this._value = value;
        });
    }

    show(callback) {
        this.state.marginBottomValue.setValue(-HEIGHT);
        this.setState({
            callback: callback,
            showAble:true,

        });
        const ss = this.state
        console.log('..')
    }

    hide() {
        Animated.timing(
            this.state.marginBottomValue,
            {toValue: -this.state.height, duration: 210, delay: 0}
        ).start(
            this.setState({
                showAble:false,
            })
        );
    }


    render() {
        if(!this.state.showAble)
            return null;
        Animated.timing(
            this.state.marginBottomValue,
            {toValue: 0, duration: 210, delay: 10}
        ).start();

        let onMaskPress = this.onMaskPress.bind(this);

        return (
            <Modal
                visible={true}
                transparent={true}
                animationType='fade'
                onRequestClose={onMaskPress}>
                <TouchableWithoutFeedback onPress={onMaskPress}>
                    <Animated.View style={[styles.main, {marginBottom: this.state.marginBottomValue}]}>
                        <View style={styles.body}>
                            <View style={styles.headerBg}>
                                <Text style={styles.navigativeBg}>分享该文章</Text>
                            </View>
                            {this.renderActionButtons()}
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    renderActionButtons() {

        let buttonList = [{'title': 'QQ', 'img': require('../../res/img/share/titimg_qq.png')}, {
            'title': '微信',
            'img': require('../../res/img/share/titimg_wechat.png')
        },
            {'title': '朋友圈', 'img': require('../../res/img/share/titimg_wechatquan.png')}, {
                'title': '微博',
                'img': require('../../res/img/share/titimg_weibo.png')
            }]
        return this.renderButtonList(buttonList, {})

    }



    renderButtonList(list, style) {
        return (
            <View style={[styles.buttonContainer, style]} key={'button_list_' + Math.random()}>
                {list.map((button, bIndex) => {
                    return (
                        <View key={bIndex} style={{flex: 1,alignItems:'center'}}>
                            <TouchableWithoutFeedback onPress={this.onButtonPress.bind(this, bIndex)}>
                                <View style={{flex:1}}>
                                <Image style={{width: 40, height: 40}} source={button.img}></Image>
                                <Text style={{marginBottom: 10,textAlign:'center'}}>{button.title}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    );
                })}
            </View>
        );
    }

    onButtonPress(index) {
        let {callback} = _this.state;
        callback(index);
        this.hide()
    }
    onMaskPress() {
        this.hide();
    }
     _showActionSheetWithOptions(callback){
         this.show(callback)
    };
     _hide(){
         this.hide();
    };
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

    body: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },

    headerBg: {
        borderTopWidth: 1,
        borderTopColor: '#f0eff5',
        backgroundColor: 'white',
        height: TITLE_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigativeBg: {
        flex: 1,
        textAlign: 'center',
        fontSize: 17
    },
    postiveBg: {
        marginRight: 10, fontSize: 17, color: '#408AFF'
    },
    buttonContainer: {
        backgroundColor: 'white',
        overflow: 'hidden',
        flexDirection: 'row',
        paddingTop:10,

    },

    button: {
        height: BUTTON_HEIGHT,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f0eff5',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    buttonText: {
        fontSize: 20
    },


    red: {
        color: 'red'
    }
});
/**
 * Display an action sheet. The `opts` object must contain one or more
 * of:
 *
 * - `options` (array of strings) - a list of button titles (required)
 * - `cancelButtonIndex` (int) - index of cancel button in `options`
 * - `destructiveButtonIndex` (int) - index of destructive button in `options`
 * - `title` (string) - a title to show above the action sheet
 * - `message` (string) - a message to show below the title
 * - `tintColor` (string) - button color
 */
// ShareComponent.showActionSheetWithOptions = (opts, callback) => {
//     _this.show(opts, callback)
// };
//
// ShareComponent.hide = () => {
//     _this.hide();
// };
//
// global.ShareComponent = ShareComponent;
