import React, {Component} from 'react'
import {
    View,
    Image,
    Dimensions,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native'
import MyButtonComponent from '../../../component/MyButtonComponent'
import * as styles from '../../../AppStyles'
import NavigationWithArrow from '../../../component/navigation/NavigationWithArrow'


import {connect} from 'react-redux'
import getActivityDetailAction from '../../../action/ActivityDetailAction'

const screenWidth = Dimensions.get('window').width
let _this = null;

class ActivityDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            item: props.navigation.state.params.item,
        };
        _this = this;
        this.props.onGetActivityDetail(this.state.item.id, 'dd97e63491a225d3b9c4bd867194a79b')
    }

    componentDidMount() {
        let imageSource = this.state.item.coverPictureUrl;
        Image.getSize(imageSource, (width, height) => {
            //取得图片的宽高，并进行相应的处理
            //......
            this.setState({
                height: height * screenWidth / width
            })
        }, (error) => {
            //下载图片失败
            console.log(error);
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <NavigationWithArrow navigation={this.props.navigation} middleChild={this._renderMidChild()} rightChild={this._renderRightChild()}>
                <View style={[styles.ActivityStyles.activityDetailBg]}>
                    <ScrollView style={{flex: 1}}>
                        <Image ref='image' style={{width: screenWidth, height: this.state.height}}
                               source={{uri: this.state.item.coverPictureUrl}}/>
                        <View style={[styles.ActivityStyles.activityDetailContentBg]}>
                            <Text style={styles.ActivityStyles.activityDetailTitle}>
                                活动主题:
                                <Text
                                    style={styles.ActivityStyles.activityDetailText}>{this.props.activityDetail.theme}</Text>
                            </Text>
                            <Text style={styles.ActivityStyles.activityDetailTitle}>
                                活动概要:
                                <Text
                                    style={styles.ActivityStyles.activityDetailText}>{this.props.activityDetail.summary}</Text>
                            </Text>
                            <Text style={styles.ActivityStyles.activityDetailTitle}>
                                活动场所:
                                <Text
                                    style={styles.ActivityStyles.activityDetailText}>{this.props.activityDetail.activeLocation}</Text>
                            </Text>
                            <Text style={styles.ActivityStyles.activityDetailTitle}>
                                活动时间:
                                <Text
                                    style={styles.ActivityStyles.activityDetailText}>{this.props.activityDetail.activeTime}</Text>
                            </Text>
                            <Text style={[styles.ActivityStyles.activityDetailTitle]}>
                                报名截止:
                                <Text
                                    style={styles.ActivityStyles.activityDetailText}>{this.props.activityDetail.applyEndTime}</Text>
                            </Text>
                            <Text style={[styles.ActivityStyles.activityDetailTitle]}>
                                主讲简介:
                                <Text
                                    style={styles.ActivityStyles.activityDetailText}>{this.props.activityDetail.presenterDesc}</Text>
                            </Text>
                            <Text style={[styles.ActivityStyles.activityDetailTitle]}>
                                开放对象:
                                <Text
                                    style={styles.ActivityStyles.activityDetailText}>{this.props.activityDetail.openObject}</Text>
                            </Text>
                            <Text style={[styles.ActivityStyles.activityDetailTitle]}>
                                收费说明:
                                <Text
                                    style={styles.ActivityStyles.activityDetailText}>{this.props.activityDetail.chargeNote}</Text>
                            </Text>
                            <Text style={[styles.ActivityStyles.activityDetailTitle, {marginBottom: 68}]}>
                                活动联系:
                                <Text
                                    style={styles.ActivityStyles.activityDetailText}>{this.props.activityDetail.contact}</Text>
                            </Text>
                        </View>
                    </ScrollView>
                    <MyButtonComponent title='活动报名' bgStyle={styles.ActivityStyles.activityDetailButtom} onPressFunc={() => {
                        return navigate('activityJoinPage')
                    }}></MyButtonComponent>
                </View>
            </NavigationWithArrow>
        )
    }
    _renderMidChild = () => {
        return(
            <Text style={{color:'#26272A',fontSize:15}}>活动详情</Text>
        )
    }
    _renderRightChild = () => {
        return(
            <TouchableWithoutFeedback>
                <Image style={{ width: 32, height:32}} source={require('../../../../res/img/navigition/icon_nav_shear.png')}/>
            </TouchableWithoutFeedback>
        )
    }
}

const state = (state) => {
    return {
        activityDetail: state.ActivityDetail.detail,
    }
}
const action = (dispatch) => {
    return {
        onGetActivityDetail: (activeId, tokenId) => {
            dispatch(getActivityDetailAction(activeId, tokenId))
        }
    }
}
export default connect(state, action)(ActivityDetailPage)