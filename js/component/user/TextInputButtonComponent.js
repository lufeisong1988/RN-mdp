import React, {Component} from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Text,
} from 'react-native'
import PropTypes from 'prop-types'

/**
 * 右边添加按钮
 *
 */
var _this = null;
var timer = null;
const maxCountTime = 10;
export default class TextInputButtonComponent extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            focused: false,
            countTime: maxCountTime,
            isCount: false,
        }
        this.endCount = this._endCount.bind(this)
    }

    static propTypes = {
        placeholder: PropTypes.string,
        autoFocus: PropTypes.bool,
        rightText: PropTypes.string,
        onPressFunc:PropTypes.func,
    };

    render() {
        return (
            <View style={[this.props.style, styles.bg, this.state.focused ? styles.bgFocus : styles.bgBlur]}>
                <TextInput autoFocus={this.props.autoFocus} placeholder={this.props.placeholder}
                           style={[styles.textInput]}
                           underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                           onFocus={(event) => this._onFocus(event)} onBlur={(event) => this._onBlur(event)}/>
                <View style={[styles.line, this.state.focused ? styles.lineFocus : styles.lineBlur]}></View>
                <Text onPress={this._startCount.bind(this)} style={styles.rightText}>{this.state.isCount ? this.state.countTime :this.props.rightText}</Text>
            </View>
        )
    }

    _onFocus(event) {
        this.setState({
            focused: true
        })
    }

    _onBlur(event) {
        this.setState({
            focused: false
        })
    }

    /**
     * 开始倒计时
     */
    _startCount (){
        if(_this.state.isCount)
            return;
        let callbackFunc =_this.props.onPressFunc;
        //回调方法
        callbackFunc();
        _this.setState({
            isCount: true,
            countTime:maxCountTime,
        });
        timer = setInterval(function () {
            if(_this.state.countTime > 0 ){
                _this.setState({
                    countTime: _this.state.countTime - 1
                })
            }else{
                clearInterval(timer)
                _this.setState({
                    isCount: false,
                    countTime:maxCountTime,
                });
            }
        }, 1000)
    }

    /**
     * 停止倒计时
     */
    _endCount() {
        clearInterval(timer)
        _this.setState({
            isCount: false,
            countTime:maxCountTime,
        });
    }
}
const styles = StyleSheet.create({
    bg: {
        left: 0,
        right: 0,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
    },
    bgFocus: {

        borderColor: '#26272A',
    },
    bgBlur: {

        borderColor: '#9FA4AB',
    },
    line: {
        height: 50,
        width: 1,
    },
    lineFocus: {
        backgroundColor: '#26272A'
    },
    lineBlur: {
        backgroundColor: '#9FA4AB'
    },
    textInput: {
        marginLeft: 10,
        fontSize: 17,
        flex: 1,
        height: 50,
    },

    rightText: {
        width: 100,
        textAlign:'center',
        color: '#408AFF',
        fontSize: 13,
    }
});