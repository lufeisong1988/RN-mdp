import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

/**
 * 右边可添加文字
 */
const height = 50;
export default class TextInputTextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            password:true,
            text:''
        }
    }

    static propTypes = {
        placeholder: PropTypes.string,
        autoFocus: PropTypes.bool,
        rightText: PropTypes.string,//右侧文字
        keyboardType:PropTypes.object,//弹出键盘类型
        maxLength:PropTypes.number,//最大字符长度
    };
    static defaultProps = {
        keyboardType:'default',
        maxLength:16
    };

    render() {
        return (
            <View style={[this.props.style,styles.bg,{height : this.props.style.height ? this.props.style.height : height}, this.state.focused ? styles.bgFocus : styles.bgBlur]}>
                <TextInput ref="textInput" autoFocus={this.props.autoFocus} placeholder={this.props.placeholder}
                           style={[styles.textInput]}
                           keyboardType={this.props.keyboardType}
                           maxLength={this.props.maxLength}
                           underlineColorAndroid='transparent' //设置下划线背景色透明 达到去掉下划线的效果
                           onChangeText={(text)=>this._onChangeText(text)}
                           onFocus={(event) => this._onFocus(event)} onBlur={(event) => this._onBlur(event)}/>
                <Text style={styles.rightText} onPress={(event)=>this._onPressChangePswState(event)}>{this.state.password ?  this.props.rightText : '隐藏'}</Text>
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

    _onChangeText(text){
        this.setState({
            text:text
        })
    }

    _onPressChangePswState(event){
        this.setState({
            password:!this.state.password
        });
        console.log('value = ' + this.refs.textInput.value)
    }
}
const styles = StyleSheet.create({
    bg:{
        left: 0,
        right: 0,
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
    textInput: {
        marginLeft: 10,
        fontSize: 17,
        flex:1,
        alignSelf:'stretch',
    },
    rightText: {
        paddingLeft:13,
        paddingRight:13,
        color: '#408AFF',
        fontSize: 13,
    }
});