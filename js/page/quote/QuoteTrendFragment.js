import React, {Component} from 'react'
import {
    View,
    SectionList,
    Dimensions,
    ScrollView,
    WebView
} from 'react-native'
import {connect} from 'react-redux'

import * as styles from '../../AppStyles'
import TrendTopComponent from '../../component/quote/trend/TrendTopComponent'
import TrendItemComponent from '../../component/quote/trend/TrendItemComponent'
import TrendSectionComponent from '../../component/quote/trend/TrendSectionComponent'
import {SmartRefreshControl, DefaultHeader} from 'react-native-smartrefreshlayout'

import TrendDomainAndTypeAction from '../../action/TrendDomainAndTypeAction'
import * as TrendDomainAndType from '../../action/TrendDomainAndType'
import AllQuoteAction from '../../action/AllQuoteAction'
import * as AllQuoteType from '../../action/AllQuoteType'
import {getUserInfoAction} from '../../action/UserInfoAction'
import * as UserInfoType from '../../action/UserInfoType'

import StringUtil from '../../utils/StringUtil'

/**
 * 报价趋势
 */
const {width} = Dimensions.get('window');
var _this = null;
var currentPage = 0;//当前下标
const maxPageNum = 10;
var domainId = 0;
var domainName = '';
var typeId = 0;
class QuoteTrendFragment extends Component {
    constructor(){
        super();
        _this = this;
        this.state={
            allQuote:[]
        }
    }
    componentDidMount(){
        this.props.onGetUserInfo && this.props.onGetUserInfo();
    }
    render() {
        return (
            <View style={{position: 'relative',flex:1}}>
                <View style={styles.CommonStyles.line}/>
                <SmartRefreshControl
                    style={{ marginTop: 44}}
                    ref={refreshcontrol => this.refreshControl = refreshcontrol}
                    HeaderComponent={<DefaultHeader/>}
                    enableLoadMore={true}
                    onRefresh={this._onRefresh.bind(this)}
                    onLoadMore={this._onLoadMore.bind(this)}>
                        <SectionList
                            ListHeaderComponent={this._renderListHeader()}
                            stickySectionHeadersEnabled={true}
                            renderSectionHeader={({section: {title}}) => <TrendSectionComponent />}
                            renderItem={({item, index, section}) => <TrendItemComponent item={item}/>}
                            sections={[
                                {
                                    title: "Title1",
                                    data: [...this.state.allQuote]
                                },
                            ]}
                            keyExtractor={(item, index) => item + index}
                        />

                </SmartRefreshControl>
                <TrendTopComponent domainAndType={this.props.domainAndType} selectCallback={(domainId,typeId,domainName)=>this._onSelectCallback(domainId,typeId,domainName)}
                    style={{position: 'absolute', left: 0, top: 0, right: 0}}></TrendTopComponent>
            </View>
        )
    }

    /**
     * 渲染listview头部
     * @returns {XML}
     * @private
     */
    _renderListHeader(){
        return(<WebView ref="trendWebView" style={{height: 181}} source={require('../../../assets/ResourcesOffer/resourcesOffer.html')}/>)
    }
    _onRefresh(){
        currentPage = 0;
        this.props.onGetAllQuote(this.props.userInfo.tokenId,domainId,typeId,currentPage.toString())
        this._postMessage();
    }
    _onLoadMore(){
        this.props.onGetAllQuote(this.props.userInfo.tokenId,domainId,typeId,currentPage.toString())
    }

    /**
     * 选中item回调
     * @param tmpDomainId
     * @param tmpTypeId
     * @private
     */
    _onSelectCallback(tmpDomainId,tmpTypeId,tmpDomainName){
        domainId = tmpDomainId;
        domainName = tmpDomainName;
        typeId = tmpTypeId;
        this._onRefresh();
    }

    /**
     * 发送信息给html
     * @private
     */
    _postMessage(){
        const request = this._toHtmlRequest()
        const data = {
            'request':request,
            'domainName':domainName
        };
        this.refs.trendWebView.postMessage(JSON.stringify(data));
    }
    /**
     * 转换html需要的参数
     * @private
     */
    _toHtmlRequest(){
        const params = {
            'tokenId':this.props.userInfo.tokenId,
            'domainId':domainId,
        };
        const str = JSON.stringify(params);
        return StringUtil.desStr(str);
    }

}
const state = (state)=>{
    if(state.UserInfo.status == UserInfoType.GET_USER_INFO || state.UserInfo.status == UserInfoType.UPDATE_USER_INFO){
        _this.props.onGetDomainAndType && _this.props.onGetDomainAndType();
    }
    if(state.TrendDomainAndType.status == TrendDomainAndType.GET_TRENDDOMAINANDTYPE_SUCCEED){
        if(state.TrendDomainAndType.domainAndType.domains && state.TrendDomainAndType.domainAndType.productType && state.TrendDomainAndType.domainAndType.domains.length > 0 && state.TrendDomainAndType.domainAndType.productType.length > 0){
            domainId = state.TrendDomainAndType.domainAndType.domains[0].id;
            domainName = state.TrendDomainAndType.domainAndType.domains[0].name;
            typeId = state.TrendDomainAndType.domainAndType.productType[0].id;
            _this._onRefresh()
        }
    }
    switch(state.AllQuote.status){
        case AllQuoteType.GET_ALLQUOTE_ING:
            break;
        case AllQuoteType.GET_ALLQUOTE_SUCCEED:
            if(currentPage == 0){
                _this.setState({
                    allQuote:state.AllQuote.allQuote
                })
            }else{
                _this.setState({
                    allQuote:[..._this.state.allQuote,...state.AllQuote.allQuote]
                })
            }
            if(currentPage == 0){
                _this.refreshControl && _this.refreshControl.finishRefresh();
                if(state.AllQuote.allQuote.length < maxPageNum){
                    _this.refreshControl && _this.refreshControl.setNoMoreData(true);
                }else{
                    _this.refreshControl && _this.refreshControl.setNoMoreData(false);
                    currentPage++
                }
            }else{
                if(state.AllQuote.allQuote.length < maxPageNum){
                    _this.refreshControl && _this.refreshControl.finishLoadMore(0,true,true);
                }else{
                    _this.refreshControl && _this.refreshControl.finishLoadMore(0,true,false);
                    currentPage++
                }
            }
            break;
        case AllQuoteType.GET_ALLQUOTE_FAIL:
            if(currentPage == 0){
                _this.refreshControl && _this.refreshControl.finishRefresh(0,false);
            }else{
                _this.refreshControl && _this.refreshControl.finishLoadMore(0,false,false);
            }
            break;
        default:
            break;
    }
    return{
        domainAndType:state.TrendDomainAndType.domainAndType,
        userInfo:state.UserInfo,
    }
};
const dispatch = (dispatch) => {
    return {
        onGetUserInfo:()=>dispatch(getUserInfoAction()),
        onGetDomainAndType:()=>dispatch(TrendDomainAndTypeAction()),
        onGetAllQuote:(tokenId,domainId,productType,currentPage)=>dispatch(AllQuoteAction(tokenId,domainId,productType,currentPage))
    }
};
export default connect(state,dispatch)(QuoteTrendFragment)