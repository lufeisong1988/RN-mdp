import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'
import PropTypes from 'prop-types'

export default class TableArrowComponent extends Component {
    static propTypes = {
        tableTitle: PropTypes.string,
        onPressFunc: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            focused: false
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPressFunc}>
                <View style={[this.props.style, styles.bg, {height: this.props.style.height ? this.props.style.height : height}, this.state.focused ? styles.bgFocus : styles.bgBlur]}>
                    <Text style={{color: '#26272A', fontSize: 15, marginLeft: 10}}>{this.props.tableTitle}</Text>
                    <Image source={require('../../res/img/icon/arrow_rgt_grey.png')} style={{marginRight: 10}}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
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
        flex: 1,
        alignSelf: 'stretch',
    },
    rightText: {
        paddingLeft: 13,
        paddingRight: 13,
        color: '#408AFF',
        fontSize: 13,
    }
});