import React, {Component} from 'react'
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Navigator,
    Platform,
    StyleSheet,
} from 'react-native'

const IsIOS = Platform.OS === 'ios'
export default class NavigationWithDelete extends Component {
    constructor(props){
        super(props)
        this.state = {
            navigation:props.navigation
        }
    }
    render() {
        const {navigation} = this.state
        return (
            <View style={styles.bg}>
                <TouchableWithoutFeedback onPress={this._back.bind(this,navigation)}>
                    <Image style={styles.backImg}
                           source={require('../../../res/img/navigition/icon_left_cancel.png')}/>
                </TouchableWithoutFeedback>
                {this.props.children}
            </View>
        )
    }
    _back(navigation){
        navigation.pop()
    }
}
const styles = StyleSheet.create({
    bg:{
        flex: 1,
        backgroundColor: 'white',
    },
    backImg:{
        width: 40,
        height: 40,
        marginTop: IsIOS ? 25 : 0,
        marginLeft: 10,
    }
});