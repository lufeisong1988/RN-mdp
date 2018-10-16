import React, {Component} from 'react'
import {View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native'
import Swiper from 'react-native-swiper'

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    dot: {
        backgroundColor: '#9c8a81',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4
    },
    activeDot: {
        backgroundColor: '#fefdfd',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
        height: screenHeight
    }
})
/**
 * app引导页
 */
export default class GuidancePage extends Component {
    render() {
        const {navigate} = this.props.navigation
        return (
            <Swiper showsButtons={false}
                    autoplay={false}
                    loop={false}
                    showsPagination={false} paginationStyle={{bottom: 10}} dot={<View style={styles.dot}/>}
                    activeDot={<View style={styles.activeDot}/>}>
                <Image key='0' style={styles.center} source={require('../../res/img/guide/loading1.png')}/>
                <Image key='1' style={styles.center} source={require('../../res/img/guide/loading2.png')}/>
                <TouchableWithoutFeedback onPress={() => this._goTo(navigate)} style={{flex: 1}}>
                    <Image key='2' style={styles.center} source={require('../../res/img/guide/loading3.png')}/>
                </TouchableWithoutFeedback>
            </Swiper>
        )
    }

    _goTo(navigate) {
        //跳转到主页
        navigate('mainPage')

    }
}