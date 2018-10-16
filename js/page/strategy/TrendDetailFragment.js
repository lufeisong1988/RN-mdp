import React, {Component} from 'react'
import {
    View,
    WebView,
    Image,
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

import StringUtil from '../../utils/StringUtil'
import * as Styles from '../../AppStyles'

import StrategyService from '../../service/StrategyService'

/**
 * webview，内容详情组件
 *
 */


export default class TrendDetailFragment extends Component {
    folderId = '';
    tokenId = '';
    currentDate = ''//当前查询的日期
    mSpotNameSelectIndex = 0;//当前右侧标签选择的下标
    getStrageTragetWithIndex = false;//是否需要传递index给html
    constructor(props) {
        super(props);
        this.state = {
            strategyTraget: null,
            article:'',

        };
        this.folderId = props.folderId;
        this.tokenId =props.tokenId;
    }

    render() {
        return (
            <View style={[this.props.style, {flex: 1}]}>
                <View style={Styles.StrategyFragmentStyles.webViewBg}>
                    <WebView ref="webView" style={Styles.StrategyFragmentStyles.webViewBg}
                             onMessage={(e) =>
                                 this._reciverMessageFromHtml(e,this)
                             }
                             onLoad={()=>{this._load(this)}}
                             source={require('../../../assets/strategy/index.html')}/>
                </View>
                <View style={Styles.StrategyFragmentStyles.contentBg}>
                    <Image style={Styles.StrategyFragmentStyles.waterMark}
                           source={require('../../../res/img/strategy/watermark.png')}/>
                    <View style={Styles.StrategyFragmentStyles.content}>
                        <ScrollView style={Styles.StrategyFragmentStyles.contentScrollView}>
                            <Text onPress={() => {
                            }} style={Styles.StrategyFragmentStyles.contentText}>{this.state.article}</Text>
                        </ScrollView>
                        <View style={Styles.StrategyFragmentStyles.tipBg}>
                            <Text style={Styles.StrategyFragmentStyles.tipText}>本预测仅供参考，不为任何投资行为负责。</Text>
                            <Image style={Styles.StrategyFragmentStyles.tipImage}
                                   source={require('../../../res/img/strategy/maidoupo_logo.png')}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    /**
     * webview加载完毕
     * @private
     */

    _load(mThis) {
        mThis._getStrageTraget(mThis,'');
        mThis.refs.webView.postMessage(JSON.stringify({'key': 'showSpotView', 'value': {'visiable': false,'folderId':mThis.folderId }}))
    }

    /**
     * 获取页卡下的数据
     * @param date
     * @private
     */
    _getStrageTraget(mThis,date) {
        let params = {
            'date': date,
            'folderId': mThis.folderId,
            'tokenId': mThis.tokenId,
        };
        StrategyService.strategyGetTraget(params, function (result) {
            mThis.currentDate = result.date;
            if (result.targets && result.targets.length > 0) {
                var names = [];
                result.targets.map(function (item) {
                    names = [...names, item.name]
                });
                if (mThis.getStrageTragetWithIndex) {
                    const tmpTargetId = mThis.state.strategyTraget.targets[mThis.mSpotNameSelectIndex].targetId;
                    result.targets.map(function (item, index) {
                        if (tmpTargetId == item.targetId) {
                            mThis.mSpotNameSelectIndex = index;
                        }
                    });
                    mThis.refs.webView.postMessage(JSON.stringify({
                        'key': 'updateSpotTargetWithIndex',
                        'value': {'names': names.toString(), 'index': mThis.mSpotNameSelectIndex}
                    }))
                } else {
                    const target = result.targets[mThis.mSpotNameSelectIndex];
                    mThis.refs.webView.postMessage(JSON.stringify({
                        'key': 'updateSpotTarget',
                        'value': {'names': names.toString()}
                    }));
                    mThis._getStrageTragetData(mThis,mThis.currentDate,  target.code, target.dataUrlParam, target.targetId.toString());
                }
            }
            mThis.setState({
                strategyTraget: result
            })
        }, function (errorCode, errorDes) {

        })
    }

    /**
     * 获取曲线图数据
     * @private
     */
    _getStrageTragetData(mThis,date, code, dataUrlParam, targetId) {
        let params = {
            'date': date,
            'folderId': mThis.folderId,
            'targetId': targetId,
            'code': code,
            'dataUrlParam': dataUrlParam,
            'tokenId': mThis.tokenId,
        };
        StrategyService.strategyGetTragetData(params, function (result) {
            var date = [];
            var price = [];
            var point = [];
            var minY = 0;
            var maxY = 0;
            var items = result.view;
            items.map(function (item, index) {
                date = [...date, item.date];
                price = [...price, item.price];
                point = [...point, item.point];
                if (!StringUtil.isEmpty(item.price)) {
                    var tmpPrice = new Number(item.price);
                    if (index == 0) {
                        minY = tmpPrice;
                        maxY = tmpPrice;
                    }
                    if (tmpPrice < minY) {
                        minY = tmpPrice;
                    }
                    if (tmpPrice > maxY) {
                        maxY = tmpPrice;
                    }
                }
            });

            mThis.refs.webView.postMessage(JSON.stringify({
                'key': 'updateSpotDate',
                'value': {
                    'date': date.toString(),
                    'price': price.toString(),
                    'point': point.toString(),
                    'minY': minY,
                    'maxY': maxY,
                    'currentDate': mThis.currentDate
                }
            }));
        }, function (errorCode, errorDes) {

        })
    }

    /**
     * 获取文章内容
     * @param date
     * @param folderId
     * @param tokenId
     * @private
     */
    _getStrageTragetPaper(mThis,date) {
        let params = {
            'date': date,
            'folderId': mThis.folderId,
            'tokenId': mThis.tokenId,
        };

        StrategyService.strategyGetPaper(params, function (result) {
            mThis.setState({
                article:result.article
            })
        }, function (errorCode, errorDes) {
        })

    }

    /**
     * 从html接受参数
     * @param data
     * @private
     */
    _reciverMessageFromHtml(event,mThis) {
        const json = JSON.parse(event.nativeEvent.data);
        const key = json.key;
        const value = json.value;
        console.log('app folderId = ' + mThis.folderId + + " key = " +  key);
        if (key == 'spotPaperEmpty') {
            alert('该分类下当日没有策略文章')
        } else if (key == 'spotTargetUnexistAndPaperExist') {
            mThis.currentDate = value.currentDate;
            mThis._getStrageTragetPaper(mThis,mThis.currentDate)
        } else if (key == 'spotTargetExistUnChooseAndPaperExist') {
            mThis.getStrageTragetWithIndex = false;
            mThis.currentDate = value.currentDate;
            mThis.mSpotNameSelectIndex = 0;
            mThis._getStrageTraget(mThis,mThis.currentDate);
        } else if (key == 'spotTargetChooseAndPaperExist') {
            mThis.getStrageTragetWithIndex = true;
            mThis.currentDate = value.currentDate;
            mThis.mSpotNameSelectIndex = value.mSpotNameSelectIndex;
            mThis._getStrageTragetPaper(mThis,mThis.currentDate)
            mThis._getStrageTraget(mThis,mThis.currentDate);
            console.log('html folderId = ' + value.folderId);
        } else if (key == 'updateSpotTargetData') {
            mThis.mSpotNameSelectIndex = value.mSpotNameSelectIndex;
            const target = mThis.state.strategyTraget.targets[mThis.mSpotNameSelectIndex];
            mThis._getStrageTragetData(mThis,mThis.currentDate,  target.code, target.dataUrlParam, target.targetId.toString())
        }
    }

}


