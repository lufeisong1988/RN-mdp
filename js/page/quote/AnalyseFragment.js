import React, {Component} from 'react'
import {
    View,
    Dimensions,
    SectionList,
} from 'react-native'

import AnalyseSectionComponent from '../../component/quote/analyse/AnalyseSectionComponent'
import AnalyseItemComponent from '../../component/quote/analyse/AnalyseItemComponent'
import AnalyseLocationComponent from '../../component/quote/analyse/AnalyseLocationComponent'
import {SmartRefreshControl, DefaultHeader} from 'react-native-smartrefreshlayout'
import * as styles from '../../AppStyles'

import AnalyseAreaInfoAction from '../../action/AnalyseAreaInfoAction'
import * as AnalyseAreaInfoType from '../../action/AnalyseAreaInfoType'
import AnalyseQuoteListAction from '../../action/AnalyseQuoteListAction'
import * as AnalyseQuoteListType from '../../action/AnalyseQuoteListType'
import {connect} from 'react-redux'

/**
 * 成交分析
 */
var _this = null;
const {width} = Dimensions.get('window');
var pageNum = 0;
var pageSize = 10;
var areaId = 0;

/**
 * 成交分析
 */
class AnalyseFragment extends Component {
    constructor() {
        super();
        _this = this;
        this.state = {
            selectSectionKey: 0,
            quoteList:[],
        };

    }

    componentDidMount() {
        init = true;
        this.props.onGetAnalyseLocation && this.props.onGetAnalyseLocation();
    }

    render() {
        return (
            <View style={{flex: 1, position: 'relative'}}>
                <View style={styles.CommonStyles.line}/>
                <SmartRefreshControl
                    style={{width: width, flex: 1}}
                    ref={refreshcontrol => this.refreshControl = refreshcontrol}
                    HeaderComponent={<DefaultHeader/>}
                    enableLoadMore={true}
                    onRefresh={() => this._onRefresh()}
                    onLoadMore={() => this._loadMore()}>
                    <SectionList
                        ref="analyseSectionList"
                        onViewableItemsChanged={(info) => this._onViewableItemsChanged(info)}
                        stickySectionHeadersEnabled={true}
                        renderItem={({item, index, section}) => <AnalyseItemComponent item={item}/>}
                        renderSectionHeader={(info) => <AnalyseSectionComponent rightPress={() => {this.refs.analyseLocationComponent.tableOnPress()}} ref="analyseSection" info={info} selectSectionKey={this.state.selectSectionKey}/>}
                        sections={this.state.quoteList}
                        keyExtractor={(item, index) => item + index}
                    />
                </SmartRefreshControl>
                <AnalyseLocationComponent ref="analyseLocationComponent"
                                          style={{position: 'absolute', left: 0, top: 44, right: 0}}
                                          items={this.props.analyseAreaInfo} onItemCallback={this._onItemCallback}/>
            </View>
        )
    }

    _onViewableItemsChanged = (info) => {
        this.setState({
            selectSectionKey: info.viewableItems[0].section.date
        });
    };
    _onRefresh(){
        pageNum = 0;
        _this.props.onGetAnalyesQuoteList && _this.props.onGetAnalyesQuoteList(areaId.toString(), pageNum.toString(), pageSize.toString())
    }
    _loadMore(){
        _this.props.onGetAnalyesQuoteList && _this.props.onGetAnalyesQuoteList(areaId.toString(), pageNum.toString(), pageSize.toString())
    }
    _onItemCallback=(tmpAreaId)=>{
        areaId = tmpAreaId;
        this._onRefresh();
    }
}

const state = (state) => {
    if (state.AnalyseAreaInfo.status == AnalyseAreaInfoType.GET_ANALYSEAREAINFO_SUCCEED) {
        areaId = state.AnalyseAreaInfo.analyseAreaInfo[0].areaId;
        _this._onRefresh();
    }
    if(state.AnalyseQuoteList.status == AnalyseQuoteListType.GET_QUOTELIST_SUCCEED){
        let quoteList = _this.state.quoteList;
        const queryQuoteList = state.AnalyseQuoteList.analyseQuoteList;
        if(pageNum == 0){//刷新
            quoteList=[];
            let itemSize = 0;
            queryQuoteList.map(function (item) {
                itemSize+=item.quotes.length;
                quoteList.push({date:item.date,data:item.quotes})
            });
            _this.refreshControl && _this.refreshControl.finishRefresh();
            if(itemSize < pageSize){
                _this.refreshControl && _this.refreshControl.setNoMoreData(true);
            }else{
                _this.refreshControl && _this.refreshControl.setNoMoreData(false);
                pageNum++
            }
        }else{
            let itemSize = 0;
            if(queryQuoteList.length > 0){
                if(quoteList[quoteList.length - 1].date == queryQuoteList[0].date){
                    queryQuoteList.map(function (item,index) {
                        itemSize+=item.quotes.length;
                        if(index == 0){
                            quoteList[quoteList.length - 1].data.push(...item.quotes)
                        }else{
                            quoteList.push({date:item.date,data:item.quotes})
                        }
                    })
                }else{
                    queryQuoteList.map(function (item) {
                        itemSize+=item.quotes.length;
                        quoteList.push({date:item.date,data:item.quotes})
                    })
                }
            }
            if(itemSize < pageSize){
                _this.refreshControl && _this.refreshControl.finishLoadMore(0,true,true);
            }else{
                _this.refreshControl && _this.refreshControl.finishLoadMore(0,true,false);
                pageNum++
            }
        }
        _this.setState({
            quoteList:quoteList
        })
    }else if(state.AnalyseQuoteList.status == AnalyseQuoteListType.GET_QUOTELIST_FAIL){
        if(pageNum == 0){
            _this.refreshControl && _this.refreshControl.finishRefresh(0,false);
        }else{
            _this.refreshControl && _this.refreshControl.finishLoadMore(0,false,false);
        }

    }
    return {
        analyseAreaInfo: state.AnalyseAreaInfo.analyseAreaInfo
    }
};
const dispatch = (dispatch) => {
    return {
        onGetAnalyseLocation: () => dispatch(AnalyseAreaInfoAction()),
        onGetAnalyesQuoteList: (areaId, pageNum, pageSize) => dispatch(AnalyseQuoteListAction(areaId, pageNum, pageSize)),
    }
};
export default connect(state, dispatch)(AnalyseFragment);