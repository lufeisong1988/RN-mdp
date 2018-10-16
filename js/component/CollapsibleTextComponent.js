import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Image, StyleSheet, Animated,
} from 'react-native'
import PropTypes from 'prop-types'

export default class CollapsibleTextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            lines: null,
            measureFlag: false,
            expandShow: false,
            expand: false,
            renderAble: false,
        };
        this.init = false;
    }

    static propTypes = {
        lines:PropTypes.number
    };
    static defaultProps = {
        lines:3
    };
    render() {
        return (
            <View style={{flex: 1}}>
                <Text
                    numberOfLines={this.state.lines}
                    onLayout={this._onLayout.bind(this)}
                    style={[this.props.style]}>{this.state.title}</Text>

                {this.state.expandShow ?
                    <Text onPress={this._expand.bind(this)}
                        style={{fontSize: 12,color:'#9FA4AB',flex:1,textAlign:'right',marginRight:2}}>{this.state.expand ? '展开' : '收起'}</Text>
                    : null}

            </View>
        )
    }

    _onLayout(event) {
        if (this.init)
            return;
        if (!this.state.measureFlag) {
            this.maxHeight = event.nativeEvent.layout.height;
            this.setState({
                measureFlag: true,
                lines: this.props.lines,
            })
        } else {
            this.init = true;
            this.minHeight = event.nativeEvent.layout.height;
            if (this.minHeight >= this.maxHeight) {
                this.setState({
                    lines: null,
                    expand: false,
                    expandShow: false,
                    renderAble: true,
                })
            } else {
                this.setState({
                    lines: this.props.lines,
                    expand: true,
                    expandShow: true,
                    renderAble: true,
                })
            }
        }
    }

    _expand() {
        if (this.state.expand) {
            this.setState({
                lines: null,
                expand: !this.state.expand
            })
        } else {
            this.setState({
                lines: this.props.lines,
                expand: !this.state.expand
            })
        }

    }


}

