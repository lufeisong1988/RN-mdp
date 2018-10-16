import React,{Component} from 'react'
import {
    View,
    Text,
    Image,
} from 'react-native'
import PropTypes from 'prop-types'
export default class TableImageComponent extends Component{
    static propTypes={
        tableTitle:PropTypes.string,
        tableTip:PropTypes.string,
        image:PropTypes.any,
    };
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={[this.props.style,{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:'#26272A',fontSize:15,marginLeft:10}}>{this.props.tableTitle}</Text>
                    <Text style={{color:'#9FA4AB',fontSize:15,marginLeft:10}}>{this.props.tableTip}</Text>
                </View>

                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={this.props.image} style={{height:55,width:55,marginRight:5}}/>
                    <Image source={require('../../res/img/icon/arrow_rgt_grey.png')} style={{marginRight:10}}/>
                </View>
            </View>
        )
    }
}