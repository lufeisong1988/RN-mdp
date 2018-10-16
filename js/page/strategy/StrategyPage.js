import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions
} from 'react-native'
import {connect} from 'react-redux'

import PagerTitleIndicator from '../../../lib/viewpager/indicator/PagerTitleIndicator'
import PagerTitleBgIndicator from '../../../lib/viewpager/indicator/PagerTitleBgIndicator'
import IndicatorViewPager from '../../../lib/viewpager/IndicatorViewPager'
import UserLevelNoticeComponent from '../../component/UserLevelNoticeComponent'
import TrendDetailFragment from './TrendDetailFragment'

import * as styles from '../../AppStyles'

import  * as UserInfoType from '../../action/UserInfoType'
import * as StrategyInitType from '../../action/StrategyInitType'

import  {getUserInfoAction} from '../../action/UserInfoAction'
import  StrategyInitAction from '../../action/StrategyInitAction'


/**
 * main风控
 */
const {width, height} = Dimensions.get('window')
let _this = null;
let fristIndex = 0;//第一栏目下标
let folderId = '';//二级目录id
class StrategyPage extends Component {
    constructor() {
        super();
        _this = this;
        this.state={
            delay:true
        }
    }

    componentDidMount(){
        this.props.onGetUserInfo() && this.props.onGetUserInfo();
        setTimeout(function () {
            const one = _this.refs.one;
            const two = _this.refs.two;
            const ss = '';
        },10000)

    }

    render() {
        return (
            <View style={styles.StrategyStyles.bg}>

                <IndicatorViewPager style={styles.StrategyStyles.indicator}

                                    indicator={this._renderTitleIndicator()}>
                    <View>
                        <View style={styles.CommonStyles.line}/>
                        <IndicatorViewPager style={[styles.StrategyStyles.indicator, {marginTop: 13}]}
                                            onPageSelected={(event)=>this._onPageSelectSecond(event)}
                                            indicator={this._renderSecondTitleIndicator(this.props.spotFolderList)}>
                            {this._renderSecondView(this.props.spotFolderList)}
                        </IndicatorViewPager>
                    </View>
                    <View>
                        <View style={styles.CommonStyles.line}/>
                        <TrendDetailFragment tokenId={_this.props.userInfo.tokenId} style={{marginTop: 3}}/>
                    </View>
                    <View>
                        <View style={styles.CommonStyles.line}/>
                        <UserLevelNoticeComponent/>
                    </View>
                </IndicatorViewPager>
            </View>
        )
    }

    /**
     * 渲染一级目录导航
     * @returns {XML}
     * @private
     */
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
            titles={['现货策略', '套利图景', '头寸报表']}/>;
    }

    /**
     * 渲染二级目录导航
     * @returns {XML}
     * @private
     */
    _renderSecondTitleIndicator(items) {
        var data = [];
        items.map(function (item) {
           data=[...data,item.name]
        });
        return <PagerTitleBgIndicator
            style={{height: 24, backgroundColor: 'white'}}
            itemStyle={{width: 54, alignItems: 'center', justifyContent: 'space-between'}}
            selectedItemStyle={{width: 54, alignItems: 'center', justifyContent: 'space-between'}}
            itemTextStyle={{
                color: '#757A81',
                textAlign: 'center',
                fontSize: 13,
            }}
            selectedItemTextStyle={{
                color: 'white',
                textAlign: 'center',
                fontSize: 13,
            }}
            borderStyle={{
                backgroundColor: 'white',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                justifyContent: 'center',
                borderRadius: 100,
            }}
            selectedBorderStyle={{
                backgroundColor: '#2e97fd',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                justifyContent: 'center',
                borderRadius: 100,
            }}
            titles={data}/>;
    }

    /**
     * 渲染二级目录下的页面
     * @private
     */
    _renderSecondView(items){
        var renderView = items.map(function (item,index) {
            return(
                <View key={index}>
                    <TrendDetailFragment folderId={item.folderId} tokenId={_this.props.userInfo.tokenId} style={{marginTop: 3}}/>
                </View>
            )
        });
        return renderView
    };
    _onPageSelectSecond(event){

    }
}
const state = (state) => {
    if(state.UserInfo.status == UserInfoType.GET_USER_INFO || state.UserInfo.status == UserInfoType.UPDATE_USER_INFO){
        _this.props.onStrategyInit(_this.props.userInfo.tokenId)
    }
    switch (state.StrategyInit.status){
        case StrategyInitType.GET_STRATEGYINIT_SUCCEED:
            break;
    }
    return{
        userInfo:state.UserInfo,
        spotFolderList:state.StrategyInit.spotFolderList,
        auths:state.StrategyInit.auths,

    }
};
const dispatch= (dispatch) => {
    return{
        onGetUserInfo:()=>{
            dispatch(getUserInfoAction())
        },
        onStrategyInit:(tokenId)=>{
            dispatch(StrategyInitAction(tokenId));
        },
    }
};
export default connect(state,dispatch)(StrategyPage)