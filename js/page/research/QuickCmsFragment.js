import React,{Component} from 'react'
import {
    View,
    SectionList
} from 'react-native'
import CmsItemComponent from '../../component/research/CmsItemComponent'
import CmsSectionComponent from '../../component/research/CmsSectionComponent'
export default class QuickCmsFragment extends Component{
    constructor(props){
        super(props);
        this.state={
            selectSectionKey:0
        }
    }
    render(){
        return(
            <SectionList
                onViewableItemsChanged={(info) => this._onViewableItemsChanged(info)}
                stickySectionHeadersEnabled={true}
                renderItem={({item, index, section}) => <CmsItemComponent/>}
                renderSectionHeader={(info) => <CmsSectionComponent info={info} selectSectionKey={this.state.selectSectionKey}/>}
                sections={[
                    {key:0,title: "Title1", data: ['1', '2', '3', '4']},
                    {key:1,title: "Title2", data: ['a', 'b', 'c', 'd']},
                    {key:2,title: "Title3", data: ['A', 'B', 'C', 'D']},
                    {key:3,title: "Title4", data: ['q', 'w', 'e', 'r']},
                    {key:4,title: "Title5", data: ['z', 'x', 'c', 'v']},
                ]}
                keyExtractor={(item, index) => item + index}
            />
        )
    }
    _onViewableItemsChanged = (info) => {
        this.setState({
            selectSectionKey:info.viewableItems[0].section.key
        })
    }
}