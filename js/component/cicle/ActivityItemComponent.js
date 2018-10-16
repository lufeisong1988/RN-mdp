import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'
import PropTypes from 'prop-types'

/**
 * 最新活动 item
 */
export default class ActivityItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
        }
        console.log('item 2 : ' + props.item.theme)
    }
    static propTypes = {
        item:PropTypes.object
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this._toActivityDetail()}>
                <View style={styles.bg}>
                    <Image style={styles.activityIcon} source={{uri: this.props.item.coverPictureUrl}}/>
                    <View style={styles.activityRight}>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={2} style={styles.titie}>{this.props.item.theme}</Text>
                            <View style={styles.timeBg}>
                                <Text style={{fontSize: 13, color: '#77828F'}}>{this.props.item.startTime}</Text>
                                <Image style={{height: 14, width: 45, marginLeft: 8}}
                                       source={require('../../../res/img/icon/icon_default_head.png')}/>
                            </View>
                        </View>
                        <Text numberOfLines={1} style={{fontSize: 13, color: '#77828F', marginTop: 4}}>{this.props.item.presenter}</Text>
                        <Text numberOfLines={1} style={{
                            fontSize: 13,
                            color: '#7EB0FF',
                            marginTop: 4
                        }}>{this.props.item.activeLocation}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _toActivityDetail() {
        const {navigate} = this.state.navigation;
        navigate('activityDetailPage',{'item':this.props.item})
    }
}
const styles = StyleSheet.create({
    bg: {
        height: 150,
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    activityIcon: {
        height: 130,
        width: 110,
        borderRadius: 4
    },
    activityRight: {
        flex: 1,
        marginLeft: 8
    },
    titie: {
        fontSize: 18,
        color: '#45474E',
    },
    timeBg: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
    },

});