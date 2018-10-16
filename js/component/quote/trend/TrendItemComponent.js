import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import MyButtonComponent from '../../MyButtonComponent'

import DateUtil from '../../../utils/DateUtil'

/**
 * 报价趋势
 * item
 */
export default class TrendItemComponent extends Component {
    static propTypes={
        item:PropTypes.object,
    };
    render() {
        return (

            <View style={styles.bg}>
                <Text style={[styles.text, {width: 48}]}>{this.props.item.factoryName}</Text>
                <View style={styles.line}/>
                <Text style={[styles.text, {width: 38}]}>{this.props.item.supplierName}</Text>
                <View style={styles.line}/>
                <Text style={[styles.text, {width: 48}]}>{this.props.item.deliveryLocation}</Text>
                <View style={styles.line}/>
                <Text style={[styles.text, {width: 60}]}>{this.props.item.showPrice}</Text>
                <View style={styles.line}/>
                {this._renderPrice(this.props.item.price)}
                <View style={styles.line}/>
                <Text style={[styles.text, {width: 48}]}>{this.props.item.deliveryDate}</Text>
                <View style={styles.line}/>
                <View style={styles.lastBg}>
                    <MyButtonComponent title="咨询" titleStyle={styles.buttonText} bgColor={['#41ACED', '#3C86FA']}
                              bgStyle={styles.buttonBg}/>
                    <Text style={styles.lastText}>{DateUtil.formatDate(new Date(this.props.item.quoteDate),'MM-dd hh:mm')}更新</Text>
                </View>
            </View>
        )
    }
    _renderPrice(price){
        price+=''
        let text = '';
        let color = '#252729';
        if(price == '' || price == '持平'){
            text = price
        }else{
            if(price.startsWith('-',0)){
                text = price.substr(1,price.length - 1);
                color = 'green'
            }else{
                text = price;
                color='red'

            }
        }
        return(
            <Text style={[styles.text, {width: 45,color}]}>{text}</Text>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
        height: 57,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:0.5,
        borderColor:'#D2D2DA'
    },
    text: {
        textAlign: 'center',
        fontSize: 10,
        color: '#252729',
    },
    lastBg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center'
    },
    buttonBg: {
        width: 60,
        height: 32,
        borderRadius: 4,
    },
    lastText: {
        color: '#252729',
        fontSize: 10,
        textAlign:'center',
        paddingLeft:4,
        paddingRight:4
    },
    line: {
        width: 0.5,
        height: 57,
        backgroundColor: '#D2D2DA'
    }
});