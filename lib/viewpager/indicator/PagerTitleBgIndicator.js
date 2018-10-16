/**
 * Created by tangzhibin on 16/2/28.
 */

'use strict'

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, ViewPropTypes, Text, TouchableOpacity, ScrollView, Dimensions} from 'react-native'
import IndicatorViewPager from '../IndicatorViewPager'

const itemLayoutInfo = [];
const screenWidth = Dimensions.get('window').width;

const FORWARD = 1;
const NONE = 0;
const BACKWARD = -1;
const DEFAULT_ITEM_MARGIN = 0;

export default class PagerTitleBgIndicator extends Component {
    static propTypes = {
        ...ViewPropTypes,
        initialPage: PropTypes.number,
        pager: PropTypes.instanceOf(IndicatorViewPager),
        titles: PropTypes.arrayOf(PropTypes.string).isRequired,
        itemStyle: ViewPropTypes.style,
        selectedItemStyle: ViewPropTypes.style,
        itemTextStyle: Text.propTypes.style,
        trackScroll: PropTypes.bool,
        selectedItemTextStyle: Text.propTypes.style,
        selectedBorderStyle: ViewPropTypes.style,
        borderStyle: ViewPropTypes.style,
        renderTitle: PropTypes.func,
        titleParent: ViewPropTypes.style,
    }

    static defaultProps = {
        titles: [],
        initialPage: 0
    }

    state = {
        selectedIndex: this.props.initialPage
    }

    constructor(props) {
        super(props);
        this._preSelectedIndex = props.initialPage;
        this._contentHorOffset = 0;
        this._currentMaxHor = screenWidth;
        this._titleCount = props.titles.length || 0;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.selectedIndex != nextState.selectedIndex ||
            this.props.titles + '' != nextProps.titles + '' ||
            this.props.style != nextProps.style ||
            this.props.itemStyle != nextProps.itemStyle ||
            this.props.itemTextStyle != nextProps.itemTextStyle ||
            this.props.selectedItemTextStyle != nextProps.selectedItemTextStyle ||
            this.props.selectedBorderStyle != nextProps.selectedBorderStyle
        this.props.borderStyle != nextProps.borderStyle
    }

    render() {
        let {titles, pager, itemStyle, selectedItemStyle, itemTextStyle, selectedItemTextStyle, selectedBorderStyle, borderStyle, titleParent} = this.props
        if (!titles || titles.length === 0) return null

        let titleViews = titles.map((title, index) => {
            let isSelected = this.state.selectedIndex === index

            const itemMargin = (itemStyle && itemStyle.marginLeft) || DEFAULT_ITEM_MARGIN;
            const itemMarginObj =
                index < this._titleCount - 1
                    ? {marginLeft: itemMargin}
                    : {marginLeft: itemMargin, marginRight: itemMargin};

            const titleView = this.props.renderTitle ? this.props.renderTitle(index, title, isSelected) : (
                <Text
                    style={isSelected ? [selectedItemTextStyle ? selectedItemTextStyle : styles.titleTextSelected] : [itemTextStyle ? itemTextStyle : styles.titleText]}>
                    {title}
                </Text>
            )

            return (
                <TouchableOpacity
                    style={[styles.titleContainer, itemMarginObj, isSelected ? selectedItemStyle : itemStyle]}
                    activeOpacity={0.6}
                    key={index}
                    onLayout={e => {
                        itemLayoutInfo[index] = e.nativeEvent;
                    }}
                    onPress={() => {
                        if (this.props.trackScroll === true) {
                            this._visibleDetect(index);
                        }
                        !isSelected && pager.setPage(index)
                    }
                    }
                >
                    <View style={isSelected ? (selectedBorderStyle ? selectedBorderStyle : styles.selectedBorder) : (borderStyle ? borderStyle : styles.border)}>
                        {titleView}
                    </View>
                </TouchableOpacity>
            )
        })
        return (
            <View style={[styles.indicatorContainer, this.props.style]}>
                <ScrollView
                    scrollEventThrottle={1}
                    onScroll={e => {
                        this._contentHorOffset = e.nativeEvent.contentOffset.x;
                        this._currentMaxHor = screenWidth + this._contentHorOffset;
                    }}
                    showsHorizontalScrollIndicator={false}
                    ref={c => {
                        this.scroller = c;
                    }}
                    horizontal={true}
                    style={{flex: 1}}
                >
                    <View style={titleParent ? titleParent : styles.titleParent}>
                        {titleViews}
                    </View>
                </ScrollView>
            </View>
        )
    }

