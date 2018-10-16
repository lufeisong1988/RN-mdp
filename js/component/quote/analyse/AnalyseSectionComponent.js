import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import PropTypes from 'prop-types'

/**
 * 成交分析
 * 列表section
 */
export default class AnalyseSectionComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            show:false,
        }
    }
    static propTypes = {
        selectSectionKey: PropTypes.any,
        info: PropTypes.any,
        rightPress: PropTypes.func,

    }
    static defaultProps = {
        selectSectionKey: ''
    }

    render() {
        return (
            <View style={styles.bg}>
                <Text style={styles.time}>{this.props.info.section.date}</Text>
                <View style={[styles.rightBg,{display: this.props.info.section.date == this.props.selectSectionKey ? 'flex' : 'none'}]}>
                    <Text onPress={()=>this._locationPress()} style={[styles.location,{color: this.state.show?'#408AFF':'#757A81'}]}>全部地区</Text>
                    <Image style={styles.img} source={this.state.show?require('../../../../res/img/icon_inline_up.png'):require('../../../../res/img/icon_inline_down.png')}/>
                </View>
            </View>
        )
    }
    _locationPress(){
        this.props.rightPress();
        this.setState({
            show:!this.state.show
        })
    }
}
const styles = StyleSheet.create({
    bg: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#F9FAFB'
    },
    time:{
        fontSize: 15,
        color: '#26272A'
    },
    rightBg:{
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    location:{
        fontSize: 13,
    },
    img:{
        width: 22,
        height: 22,
    }
});