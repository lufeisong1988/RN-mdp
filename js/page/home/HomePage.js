import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native'
import Swiper from 'react-native-swiper';
import * as styles from '../../AppStyles'
import ViewPager from '../../../lib/vhviewpager/ViewPager'
import {connect} from 'react-redux'
import {SmartRefreshControl, DefaultHeader} from 'react-native-smartrefreshlayout'

import AdAction from '../../action/AdAction'
import NoticeAction from '../../action/NoticeAction'
import RecommendAction from '../../action/RecommedAction'
import QuoteForAppAction from '../../action/QuoteForAppAction'
import ArticleAction from '../../action/ArticleAction'
import {
    getUserInfoAction,
} from '../../action/UserInfoAction'
import * as UserInfoType from '../../action/UserInfoType'

import CmsService from '../../service/CmsService'
import DateUtil from '../../utils/DateUtil'


/**
 * main首页
 */
const {width} = Dimensions.get('window');
let _this = null;

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
            article: [],
            // navigation:props.navigation,
        }
    }

    componentDidMount() {
        _this = this;
        //防止在安卓上swiper在Scrollview，TabNavigation里不显示bug
        setTimeout(() => {
            this.setState({
                swiperShow: true
            });
        }, 0);
        this.props.onGetUserInfo();
        this.props.onGetAd();
        this.props.onGetNotice();
        this.props.onGetRecommend();
        this.props.onGetQuoteForApp();
        this.props.onGetArticle();
        _getInfoTab();
    }

    render() {
        if (!this.state.swiperShow)
            return (
                <Text>刷新中</Text>
            );
        return (

            <ScrollView style={{width: width, flex: 1}}
                        refreshControl={<SmartRefreshControl
                            ref={refreshcontrol => this.refreshControl = refreshcontrol}
                            HeaderComponent={<DefaultHeader/>}
                            onRefresh={() => {
                                this.props.onGetAd();
                                this.props.onGetNotice();
                                this.props.onGetRecommend();
                                this.props.onGetQuoteForApp();
                                this.props.onGetArticle();
                                _getInfoTab();
                            }
                            }
                        />}
            >
                {this._renderUserView()}

                <View style={{width: width, height: 170,}}>
                    <Swiper showsButtons={false} autoplay={true}
                            paginationStyle={{bottom: 10}} dot={<View style={styles.HomePageStyles.dot}/>}
                            activeDot={<View style={styles.HomePageStyles.activeDot}/>} autoplayTimeout={3}>
                        {this._renderBannerView(this.props.ad.ads)}
                    </Swiper>
                </View>

                <View style={[styles.HomePageStyles.notice_bg, styles.CommonStyles.commonPadding]}>
                    <Image style={styles.HomePageStyles.notice_icon}
                           source={require('../../../res/img/icon_notice.png')}/>
                    <Text style={styles.HomePageStyles.notice_text}>公告</Text>
                    <Swiper showsButtons={false} autoplay={true} horizontal={false}
                            automaticallyAdjustContentInsets={true}
                            showsPagination={false} autoplayTimeout={3}>
                        {this._renderNoticeView(this.props.notice.notices)}
                    </Swiper>
                </View>

                <View style={styles.HomePageStyles.line}/>

                <View style={[styles.HomePageStyles.recommed_bg, styles.CommonStyles.commonPadding]}>
                    <Image style={{marginBottom: 5}} source={require('../../../res/img/icon_recommend.png')}/>
                    {this._renderRecommedContentView(this.props.recommend.recommends)}
                </View>

                <View style={styles.HomePageStyles.quote_bg}>
                    <View style={styles.HomePageStyles.quote_label}>
                        <Text style={{fontSize: 18, color: 'black'}}>最新报价</Text>
                        <Text style={{fontSize: 13, color: '#757A81'}}>更多报价</Text>
                    </View>
                    <ViewPager style={{marginTop: 15}} horizontal={true} viewPagerWidth={width}
                               viewPagerHeight={96} scorllDistance={258}>
                        {this._renderQuoteItemView(this.props.quote.quotes)}
                    </ViewPager>
                </View>

                {this._renderArticleView(this.state.article)}
            </ScrollView>

        )
    }


    /**
     * 渲染用户信息
     * @returns {XML}
     * @private
     */
    _renderUserView = () => {
        return (
            <View style={[styles.HomePageStyles.user_bg, styles.CommonStyles.commonPadding]}>
                <TouchableWithoutFeedback onPress={() => this._onPressUserInfo()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={styles.HomePageStyles.user_icon}
                               source={this.props.userInfo.isLogin ? {uri: this.props.userInfo.portraitUrl} : require('../../../res/img/icon/icon_default_head.png')}/>
                        <Text
                            style={styles.HomePageStyles.user_text}>{this.props.userInfo.isLogin ? this.props.userInfo.name : '还未登录'}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={styles.HomePageStyles.message}
                           source={require('../../../res/img/topbar/icon_right_message.png')}/>
                    <Image style={styles.HomePageStyles.phone}
                           source={require('../../../res/img/topbar/icon_right_phone.png')}/>
                </View>
            </View>
        )
    };

    //点击头像事件
    _onPressUserInfo() {
        this.props.userInfo.isLogin ? alert('登录') : this.props.navigation.navigate('loginAndRegisterPage')
    }

    /**
     * 渲染banner图item
     * @param items
     * @returns {Array|*|Object}
     * @private
     */
    _renderBannerView = (items) => {
        const render = items.map(function (item, id) {
            return (
                <Image key={id} style={{width: width, height: 170, borderRadius: 4}}
                       source={{uri: item.picture, cache: 'force-cache'}}
                       resizeMode='contain'/>
            )
        });
        return render;
    };
    /**
     * 渲染通知文本item
     * @param item
     * @returns {Array|*|Object}
     * @private
     */
    _renderNoticeView = (item) => {
        const render = item.map(function (item, id) {
            return (
                <View key={id} style={styles.HomePageStyles.notice_content_bg}>
                    <Text style={styles.HomePageStyles.notice_content}>{item.title}</Text>
                </View>
            )
        });
        return render;
    };
    /**
     * 渲染为你推荐item
     * @param items
     * @returns {Array|*|Object}
     * @private
     */
    _renderRecommedContentView = (items) => {
        const render = items.map(function (item, id) {
            return (
                <TouchableWithoutFeedback key={id} onPress={() => {
                    _this.props.navigation.navigate('commonWebViewPage', {uri: item.url})
                }}>
                    <View>

                        <View style={{height: 66, justifyContent: 'center'}}>
                            <View style={styles.HomePageStyles.recommed_content_bg}>
                                <View style={{borderRadius: 3, width: 6, height: 6, backgroundColor: 'red'}}></View>
                                <Text style={styles.HomePageStyles.recommed_content}
                                      numberOfLines={1}>{item.title}</Text>
                            </View>
                            <Text style={styles.HomePageStyles.recommed_time}>{item.showTime}</Text>
                        </View>
                        {id < (items.length - 1) ? <View style={styles.HomePageStyles.recommed_line}/> : null}

                    </View>
                </TouchableWithoutFeedback>
            )
        });
        return render;
    };

    /**
     * 渲染最新报价
     * @param items
     * @returns {Array|*|Object}
     * @private
     */
    _renderQuoteItemView(items) {
        const render = items.map(function (item, id) {
            return (
                <View key={id} style={styles.HomePageStyles.quote_item}>
                    <View style={styles.HomePageStyles.quote_item_left}>
                        <Text style={{color: '#FFFFFF', fontSize: 15}}>{item.productName} {item.factoryName}</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 15}}>{item.proteinSpec}
                            | {DateUtil.parseYYYYmmToMM(item.deliveryDate)}</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 12}}></Text>
                    </View>
                    <View style={styles.HomePageStyles.quote_item_right}>
                        <Text style={{color: '#FFFFFF', fontSize: 20}}>{item.showPrice}</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 12}}>{item.price}</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 12}}>{item.deliveryLocation}</Text>
                    </View>
                </View>
            )
        });
        return render;
    }

    /**
     * 渲染资讯 01
     * @param items
     * @returns {Array|*|Object}
     * @private
     */
    _renderArticleView(items) {
        const render = items.map(function (item, id) {
            return (
                <View key={id} style={styles.HomePageStyles.article_bg}>
                    <View style={[styles.CommonStyles.commonMargin, styles.HomePageStyles.article_label]}>
                        <Text style={{color: '#252729', fontSize: 18}}>{item.folderName}</Text>
                        <Text style={{color: '#757A81', fontSize: 13}}>更多</Text>
                    </View>
                    {_this._renderArticleItemView(item.articles)}
                    <View style={[styles.HomePageStyles.line, {marginTop: 20}]}/>
                </View>
            )
        });
        return render;
    }

    /**
     * 渲染资讯02
     * @param items
     * @returns {Array|*|Object}
     * @private
     */
    _renderArticleItemView(items) {
        const render = items.map(function (item, id) {
            return (
                <TouchableWithoutFeedback key={id} onPress={() => this._toArticleDetail(item)}>
                    <View style={[styles.CommonStyles.commonPadding, styles.HomePageStyles.article_item_bg]}>
                        <Image style={{width: 85, height: 85}} source={{uri: item.picUrl}}/>
                        <View style={styles.HomePageStyles.article_item_right}>
                            <View>
                                <Text style={{color: '#252729', fontSize: 16}} numberOfLines={2}>{item.title}</Text>
                                <Text style={{marginTop: 5, color: '#757A81', fontSize: 13}}
                                      numberOfLines={1}>{item.summary}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image style={{width: 48, height: 12}} source={{uri: item.tag}}/>
                                    <Image style={{marginLeft: 6, width: 18, height: 12}}
                                           source={{uri: item.minGradePic}}/>
                                </View>
                                <Text style={{color: '#757A81', fontSize: 12}} numberOfLines={1}>{item.timeDesc}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        });
        return render;
    }
}


