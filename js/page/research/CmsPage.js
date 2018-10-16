import React,{Component} from 'react'
import {
    View,
    Text,
    Dimensions,
    SectionList
} from 'react-native'
import PagerTitleIndicator from '../../../lib/viewpager/indicator/PagerTitleIndicator'
import IndicatorViewPager from '../../../lib/viewpager/IndicatorViewPager'
import TrendDetailComponent from '../../component/strategy/TrendDetailComponent'
import UserLevelNoticeComponent from '../../component/UserLevelNoticeComponent'
import * as styles from '../../AppStyles'
import QuickCmsFragment from './QuickCmsFragment'
import CommonCmsFragment from './CommonCmsFragment'

/**
 * main研究
 */
const screenWidth = Dimensions.get('window').width;
export default class CmsPage extends Component{
    constructor() {
        super()

    }
    render(){
        return(
            <View style={{flex: 1,backgroundColor:'white'}}>
                <IndicatorViewPager style={{flex: 1, flexDirection: 'column-reverse', marginTop: 20}}
                                    indicator={this._renderTitleIndicator()}>
                    <View>
                        <View style={styles.CommonStyles.line}/>
                        <QuickCmsFragment/>
                    </View>
                    <View>
                        <View style={styles.CommonStyles.line}/>
                        <CommonCmsFragment/>
                    </View>
                    <View>
                        <View style={styles.CommonStyles.line}/>
                        <CommonCmsFragment/>
                    </View>
                    <View>
                        <View style={styles.CommonStyles.line}/>
                        <CommonCmsFragment/>
                    </View>
                </IndicatorViewPager>
            </View>
        )
    }
    _renderTitleIndicator() {
        return <PagerTitleIndicator
            style={{height: 30,backgroundColor:'white'}}
            titleParent={{justifyContent:'flex-start',width:screenWidth, flexDirection:'row',marginLeft:13}}
            itemStyle={{paddingLeft:7,paddingRight:7, alignItems: 'center',justifyContent:'space-between'}}
            selectedItemStyle={{paddingLeft:7,paddingRight:7, alignItems: 'center',justifyContent:'space-between'}}
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
            titles={['快报', '每日焦点', '产业跟踪','独家观点']}/>;
    }

}