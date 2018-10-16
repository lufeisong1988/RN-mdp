import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native'

export default class CommonCmsItemComponent extends Component {
    render() {
        return (
            <View style={styles.bg}>
                <Text numberOfLines={2} style={styles.titleText}>现货略周度交流会纪要：美豆震荡格局不震荡格局不震荡格局不</Text>
                <Text numberOfLines={2} style={styles.contentText}>USDA5月供需报告新旧豆美国库存均低于平均预期，但全球库存高于平均预期。报告难以改变美豆</Text>
                <View style={styles.bottomBg}>
                    <Image style={styles.columnImg}/>
                    <Image style={styles.levelImg}/>
                    <Text style={styles.timeText}>20分钟前</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15,
        marginTop: 15
    },
    titleText:{
        color: '#26272A',
        fontSize: 17
    },
    contentText:{
        marginTop: 3,
        color: '#26272A',
        fontSize: 13
    },
    bottomBg:{
        flexDirection: 'row',
        marginTop: 8
    },
    columnImg:{
        width: 48,
        height: 12
    },
    levelImg:{
        width: 21,
        height: 12,
        marginLeft: 15
    },
    timeText:{
        color: '#26272A',
        fontSize: 13,
        flex: 1,
        textAlign: 'right'
    }
});