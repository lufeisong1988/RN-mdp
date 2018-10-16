import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

export default class TableTextComponent extends Component {
    static propTypes = {
        tableTitle: PropTypes.string,
        tableTip: PropTypes.string,
        info: PropTypes.string,
        onPressFunc:PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPressFunc}>
                <View style={[this.props.style, styles.bg]}>
                    <View style={styles.leftBg}>
                        <Text style={[styles.leftTitle, {color: '#26272A'}]}>{this.props.tableTitle}</Text>
                        <Text style={[styles.leftTitle, {color: '#9FA4AB'}]}>{this.props.tableTip}</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.rightTitle, {color: '#9FA4AB'}]}>{this.props.info}</Text>
                        <Image source={require('../../res/img/icon/arrow_rgt_grey.png')} style={{marginRight: 10}}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftBg: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftTitle: {
        fontSize: 15,
        marginLeft: 10,
    },
    rightTitle: {
        fontSize: 15,
        marginRight: 15,
    },
})