/**
 * 获取cms栏目分类
 */
_getInfoTab = () => {
    let tmpArticle = [];
    CmsService.getInfoTab(function (result) {
        result && result.map(function (item) {
            let params = {
                'folderId': item.folderId,
                'currentPage': 0,
                'tokenId': _this.props.userInfo.tokenId,
            };
            CmsService.getArticles(item.folderId, item.name, params, function (folderId, name, result) {
                tmpArticle.push({folderId: folderId, folderName: name, articles: _sliceArticles(result)});
                _this.setState({
                    article: tmpArticle
                })
            }, function (errorCode, errorDes) {

            })
        })

        console.log('=====end=====')
        _this.refreshControl && _this.refreshControl.finishRefresh()
    }, function (errorCode, errorDes) {

    })
};
/**
 * 刷选3条出来
 * @param articles
 * @returns {Blob|ArrayBuffer|Array.<T>|string}
 * @private
 */
_sliceArticles = (articles) => {
    return articles.slice(0, 3)
};
/**
 * 跳转资讯详情页面
 *
 * @param item
 * @private
 */
_toArticleDetail = (item) => {
    const {navigate} = _this.props.navigation;
    if (item.hasAuthority == 'true') {
        navigate('commonWebViewPage', {'uri': item.articleUrl})
    } else {
        navigate('loginAndRegisterPage')
    }

};
let ad, notice, recommend, quote, article, userInfo;
const state = (state) => {
    ad = state.Ad;
    notice = state.Notice;
    recommend = state.Recommend;
    quote = state.QuoteForApp;
    article = state.Article;
    userInfo = state.UserInfo;
    if (userInfo.status == UserInfoType.UPDATE_USER_INFO) {
        _this.props.onGetUserInfo();
        _this.props.onGetAd();
        _this.props.onGetNotice();
        _this.props.onGetRecommend();
        _this.props.onGetQuoteForApp();
        _this.props.onGetArticle();
        _getInfoTab();
    }
    return {
        ad: ad,
        notice: notice,
        recommend: recommend,
        quote: quote,
        article: article,
        userInfo: userInfo,
    }
};
const dispatch = (dispatch) => {
    return {
        onGetUserInfo: () => {
            dispatch(getUserInfoAction())
        },
        onGetAd: () => {
            dispatch(AdAction())
        },
        onGetNotice: () => {
            dispatch(NoticeAction())
        },
        onGetRecommend: () => {
            dispatch(RecommendAction())
        },
        onGetQuoteForApp: () => {
            dispatch(QuoteForAppAction())
        },
        onGetArticle: (folderId, currentPage, tokenId) => {
            dispatch(ArticleAction(folderId, currentPage, tokenId));
        },
    }
};

export default connect(state, dispatch)(HomePage)