import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Image,
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
//main 栏目分类
import HomePage from '../page/home/HomePage'
import CmsPage from '../page/research/CmsPage'
import QuotePage from '../page/quote/QuotePage'
import StrategyPage from '../page/strategy/StrategyPage'
import CirclePage from '../page/circle/CirclePage'

export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'首页'
        }
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <TabNavigator>
                    {this._renderTabarItems('首页', require('../../res/img/tabBar/bar_shouye_unSelected.png'), require('../../res/img/tabBar/bar_shouye_selected.png'), HomePage)}
                    {this._renderTabarItems('研究', require('../../res/img/tabBar/bar_yanjiu_unSelected.png'), require('../../res/img/tabBar/bar_yanjiu_selected.png'), CmsPage)}
                    {this._renderTabarItems('报价', require('../../res/img/tabBar/bar_baojia_unSelected.png'), require('../../res/img/tabBar/bar_baojia_selected.png'), QuotePage)}
                    {this._renderTabarItems('风控', require('../../res/img/tabBar/bar_strategy_unSelected.png'), require('../../res/img/tabBar/bar_strategy_selected.png'), StrategyPage)}
                    {this._renderTabarItems('产业圈', require('../../res/img/tabBar/bar_industryCircle_unSelected.png'), require('../../res/img/tabBar/bar_industryCircle_selected.png'), CirclePage)}
                </TabNavigator>

            </View>
        )
    }

    _renderTabarItems(selectedTab, icon, selectedIcon, Component) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={selectedTab}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={icon}/>}
                renderSelectedIcon={() => <Image style={styles.icon} source={selectedIcon}/>}
                onPress={() => this.setState({selectedTab: selectedTab})}
            >
                <Component navigation={this.props.navigation}/>
            </TabNavigator.Item>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    tabText: {
        color: '#9FA4AB',
        fontSize: 9
    },
    selectedTabText: {
        color: '#408AFF'
    },
    icon: {
        width: 20,
        height: 20
    }
})
