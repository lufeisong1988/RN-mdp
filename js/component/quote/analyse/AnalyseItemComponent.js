import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import CollapsibleTextComponent from '../../CollapsibleTextComponent'
import PropTypes from 'prop-types'

/**
 * 成交分析
 * 列表item
 */
export default class AnalyseItemComponent extends Component {
    static propsTypes={
        item:PropTypes.array
    };
    render() {
        return (
            <View style={styles.bg}>
                <View style={styles.square}/>
                <Text style={styles.locationText}>{this.props.item.areaName}</Text>
                <CollapsibleTextComponent lines={3} style={styles.detailText} title={this.props.item.desc}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
        flexDirection: 'row',
        paddingBottom: 30,
        backgroundColor: 'white',
        marginRight:20
    },
    square: {
        width: 5,
        height: 5,
        backgroundColor: '#408AFF',
        marginLeft: 20,
        marginTop: 7
    },
    locationText:{
        fontSize: 13,
        color: '#408AFF',
        marginLeft: 5
    },
    detailText:{
        fontSize: 16,
        color: '#26272A',
        marginLeft: 14,
        flex: 1,

    }
});