import React, {Component} from 'react'
import {
    View,
    SectionList,
    Image,
    Dimensions,
    Text,
} from 'react-native'
import ViewPager from '../../../lib/vhviewpager/ViewPager'
import CommonCmsItemComponent from '../../component/research/CommonCmsItemComponent'
import CommonCmsSectionComponent from '../../component/research/CommonCmsSectionComponent'

/**
 * 研究
 * 通用资讯模板
 * @type {null}
 * @private
 */
let _this = null;
const screenWidth = Dimensions.get('window').width;
export default class CommonCmsFragment extends Component {
    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            selectSectionKey: 0
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{height: 130}}>
                    <ViewPager horizontal={true} viewPagerWidth={screenWidth}
                               viewPagerHeight={130} scorllDistance={110}>
                        {this._renderHeaderList(['1', '2', '3', '4', '5'])}
                    </ViewPager>
                </View>
                <SectionList
                    stickySectionHeadersEnabled={true}
                    ItemSeparatorComponent={() => this._renderSeparator()}
                    renderItem={({item, index, section}) => <CommonCmsItemComponent/>}
                    renderSectionHeader={(info) => <CommonCmsSectionComponent info={info}
                                                                              selectSectionKey={this.state.selectSectionKey}/>}
                    sections={[
                        {key: 0, title: "Title1", data: ['1', '2', '3', '4']},
                        {key: 1, title: "Title2", data: ['a', 'b', 'c', 'd']},
                        {key: 2, title: "Title3", data: ['A', 'B', 'C', 'D']},
                        {key: 3, title: "Title4", data: ['q', 'w', 'e', 'r']},
                        {key: 4, title: "Title5", data: ['z', 'x', 'c', 'v']},
                    ]}
                    onViewableItemsChanged={(info) => this._onViewableItemsChanged(info)}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        )
    }

    //渲染头部分类
    _renderHeaderList(items) {
        let render = items.map(function (item, key) {
            return (
                <View key={key} style={{
                    marginTop: 20,
                    marginBottom: 20,
                    marginRight: 20,
                    marginLeft: key == 0 ? 20 : 0,
                    width: 90,
                    height: 90,
                    position: 'relative',
                }}>
                    <Image style={{width: 90, height: 90}}
                           source={require('../../../res/img/icon/icon_default_head.png')}/>
                    <Text style={{
                        color: '#FFFFFF',
                        fontSize: 12,
                        position: 'absolute',
                        left: 8,
                        bottom: 8,
                        backgroundColor: 'transparent'
                    }}>买豆粕早报</Text>
                </View>
            )
        })
        return render;
    }

    _renderSeparator() {
        return (
            <View style={{marginLeft: 20, marginRight: 20, flex: 1, height: 0.5, backgroundColor: '#F1F3F4'}}/>
        )
    }

    _onViewableItemsChanged = (info) => {
        this.setState({
            selectSectionKey: info.viewableItems[0].section.key
        })
    }
}