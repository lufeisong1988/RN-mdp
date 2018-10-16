import React,{Component} from 'react'
import {
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
} from 'react-native'
import PagerTitleIndicator from '../../../lib/viewpager/indicator/PagerTitleIndicator'
import IndicatorViewPager from '../../../lib/viewpager/IndicatorViewPager'
import * as styles from '../../AppStyles'
import ActivityItemComponent from '../../component/cicle/ActivityItemComponent'
import {SmartRefreshControl, DefaultHeader} from 'react-native-smartrefreshlayout'
import JFlatList from '../../../lib/JFlatList'


import {connect} from 'react-redux'
import getActivityListAction from '../../action/ActivityListAction'
import * as types from '../../action/ActivityListType'
/**
 * main产业圈
 */
const {width} = Dimensions.get('window');
var _this = null;
const pageSize = 10;
var index = 0;
class CirclePage extends Component{
    constructor(props){
        super(props);
        _this = this;
        this.state={
            activityList:[],
        };
        this.props.onGetActivityList(pageSize.toString(),index.toString())
    }
    render() {
        return (
            <View style={{flex: 1,backgroundColor:'white'}}>
                <IndicatorViewPager style={{flex: 1, flexDirection: 'column-reverse', marginTop: 20}}
                                    indicator={this._renderTitleIndicator()}>
                    <View>
                        <View style={styles.CommonStyles.line}/>
                        <ScrollView style={{width:width,flex:1}}
                                    refreshControl={<SmartRefreshControl
                                        ref={refreshcontrol=>this.refreshControl=refreshcontrol}
                                        HeaderComponent={<DefaultHeader/>}
                                        enableLoadMore={true}
                                        onRefresh={()=>{
                                            index = 0;
                                            this.props.onGetActivityList(pageSize.toString(),index.toString())
                                        }}
                                        onLoadMore={()=>{
                                            this.props.onGetActivityList(pageSize.toString(),index.toString())
                                        }}
                                    />}
                        >
                            <FlatList
                                data={this.state.activityList}
                                extraData={this.state}
                                renderItem={({item})=> {
                                    return(
                                        <ActivityItemComponent navigation={this.props.navigation} item={item}/>
                                    )
                                }}
                            />
                        </ScrollView>

                    </View>
                    <View>
                        <View style={styles.CommonStyles.line}/>
                        <Text>page two</Text>
                    </View>
                </IndicatorViewPager>
            </View>
        )
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator
            style={{height: 35,backgroundColor:'white'}}
            itemStyle={{width: 80, alignItems: 'center',justifyContent:'space-between'}}
            selectedItemStyle={{width: 80, alignItems: 'center',justifyContent:'space-between'}}
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
            titles={['最新活动', '互动问答']}/>;
    }

}

const state = (state) => {
    let tmpActivityList = [];
    switch (state.ActivityList.type){
        case types.GET_ACTIVITYLIST_DEFAULT:
            break;
        case types.GET_ACTIVITYLIST_ING:
            break;
        case types.GET_ACTIVITYLIST_SUCCEED:
            if(index == 0){
                tmpActivityList = state.ActivityList.list
            }else{
                tmpActivityList = [..._this.state.activityList,...state.ActivityList.list]
            }
            _this.setState({
                activityList:tmpActivityList
            });
            if(index == 0){
                _this.refreshControl && _this.refreshControl.finishRefresh();
                if(state.ActivityList.list.length < pageSize){
                    _this.refreshControl && _this.refreshControl.setNoMoreData(true);
                }else{
                    _this.refreshControl && _this.refreshControl.setNoMoreData(false);
                    index++
                }
            }else{
                if(state.ActivityList.list.length < pageSize){
                    _this.refreshControl && _this.refreshControl.finishLoadMore(0,true,true);
                }else{
                    _this.refreshControl && _this.refreshControl.finishLoadMore(0,true,false);
                    index++
                }
            }

            break;
        case types.GET_ACTIVITYLIST_FAIL:
            if(index == 0){
                _this.refreshControl && _this.refreshControl.finishRefresh(0,false);
            }else{
                _this.refreshControl && _this.refreshControl.finishLoadMore(0,false,false);
            }
            break;
    }
    return{
        tmp:'empty',
    }
};
const action = (dispatch) => {
    return{
        onGetActivityList:(pageSize,pageNum)=>{
            dispatch(getActivityListAction(pageSize,pageNum))
        }
    }
}
export default connect(state,action)(CirclePage)