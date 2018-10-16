import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    SectionList,
    Dimensions,
    StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import TrendSelectLabelComponent from './TrendSelectLabelComponent'
/**
 * 报价趋势
 * 顶部控件
 */
let _this = null;
const {width,height} = Dimensions.get('window');
export default class TrendTopComponent extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            items: [],
            categoryIndex:0,//0:点击左侧，1:点击右侧
            leftIndex: 0,//左侧点击下标
            rightIndex: 0,//右侧点击下边
            showItem: false,//是否展示item列表
            selectIndex:0,//当前展示item选择的下标
        }
    }
    static propTypes = {
        domainAndType:PropTypes.any,
        selectCallback:PropTypes.func,
    };
    static defaultProps ={
        domainAndType:{
            domains:[],
            productType:[]
        }
    };
    render() {
        return (
            <View style={[this.props.style, {flex: 1,}]}>
                <View style={styles.topBg}>
                    <TouchableWithoutFeedback onPress={this._labelLeftOnPress.bind(this)}>
                        <View style={styles.topItem}>
                            <TrendSelectLabelComponent ref='leftLabel' click={false}
                                         style={{borderRightWidth: 0.5, borderColor: '#D2D2DA'}}
                                         title={this.props.domainAndType.domains.length > this.state.leftIndex ? this.props.domainAndType.domains[this.state.leftIndex].name : ''}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this._labelRightOnPress.bind(this)}>
                        <View style={styles.topItem}>
                            <TrendSelectLabelComponent ref='rightLabel' click={false} title={this.props.domainAndType.productType.length > this.state.rightIndex ? this.props.domainAndType.productType[this.state.rightIndex].name : ''}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={[styles.listBg,{
                    display: this.state.showItem ? 'flex' : 'none',
                    height:height,
                }]}>
                    {this._renderCategoryItemList(this.state.items)}
                </View>

            </View>
        )
    }

    _renderCategoryItemList(items) {
        let itemList = items.map(function (item, key) {
            return (
                _this._renderCategoryItem(item, key)
            )
        });
        return itemList
    }

    _renderCategoryItem(item, key) {
        return (
            <TouchableWithoutFeedback key={key} onPress={()=>this._itemOnPress(key)}>
                <View  style={[styles.itemBg,{borderTopWidth: key == 0 ? 0 : 0.5,}]}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    {this.state.selectIndex == key ? <Image style={styles.itemImg}
                                                            source={require('../../../../res/img/icon_inline_choose.png')}/> : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }


    _labelLeftOnPress() {
        const show = this.refs.leftLabel.changeClick();
        this.refs.rightLabel.closeClick();
        this.setState({
            categoryIndex:0,
            showItem: show,
            items:_this.props.domainAndType.domains,
            selectIndex:this.state.leftIndex,
        })

    }

    _labelRightOnPress() {
        const show = this.refs.rightLabel.changeClick();
        this.refs.leftLabel.closeClick();
        this.setState({
            categoryIndex:1,
            showItem: show,
            items: _this.props.domainAndType.productType,
            selectIndex:this.state.rightIndex,
        })
    }

    _itemOnPress(key) {
        var tmpLeftIndex = 0;
        var tmpRightIndex = 0;
        if(this.state.categoryIndex == 0){
            this.setState({
                leftIndex:key,
                selectIndex:key,
                showItem:false
            });
            this.refs.leftLabel.closeClick();
            tmpLeftIndex = key;
            tmpRightIndex = this.state.rightIndex
        }else{
            this.setState({
                rightIndex:key,
                selectIndex:key,
                showItem:false
            });
            this.refs.rightLabel.closeClick();
            tmpLeftIndex = this.state.leftIndex;
            tmpRightIndex = key
        }
        this.props.selectCallback && this.props.selectCallback(this.props.domainAndType.domains[tmpLeftIndex].id,this.props.domainAndType.productType[tmpRightIndex].id,this.props.domainAndType.domains[tmpLeftIndex].name)
    }
}
const styles = StyleSheet.create({
    topBg:{
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#D2D2DA'
    },
    topItem:{
        flex: 1,
        height: 44
    },
    listBg:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    itemBg:{
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        height: 44,
        alignItems: 'center',
        borderTopColor: '#D2D2DA'
    },
    itemText:{
        fontSize: 13,
        color: '#757A81'
    },
    itemImg:{
        width: 16,
        height: 16
    }
});