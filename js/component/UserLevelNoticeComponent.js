import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
} from 'react-native'

export default class UserLevelNoticeComponent extends Component {
    render() {
        return (
            <View style={{flex: 1, position: 'relative'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{height: 114, width: 114}} source={require('../../res/img/permisison_need.png')}/>
                    <Text style={{fontSize: 17, color: '#26272A'}}>您的会员等级不够</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <Text style={{fontSize: 13, color: '#26272A', textAlign: 'center'}}>
                            升级到
                        </Text>
                        <Image style={{marginLeft: 5, marginRight: 5, height: 12, width: 7}}
                               source={require('../../res/img/permisison_need.png')}/>
                        <Text style={{fontSize: 13, color: '#26272A', textAlign: 'center'}}>
                            黄金会员 即可查看内容
                        </Text>
                    </View>
                    <Text style={{fontSize:14, color: '#26272A', marginTop: 10}}>如何升级 ></Text>
                </View>
                <Text style={{left: 30, right: 30, bottom: 30,position:'absolute',color:'#757A81',fontSize:12}}>
                    提供跨期、跨品种以及内外盘套利建议和日度跟踪，基于产业数据的深度挖掘，胜率保持业内领先。
                </Text>
            </View>
        )
    }
}