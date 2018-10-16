import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Animated,
    Easing,
} from 'react-native'
import * as Loading from './CustomLoadingView'

const customHeaderHeight = 100;
let _this = null;
export class CustomRefreshHeader extends View {
    componentDidMount(){
        _this = this
    }
    render() {
        return (
            <View style={customHeaderStyles.background} ref="cc">
                <View style={customHeaderStyles.status}>
                    {this._renderArrowOrLoading()}
                    <Text style={customHeaderStyles.statusTitle}>{this.props.refreshTitle}</Text>
                </View>
                <Text style={customHeaderStyles.statusData}>上次更新时间</Text>
            </View>
        )
    }

    //渲染header里的箭头指示器
    _renderArrowOrLoading() {
        return (
            <Loading.CustomLoadingView ref="loading" style={{marginRight: 10}}/>
        )
    }
    /**
     * 对外暴露的函数
     * @returns {{onScroll, refreshEnd}}
     */
    static custonAction = () => {
        return {
            onScroll: (event) => {
                let distance = 20;//偏差值（需要计算）
                let offsetY = event.nativeEvent.contentOffset.y;
                //下拉刷新
                if (offsetY <= customHeaderHeight) {
                    if(offsetY > (customHeaderHeight * 3 / 4 - distance) && offsetY <= customHeaderHeight)
                        _this.refs.loading.updateStatus(Loading.CustomLoadingStatus.STEP_ONE);
                    if(offsetY > (customHeaderHeight / 2 - distance) && offsetY <= (customHeaderHeight * 3 / 4 - distance))
                        _this.refs.loading.updateStatus(Loading.CustomLoadingStatus.STEP_TWO);
                    if(offsetY > (customHeaderHeight / 4 - distance) && offsetY <= (customHeaderHeight / 2 - distance))
                        _this.refs.loading.updateStatus(Loading.CustomLoadingStatus.STEP_THREE);
                    if(offsetY > 0 && offsetY <= (customHeaderHeight / 4 - distance))
                        _this.refs.loading.updateStatus(Loading.CustomLoadingStatus.STEP_FOUR)
                }
            },
            loading:() => {
                _this.refs.loading.startRotate()
            },
            refreshEnd:() => {
                _this.refs.loading.stopRotate()
            },
        }
    }

}

const customHeaderStyles = StyleSheet.create({
    background: {
        alignItems: 'center',
        justifyContent: 'center',
        height: customHeaderHeight,
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusArrow: {
        width: 14,
        height: 20,
        marginRight: 10
    },
    statusTitle: {
        marginLeft: 20,
        fontSize: 18,
        color: '#333333'
    },
    statusData: {
        marginTop: 10,
        fontSize: 14,
        color: '#333333'
    }
});