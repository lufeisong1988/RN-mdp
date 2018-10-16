import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

export default class TrendSectionComponent extends Component {

    render() {
        return (
            <View style={styles.bg}>
                <Text style={[styles.text, {width: 48}]}>厂商品牌</Text>
                <Text style={[styles.text, {width: 38}]}>供应商</Text>
                <Text style={[styles.text, {width: 48}]}>提货地点</Text>
                <Text style={[styles.text, {width: 60}]}>报价</Text>
                <Text style={[styles.text, {width: 45}]}>环比昨天</Text>
                <Text style={[styles.text, {width: 48}]}>提货月份</Text>
                <Text style={[styles.text,{flex:1}]}>操作</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#D2D2DA',
        backgroundColor:'#F9FAFB',
    },
    text: {
        textAlign: 'center',
        fontSize: 10,
        color: '#252729',
    },
});