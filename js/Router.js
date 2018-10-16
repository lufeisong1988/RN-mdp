import React from 'react';
import {Image, StyleSheet} from 'react-native'
import {StackNavigator} from 'react-navigation'
import TabNavigator from 'react-native-tab-navigator'
import IndexPage from './page/IndexPage'
import GuidancePage from './page/GuidancePage'
//main 栏目分类
import MainPage from './page/MainPage'
import HomePage from './page/home/HomePage'
import CmsPage from './page/research/CmsPage'
import QuotePage from './page/quote/QuotePage'
import StrategyPage from './page/strategy/StrategyPage'
import CirclePage from './page/circle/CirclePage'
//commonWebview
import CommonWebViewPage from './page/CommonWebViewPage'
//user
import LoginAndRegisterPage from './page/user/LoginAndRegisterPage'
import PswResetPage from './page/user/PswResetPage'
import PswForgetPage from './page/user/PswForgetPage'
import PswSetPage from './page/user/PswSetPage'
import UserSettingPage from './page/user/UserSettingPage'
import UserSettingNamePage from './page/user/UserSettingNamePage'
import UserSettingIntroPage from './page/user/UserSettingIntroPage'
//circle
import ActivityDetailPage from './page/circle/activity/ActivityDetailPage'
import ActivityJoinPage from './page/circle/activity/ActivityJoinPage'

import TestPage from './page/TestPage'

import {RefreshAndLoadingExample} from './RefreshAndLoadingExample'
const styels = StyleSheet.create(
    {
        tabBarImage: {
            width: 24,
            height: 24,
            marginTop: 8,
        },
        tabBarIcon: {
            height: 32,
        },

        tabBarLabel: {
            fontSize: 12,
            marginBottom: 8,
            marginTop: 4,
        },
        tabBarItem: {
            height: 56,
        },
    }
);
/**
 * @废弃
 * main页面
 */

const mainNavPage = TabNavigator(
    {
        home: {
            screen: HomePage,
            navigationOptions: {
                tabBarLabel: '首页',
                tabBarIcon: (
                    <Image style={styels.tabBarImage} source={require('../res/img/tabBar/bar_shouye_selected.png')}/>
                ),
            },
        },
        cms: {
            screen: CmsPage,
            navigationOptions: {
                tabBarLabel: '研究',
                tabBarIcon: (
                    <Image style={styels.tabBarImage} source={require('../res/img/tabBar/bar_yanjiu_unSelected.png')}/>
                ),
            },
        },
        quote: {
            screen: QuotePage,
            navigationOptions: {
                tabBarLabel: '报价',
                tabBarIcon: (
                    <Image style={styels.tabBarImage} source={require('../res/img/tabBar/bar_baojia_unSelected.png')}/>
                ),
            },
        },
        strategy: {
            screen: StrategyPage,
            navigationOptions: {
                tabBarLabel: '风控',
                tabBarIcon: (
                    <Image style={styels.tabBarImage}
                           source={require('../res/img/tabBar/bar_strategy_unSelected.png')}/>
                ),
            },
        },
        circle: {
            screen: CirclePage,
            navigationOptions: {
                tabBarLabel: '产业圈',
                tabBarIcon: (
                    <Image style={styels.tabBarImage}
                           source={require('../res/img/tabBar/bar_industryCircle_unSelected.png')}/>
                ),
            },
        }
    },
    {
        tabBarPosition: 'bottom',//设置在底部
        swipeEnabled: false,//不可滑动
        tabBarOptions: {
            showIcon: true,//展示tab icon
            indicatorStyle: {
                height: 0,//隐藏底部白色导航线
            },
            inactiveTintColor: 'black',
            activeTintColor: '#2e97fd',//点击tab title 颜色
            style: {
                height: 50,
                backgroundColor: 'white',
            },
            tabStyle: styels.tabBarItem,
            labelStyle: styels.tabBarLabel,
            iconStyle: styels.tabBarIcon,
        }
    }
);
const appNav = StackNavigator({
        indexPage: {
            screen: IndexPage,
            navigationOptions: {
                header: null,//隐藏顶部navigation
            }
        },
        guidancePage: {
            screen: GuidancePage,
            navigationOptions: {
                header: null,
                gesturesEnabled: false,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        mainPage: {
            screen: MainPage,
            navigationOptions: {
                header: null,//隐藏顶部navigation
                gesturesEnabled: false,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        loginAndRegisterPage:{
            screen:LoginAndRegisterPage,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        pswResetPage:{
            screen:PswResetPage,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        pswForgetPage:{
            screen:PswForgetPage,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        pswSetPage:{
            screen:PswSetPage,
            navigationOptions: {

                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        userSettingPage:{
            screen:UserSettingPage,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        userSettingNamePage:{
            screen:UserSettingNamePage,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        userSettingIntroPage:{
            screen:UserSettingIntroPage,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        activityDetailPage:{
            screen:ActivityDetailPage,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        activityJoinPage:{
            screen:ActivityJoinPage,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        commonWebViewPage:{
            screen:CommonWebViewPage,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        testPage:{
            screen:TestPage,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        },
        refreshPage:{
            screen:RefreshAndLoadingExample,
            navigationOptions: {
                header:null,
                gesturesEnabled: true,//是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            }
        }
    },
    {
        mode: 'card',//跳转风格 card-modal
    },
);

export default appNav