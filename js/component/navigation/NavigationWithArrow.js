import React, {Component} from 'react'
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Navigator,
    Platform,
    StyleSheet,
    Text,
} from 'react-native'

const IsIOS = Platform.OS === 'ios'
export default class NavigationWithArrow extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navigation: props.navigation,
            middleChild: props.middleChild,
            rightChild: props.rightChild,
        }
    }

    render() {
        return (
            <View style={styles.bg}>
                <View style={styles.headerBg}>
                    <TouchableWithoutFeedback onPress={this._back.bind(this)}>
                        <Image style={styles.backImg}
                               source={require('../../../res/img/navigition/icon_nav_back.png')}/>
                    </TouchableWithoutFeedback>
                    {this.state.middleChild}
                    <View style={styles.rightBg}>
                        {this.state.rightChild}
                    </View>
                </View>
                {this.props.children}
            </View>
        )
    }

    _back() {
        this.state.navigation.pop()
    }
}
const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerBg: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: IsIOS ? 25 : 0,
        paddingLeft: 8,
        paddingRight: 20,
    },
    backImg: {
        width: 40,
        height: 40,
    },
    rightBg: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});