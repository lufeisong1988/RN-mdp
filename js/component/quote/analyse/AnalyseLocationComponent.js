import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    SectionList,
    Dimensions,
    FlatList,
    StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

/**
 * 成交分析
 * 地域显示控件
 */
let _this = null;
const {width, height} = Dimensions.get('window')
export default class AnalyseLocationComponent extends Component {
    constructor(props) {
        super(props)
        _this = this;
        this.state = {
            id:0,
            showItem: false,
        }
    }

    static propTypes = {
        items: PropTypes.array,
        onItemCallback:PropTypes.func,
    };

    render() {
        return (
            <View style={[this.props.style, {flex: 1}]}>
                <View style={[styles.bg,{display: this.state.showItem ? 'flex' : 'none'}]}>
                    <View  style={styles.locationBg}>
                        <FlatList
                            data={this.props.items}
                            renderItem={this._renderItem}
                        />
                    </View>
                </View>
            </View>
        )
    }

    tableOnPress() {
        this.setState({
            showItem: !this.state.showItem,
        })
    }
    _renderItem=({item,index})=>{
        return(
            <TouchableWithoutFeedback key={index} onPress={()=>this._itemOnPress(index,item)}>
                <View style={styles.itemBg}>
                    <Text style={styles.text}>{item.areaName}</Text>
                    {index == this.state.id ? <Image style={styles.img}
                                                     source={require('../../../../res/img/icon_inline_choose.png')}/> : null}
                </View>
            </TouchableWithoutFeedback>
        )
    };
    _itemOnPress(index,item){
        this.setState({
            id:index
        });
        this.props.onItemCallback && this.props.onItemCallback(item.areaId);
        this.tableOnPress();
    }
}
const styles = StyleSheet.create({
    bg:{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        height: height,
    },
    locationBg:{
        width:width,
        height:200,
        backgroundColor:'white'
    },
    itemBg:{
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        height: 44,
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#D2D2DA'
    },
    text:{
        fontSize: 13,
        color: '#757A81'
    },
    img:{
        width: 16,
        height: 16
    }
});
