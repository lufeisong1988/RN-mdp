import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    ScrollView,
    View,
    Text,
    ActivityIndicator,
    Animated,
    Easing,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native'
//默认header高度
const defaultHeaderHeight = 70;
const screenHeight = Dimensions.get('window').height;
//默认箭头
const ArrowImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABQBAMAAAD8TNiNAAAAJ1BMVEUAAACqqqplZWVnZ2doaGhqampoaGhpaWlnZ2dmZmZlZWVmZmZnZ2duD78kAAAADHRSTlMAA6CYqZOlnI+Kg/B86E+1AAAAhklEQVQ4y+2LvQ3CQAxGLSHEBSg8AAX0jECTnhFosgcjZKr8StE3VHz5EkeRMkF0rzk/P58k9rgOW78j+TE99OoeKpEbCvcPVDJ0OvsJ9bQs6Jxs26h5HCrlr9w8vi8zHphfmI0fcvO/ZXJG8wDzcvDFO2Y/AJj9ADE7gXmlxFMIyVpJ7DECzC9J2EC2ECAAAAAASUVORK5CYII=';
export const RefreshStatus = {
    pullToRefresh:0,
    releaseToRefresh:1,
    refreshIng:2,
    refreshEnd:3,
    refreshFail:4,
};
export const RefreshTitle = {
    pullToRefresh:'下拉刷新',
    releaseToRefresh:'松开刷新',
    refreshIng:'正在刷新',
    refreshEnd:'刷新成功',
    refreshFail:'刷新失败',
};
export default class RefreshScrollView extends ScrollView {
    static propTypes = {
        children: PropTypes.node,
        customRefreshView:PropTypes.any,
        customRefreshViewHeight:PropTypes.number,
        customAction:PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            arrowAngle: new Animated.Value(0),
            refreshStatus:RefreshStatus.pullToRefresh,
            refreshTitle:RefreshTitle.pullToRefresh,
            flipAble:true,
        }
    }

    componentWillMount() {
        let height = this.props.customRefreshViewHeight ? this.props.customRefreshViewHeight : defaultHeaderHeight;
        //初始化后,隐藏header
        setTimeout(() => {
            this.refs.scrollView.scrollTo({x: 0, y: height, animated: false})
        }, 50)
    }

    render() {
        return (
            <ScrollView
                style={{backgroundColor:'white'}}
                ref="scrollView"
                scrollEventThrottle={16}//刷新scroll间隔时间，默认间隔时间太长，有滞后性
                // onScrollBeginDrag={this._onScrollBegin(this)}
                onScroll={this._onScroll.bind(this)}
                onScrollEndDrag={(event)=>this._onScrollEnd(event)}
                onMomentumScrollEnd={(event) => this._onScrollEnd(event)}
            >
                <View style={{flex:1}}>
                    {this.props.customRefreshView ?<this.props.customRefreshView {...this.state}/>: this._renderDefaultHeaderView()}
                    <View>{this.props.children}</View>
                </View>
            </ScrollView>
        )
    }

    //渲染默认header
    _renderDefaultHeaderView() {
        return (
            <View style={defaultHeaderStyles.background}>
                <View style={defaultHeaderStyles.status}>
                    {this._renderArrowOrLoading()}
                    <Text style={defaultHeaderStyles.statusTitle}>{this.state.refreshTitle}</Text>
                </View>
                <Text style={defaultHeaderStyles.statusTitle}>上次更新时间</Text>
            </View>
        )
    }

    //渲染header里的箭头指示器
    _renderArrowOrLoading() {
        if(this.state.refreshStatus === RefreshStatus.refreshIng){
            return(
                <ActivityIndicator style={{marginRight:10}}/>
            )
        }else{
            return (
                <Animated.Image
                    source={{uri: ArrowImage}}
                    style={[defaultHeaderStyles.statusArrow, {
                        transform: [{
                            rotateZ: this.state.arrowAngle.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '180deg']
                            })
                        }]
                    }]}
                />
            )
        }
    }

    /**
     * 滑动中
     * @param event
     * @private
     */
    _onScroll(event) {
        //在刷新中或者完成，不响应其它动作
        if(this.state.refreshStatus === RefreshStatus.refreshIng || this.state.refreshStatus === RefreshStatus.refreshEnd)
            return;
        let offsetY = event.nativeEvent.contentOffset.y;
        let height = this.props.customRefreshViewHeight ? this.props.customRefreshViewHeight : defaultHeaderHeight;
        if(this.state.flipAble){
            if(offsetY <= height){
                this.refs.scrollView.scrollTo({y:height,animated:true});
            }
            return
        }
        //下拉刷新
        if(offsetY <= height){
            if(offsetY < 8){//释放刷新
                this.setState({
                    refreshStatus:RefreshStatus.releaseToRefresh,
                    refreshTitle:RefreshTitle.releaseToRefresh,
                });
                Animated.timing(this.state.arrowAngle,{
                    toValue:1,
                    duration:0,
                    easing:Easing.inOut(Easing.quad)
                }).start()
            }else{//下拉
                this.setState({
                    refreshStatus:RefreshStatus.pullToRefresh,
                    refreshTitle:RefreshTitle.pullToRefresh,
                });
                Animated.timing(this.state.arrowAngle,{
                    toValue:0,
                    duration:0,
                    easing:Easing.inOut(Easing.quad)
                }).start()
            }
        }
        if(this.props.customAction && this.props.customAction.onScroll)
            this.props.customAction.onScroll(event)

    }

    _onScrollBegin(event){
        this.setState({
            flipAble:false
        })
    }
    /**
     * 滑动结束
     * @param event
     * @private
     */
    _onScrollEnd(event){
        this.setState({
            flipAble:true
        })
        let offsetY = event.nativeEvent.contentOffset.y;
        let height = this.props.customRefreshViewHeight ? this.props.customRefreshViewHeight : defaultHeaderHeight;
        //上拉不响应
        if(offsetY > height)
            return;
        if(this.state.refreshStatus === RefreshStatus.pullToRefresh){//如果未执行刷新，回位
            this.refs.scrollView.scrollTo({x:0,y:height,animated:true})
        }else if(this.state.refreshStatus === RefreshStatus.releaseToRefresh){//设置状态为:开始刷新。吸顶，开始loading
            this.setState({
                refreshStatus:RefreshStatus.refreshIng,
                refreshTitle:RefreshTitle.refreshIng,
            });
            this.refs.scrollView.scrollTo({x:0,y:0,animated:true});
            if(this.props.customAction && this.props.customAction.loading)
                this.props.customAction.loading();
            setTimeout(() => {
                this.refreshEnd()
            },3000)
        }

    }


    //公开方法===========================================
    //刷新结束
    refreshEnd(){
        let height = this.props.customRefreshViewHeight ? this.props.customRefreshViewHeight : defaultHeaderHeight;
        //设置状态完成。
        this.setState({
            refreshStatus:RefreshStatus.refreshEnd,
            refreshTitle:RefreshTitle.refreshEnd,
        });
        if(this.props.customAction && this.props.customAction.refreshEnd)
            this.props.customAction.refreshEnd();
        //设置500毫秒后，回位,重置状态
        setTimeout(()=> {
            this.refs.scrollView.scrollTo({x:0,y:height,animated:true});
            this.setState({
                refreshStatus:RefreshStatus.pullToRefresh,
                refreshTitle:RefreshTitle.pullToRefresh,
                arrowAngle: new Animated.Value(0),
            });
        },500)

    }
}


const defaultHeaderStyles = StyleSheet.create({
    background: {
        alignItems: 'center',
        justifyContent: 'center',
        height:defaultHeaderHeight,
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
        fontSize: 18,
        color: '#333333'
    },
});
