import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewPropTypes,
} from 'react-native'
import PropTypes from 'prop-types'
const defaultBgColor = ['#9FD4F5','#9CC2FC'];
export default class MyButtonComponent extends Component {
    static propTypes = {
        title: PropTypes.string,
        titleStyle: ViewPropTypes.style,
        bgStyle: ViewPropTypes.style,
        bgColor: PropTypes.array,
        onPressFunc:PropTypes.func,
    };

    render() {
        return (
            <TouchableOpacity style={[this.props.bgStyle ? this.props.bgStyle : styles.defaultBgStyle]} onPress={this.props.onPressFunc}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={this.props.bgColor ? this.props.bgColor : defaultBgColor}
                                style={[styles.colorBg]}>
                    <Text style={[this.props.titleStyle ? this.props.titleStyle : styles.defaultTitleStyle, {backgroundColor: 'transparent'}]}>{this.props.title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    defaultTitleStyle:{
        color:'#FFFFFF',
        fontSize:20,
    },

    defaultBgStyle:{
        marginTop:20,
        marginLeft:0,
        marginRight:0,
        height:55,
    },
    colorBg:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:4,
    }
});