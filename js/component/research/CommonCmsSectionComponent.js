import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
} from 'react-native'
import PropTypes from 'prop-types'

/**
 * 研究
 * 通用模板列表section
 */
export default class CommonCmsSectionComponent extends Component {

    render() {
        return (
            <View style={styles.bg}>
                <Text style={styles.titleText}>2018年5月16日 周二</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#F9FAFB'
    },
    titleText: {
        fontSize: 15,
        color: '#26272A'
    },
});