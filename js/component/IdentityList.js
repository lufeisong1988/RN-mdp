/**
 * @file IdentityList API
 * @author zdying
 * @providesModule IdentityList
 */
import React, {Component} from 'react';
import {
    Modal,
    Text,
    View,
    Animated,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const TITLE_HEIGHT = 44;
const BUTTON_HEIGHT = 55;

let _this = null
export default class IdentityList extends Component {
    constructor(props, state) {
        super(props, state);
        _this = this
        this.state = {
            sheets: [],
            marginBottomValue: new Animated.Value(0)
        };

        this.state.marginBottomValue.addListener(({value}) => {
            this._value = value;
        });
    }

    show(opts, callback) {
        let sheets = this.state.sheets;
        let height = this.getHeight(opts);

        this.state.marginBottomValue.setValue(-height);

        this.setState({
            sheets: [
                ...sheets,
                {
                    opts,
                    callback
                }
            ],
            height:height
        });
    }

    hide() {
        Animated.timing(
            this.state.marginBottomValue,
            {toValue: -this.state.height, duration: 210, delay: 0}
        ).start(() => {
            this.setState({
                sheets: this.state.sheets.slice(0, -1),
            });
        });
    }

    getHeight(opts) {
        let {options} = opts;
        let height = options.length * BUTTON_HEIGHT + TITLE_HEIGHT;
        return height;
    }

    render() {
        if (this.state.sheets.length === 0) {
            return null;
        }

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
                                <TouchableWithoutFeedback onPress={this.onNavigationPress.bind(this)}>
                                    <Text style={styles.navigativeBg}>取消</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.onPostivePress.bind(this)}>
                                    <Text style={styles.postiveBg}>确认</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            {this.renderActionButtons()}
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    renderActionButtons() {
        let {sheets} = this.state;
        let lastSheet = sheets.slice(-1)[0];
        let {buttonList} = this.parseOpitons(lastSheet);
        return this.renderButtonList(buttonList, {})

    }

    parseOpitons(sheet) {
        let {opts} = sheet;
        let buttonList = [];
        let {options = [], tintColor = '#252729', destructiveButtonIndex} = opts;
        (options).forEach((option, index) => {
            let btnObj = {
                title: option,
                index,
            };

            if (index === destructiveButtonIndex) {
                btnObj.color = '#408AFF';
            } else {
                btnObj.color = tintColor;
            }

            buttonList.push(btnObj);
        });

        return {
            buttonList,
        };
    }

    renderButtonList(list, style) {
        return (
            <View style={[styles.buttonContainer, style]} key={'button_list_' + Math.random()}>
                {list.map((button, bIndex) => {
                    let {index, title,} = button;
                    let borderBottomWidth = Number(bIndex !== list.length - 1);
                    return (
                        <TouchableOpacity
                            style={[styles.button, {borderBottomWidth}]}
                            key={'button_' + button.index}
                            onPress={this.onButtonPress.bind(this, index)}
                            activeOpacity={0.9}>
                            <Text style={[styles.buttonText, {color:this.state.sheets.slice(-1)[0].opts.destructiveButtonIndex == bIndex ? '#408AFF' :'#252729'}]}>
                                {title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }

    onButtonPress(index) {
        let {sheets} = this.state;
        let sheet = sheets.slice(-1)[0];
        let opts = {options:sheet.opts.options,destructiveButtonIndex:index};
        let callback = sheet.callback;
        this.setState({
            sheets:[ {
                opts,
                callback
            }]
        });
    }
    onNavigationPress(){
        this.hide()
    }
    onPostivePress(){
        let {sheets} = this.state;
        let lastSheet = sheets.slice(-1)[0];
        let {callback,opts} = lastSheet;
        callback(opts.destructiveButtonIndex);
        this.hide()
    }

    onMaskPress() {
        let {sheets} = this.state;
        let lastSheet = sheets.slice(-1)[0] || {};
        let {opts, callback} = lastSheet;
        if (!opts || !callback) {
            return;
        }
        this.hide();
    }
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

    headerBg:{
        borderBottomWidth: 1,
        borderBottomColor: '#f0eff5',
        backgroundColor:'white',
        height:TITLE_HEIGHT,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    navigativeBg:{
        marginLeft:10,fontSize:17
    },
    postiveBg:{
        marginRight:10,fontSize:17,color:'#408AFF'
    },
    buttonContainer: {
        backgroundColor: 'white',
        overflow: 'hidden'
    },

    button: {
        height: BUTTON_HEIGHT,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f0eff5',
        alignItems: 'center',
        justifyContent: 'center'
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
IdentityList.showActionSheetWithOptions = (opts, callback) => {
    _this.show(opts, callback)
};

IdentityList.hide = () => {
    _this.hide();
};

global.IdentityList = IdentityList;
