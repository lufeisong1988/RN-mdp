import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'

/**
 * 报价趋势
 * 顶部label
 *
 */
export default class TrendSelectLabelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            click: props.click,
        }

    }

    render() {
        return (
                <View style={[this.props.style, styles.bg]}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Image style={styles.img}
                           source={this.state.click ? require('../../../../res/img/icon_inline_up.png') : require('../../../../res/img/icon_inline_down.png')}/>
                </View>
        )
    }

    changeClick() {
        const click = !this.state.click
        this.setState({
            click: click,
        });
        return click
    }



    closeClick() {
        this.setState({
            click: false,
        })
    }

}
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        marginLeft: 20,
        fontSize: 13,
        color: '#757A81',
    },
    img: {
        width: 10,
        height: 5,
        marginRight: 20,
    }
});