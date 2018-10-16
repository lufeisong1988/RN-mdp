import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native'

export const CustomLoadingStatus = {
    STEP_ONE: 0,
    STEP_TWO: 1,
    STEP_THREE: 2,
    STEP_FOUR: 3,
};
let anmiating = false;
const dotWidth = 4;
export class CustomLoadingView extends View {

    constructor(props) {
        super(props);
        this.state = {
            status: CustomLoadingStatus.STEP_ONE,
            translateAnimate: new Animated.Value(0),
            rotateAnimate: new Animated.Value(0),
        }
    }

    render() {
        return (
            <Animated.View
                style={[styles.background, {
                    position: 'absolute',
                    transform: [{
                        rotateZ: this.state.rotateAnimate.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        }),
                    }],
                }]}
            >
                {this._renderStatusView()}
                <Animated.View
                    style={{
                        flex: 1,
                        position: 'absolute',
                        transform: [{
                            translateY: this.state.translateAnimate.interpolate({
                                inputRange: [0, 1],
                                outputRange: [dotWidth * 4, 0]
                            })
                        }]
                    }}
                >
                    <View style={[styles.dotActive]}/>
                </Animated.View>
            </Animated.View>
        )
    }

    _renderStatusView() {
        switch (this.state.status) {
            case CustomLoadingStatus.STEP_ONE:
                return (
                    <View style={styles.background}>
                        <View style={styles.dot}/>
                        <View style={styles.dot}/>
                        <View style={styles.dot}/>
                    </View>
                );
            case CustomLoadingStatus.STEP_TWO:
                return (
                    <View style={styles.background}>
                        <View style={styles.dot}/>
                        <View style={styles.dot}/>
                        <View style={styles.dotActive}/>
                    </View>
                );
            case CustomLoadingStatus.STEP_THREE:
                return (
                    <View style={styles.background}>
                        <View style={styles.dot}/>
                        <View style={styles.dotActive}/>
                        <View style={styles.dotActive}/>
                    </View>
                );
            case CustomLoadingStatus.STEP_FOUR:
                return (
                    <View style={styles.background}>
                        <View style={styles.dotActive}/>
                        <View style={styles.dotActive}/>
                        <View style={styles.dotActive}/>
                    </View>
                );
        }
    }

    updateStatus(status) {
        this.setState({
            status: status
        })
    }

    startRotate() {
        if(anmiating === true)
            return;
        anmiating = true;
        this.setState({
            status: CustomLoadingStatus.STEP_ONE
        });
        this.state.rotateAnimate.setValue(0);
        this.state.translateAnimate.setValue(0);
        let timing = Animated.timing;
        Animated.sequence(
            [
                timing(this.state.translateAnimate, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.inOut(Easing.linear)
                }),
                timing(this.state.rotateAnimate, {
                    toValue: 0.5,
                    duration: 500,
                    easing: Easing.inOut(Easing.linear)
                }),
                timing(this.state.translateAnimate, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.inOut(Easing.linear)
                }),
                timing(this.state.rotateAnimate, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.inOut(Easing.linear)
                }),
            ]
        ).start(() => {
            if (anmiating === true){
                anmiating = false;
                this.startRotate()
            }
        })
    }

    stopRotate() {
        anmiating = false;
        this.setState({
            status: CustomLoadingStatus.STEP_ONE
        });
        Animated.timing(this.state.rotateAnimate,{toValue:0,duration:10}).start();
        Animated.timing(this.state.translateAnimate,{toValue:0,duration:10}).start();
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        width: dotWidth,
        height: dotWidth * 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dot: {
        backgroundColor: 'red',
        width: dotWidth,
        height: dotWidth,
    },
    dotActive: {
        backgroundColor: 'black',
        width: dotWidth,
        height: dotWidth,
    }
});