    _visibleDetect(selectedIndex) {
        const curItemLayoutInfo = itemLayoutInfo[selectedIndex];
        const {width, x: curItemOffsetX} = curItemLayoutInfo.layout;
        const curItemAbsPosition = width + curItemOffsetX + DEFAULT_ITEM_MARGIN; // add on margin

        let moveDir = NONE;
        if (selectedIndex > this._preSelectedIndex) {
            moveDir = FORWARD;
        } else if (selectedIndex < this._preSelectedIndex) {
            moveDir = BACKWARD;
        }

        if (moveDir === FORWARD) {
            //indicator move forward
            let lastItemOffsetX;
            let lastItemAbsPosition;
            if (selectedIndex < this._titleCount - 1) {
                const nextLayoutInfo = itemLayoutInfo[selectedIndex + 1];
                const width = nextLayoutInfo.layout.width;
                lastItemOffsetX = nextLayoutInfo.layout.x;
                lastItemAbsPosition = width + lastItemOffsetX + DEFAULT_ITEM_MARGIN;
            } else if (selectedIndex === this._titleCount - 1) {
                lastItemOffsetX = curItemOffsetX;
                lastItemAbsPosition = curItemAbsPosition;
            }
            if (this._contentHorOffset > lastItemOffsetX) {
                const deltaX = curItemOffsetX - DEFAULT_ITEM_MARGIN;
                this.scroller.scrollTo({x: deltaX});
            } else if (this._currentMaxHor < lastItemAbsPosition) {
                const deltaX = lastItemAbsPosition - this._currentMaxHor;
                this.scroller.scrollTo({x: this._contentHorOffset + deltaX});
            }
        } else if (moveDir === BACKWARD) {
            //indicator move back
            let lastItemOffsetX;
            let lastItemAbsPosition;
            if (selectedIndex > 0) {
                const nextLayoutInfo = itemLayoutInfo[selectedIndex - 1];
                const width = nextLayoutInfo.layout.width;
                lastItemOffsetX = nextLayoutInfo.layout.x;
                lastItemAbsPosition = width + lastItemOffsetX + DEFAULT_ITEM_MARGIN;
            } else if (selectedIndex === 0) {
                lastItemOffsetX = curItemOffsetX;
                lastItemAbsPosition = curItemAbsPosition;
            }
            if (this._contentHorOffset > lastItemOffsetX || this._currentMaxHor < curItemAbsPosition) {
                const deltaX = lastItemOffsetX - DEFAULT_ITEM_MARGIN;
                this.scroller.scrollTo({x: deltaX});
            }
        }
    }

    onPageSelected(e) {
        if (this.props.trackScroll === true) {
            this._visibleDetect(e.position);
        }
        this._preSelectedIndex = e.position;
        this.setState({selectedIndex: e.position})
    }
}

const styles = StyleSheet.create({
    indicatorContainer: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#f3f3f3'
    },
    titleText: {
        color: '#333333',
        width: screenWidth / 2,
        textAlign: 'center',
        fontSize: 16,
    },
    titleTextSelected: {
        color: '#2e97fd',
        width: screenWidth / 2,
        textAlign: 'center',
        fontSize: 16
    },
    titleContainer: {},
    border: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        borderRadius: 100,
    },
    selectedBorder: {
        backgroundColor: '#2e97fd',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        borderRadius: 100,
    },
    titleParent: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
    }
})
