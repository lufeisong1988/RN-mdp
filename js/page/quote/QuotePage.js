import React, {Component} from 'react'
import {
    View,
    Text,
    SectionList,
    Dimensions,
    ScrollView,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import PagerTitleIndicator from '../../../lib/viewpager/indicator/PagerTitleIndicator'
import IndicatorViewPager from '../../../lib/viewpager/IndicatorViewPager'
import QuoteMapFragment from './QuoteMapFragment'
import AnalyseFragment from './AnalyseFragment'
import QuoteTrendFragment from './QuoteTrendFragment'

import * as styles from '../../AppStyles'
/**
 * 报价
 */
let _this = null;
const {width} = Dimensions.get('window');
export default class QuotePage extends Component {
    constructor() {
        super();
        _this = this;
        this.state = {
            selectSectionKey: 0
        }
    }

    render() {
        return (
            <View style={styles.QuoteStyles.bg}>
                <IndicatorViewPager style={styles.QuoteStyles.indicatorBg}
                                    indicator={this._renderTitleIndicator()}>
                    <View style={{position: 'relative'}}>
                        <QuoteMapFragment/>
                    </View>
                    <View>
                        <QuoteTrendFragment/>
                    </View>
                    <View>
                        <AnalyseFragment/>
                    </View>
                </IndicatorViewPager>
            </View>
        )
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator
            style={{height: 35, backgroundColor: 'white'}}
            itemStyle={{width: 80, alignItems: 'center', justifyContent: 'space-between'}}
            selectedItemStyle={{width: 80, alignItems: 'center', justifyContent: 'space-between'}}
            itemTextStyle={{
                color: '#757A81',
                textAlign: 'center',
                fontSize: 15,
            }}
            selectedItemTextStyle={{
                color: '#26272A',
                textAlign: 'center',
                fontSize: 15,
            }}
            borderStyle={{
                backgroundColor: 'white',
                height: 2,
                width: 10,
            }}
            selectedBorderStyle={{
                backgroundColor: '#26272A',
                height: 2,
                width: 10,
            }}
            titles={['报价地图', '报价趋势', '成交分析']}/>;
    }

    _onViewableItemsChanged = (info) => {
        this.setState({
            selectSectionKey: info.viewableItems[0].section.key
        });
        console.log('key = ' + info.viewableItems[0].section.key)
    };
    _onPressRefreshPriceWebView(){
        this.refs.myRef.getWrappedInstance().onRefresh()
    }
}