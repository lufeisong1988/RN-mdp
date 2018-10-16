import React, {Component} from 'react'
import {
    View,
    ScrollView,
    Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default class ViewPager extends ScrollView {

    static propTypes={
        horizontal:PropTypes.bool,
        viewPagerWidth: PropTypes.number,
        viewPagerHeight: PropTypes.number,
        scorllDistance:PropTypes.number,
    }
    static defaultProps={
        horizontal:true,
        viewPagerWidth: screenWidth,
        viewPagerHeight: screenHeight,
        scorllDistance: this.horizontal ? screenWidth : screenHeight,
    }
    constructor(props) {
        super(props)
    }

    render() {
        return (

            <ScrollView
                ref="scrollView" style={[this.props.style,{flex: 1,width:this.props.viewPagerWidth,height:this.props.viewPagerHeight}]}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        alwaysBounceHorizontal={false}
                        alwaysBounceVertical={false}
                        horizontal={this.props.horizontal}
                        scrollEventThrottle={16}
                        onScrollEndDrag={(event) => this._onScrollEnd(event)}>
                {this.props.children}
            </ScrollView>

        )
    }

    _onScrollEnd(event) {
        let viewpagerLength = this.props.horizontal ? event.nativeEvent.contentSize.width : event.nativeEvent.contentSize.height;
        let viewpagerWidth = this.props.horizontal ? this.props.viewPagerWidth : this.props.viewPagerHeight;
        let offset =  this.props.horizontal ? event.nativeEvent.contentOffset.x : event.nativeEvent.contentOffset.y;
        let index = Math.round(offset / this.props.scorllDistance);
        let scrollTo = index * this.props.scorllDistance;
        if(viewpagerLength >= scrollTo + viewpagerWidth){
            this.props.horizontal ? this.refs.scrollView.scrollTo({x: index * this.props.scorllDistance, animated: true}):this.refs.scrollView.scrollTo({y: index * this.props.scorllDistance, animated: true})
        }else{
            this.refs.scrollView.scrollTo({x: viewpagerLength - viewpagerWidth, animated: true});
        }
    }
}