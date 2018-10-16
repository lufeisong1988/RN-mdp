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
 * 列表section
 */
export default class CmsSectionComponent extends Component {

    static propTypes = {
        selectSectionKey: PropTypes.number,
        info: PropTypes.any,
    }
    static defaultProps = {
        selectSectionKey: 0
    }

    render() {
        return (
            <View style={styles.bg}>
                <Text style={styles.titleText}>2018年5月16日 周二</Text>
                <View
                    style={[styles.rightBg, {display: this.props.info.section.key == this.props.selectSectionKey ? 'flex' : 'none'}]}>
                    <TouchableWithoutFeedback>
                        <View style={styles.checkBg}>
                            <View style={styles.checkDot}/>
                            <Text style={styles.checkText}>只看关注</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback>
                        <Image style={styles.filterBg}
                               source={require('../../../res/img/cms/icon_news_fliter.png')}/>
                    </TouchableWithoutFeedback>
                </View>
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
    rightBg: {
        flexDirection: 'row'
    },
    checkBg:{
        flexDirection: 'row',
        alignItems:'center'
    },
    checkDot: {
        width: 10,
        height: 10,
        borderColor: '#929FB1',
        borderWidth: 0.5
    },
    checkText: {
        fontSize: 13,
        color: '#757A81',
        marginLeft:5
    },
    filterBg: {
        width: 24,
        height: 24,
        marginLeft:13
    }
});