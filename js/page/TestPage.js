import React,{Component} from 'react'
import {
    View,
    Dimensions,
    Text,
    FlatList,
    ScrollView,
} from 'react-native'
import {SmartRefreshControl,ClassicsHeader,StoreHouseHeader,DefaultHeader} from 'react-native-smartrefreshlayout';
// import RefreshLayout from '../component/android/RefreshLayout'
import MdpHeader from '../component/android/MdpHeader'
// import RefreshCustomHeader from '../component/android/RefreshCustomHeader'
const {width,height} = Dimensions.get('window')
export default class TestPage extends Component{
    render(){
        return(
            <View style={{flex:1}}>

                <ScrollView style={{width:width,flex:1}}
                    refreshControl={<SmartRefreshControl
                        ref={refreshcontrol=>this.refreshControl=refreshcontrol}
                        HeaderComponent={<MdpHeader/>}
                        onRefresh={()=>{
                            setTimeout(()=>{
                                this.refreshControl && this.refreshControl.finishRefresh();
                            },4000)
                        }}
                    />}
                >
                </ScrollView>
            </View>
        )
    }
}