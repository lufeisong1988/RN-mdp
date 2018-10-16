import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    requireNativeComponent
} from 'react-native'
const RCTMdpHeader = requireNativeComponent('RCTMdpHeader',{
    propTypes:{
        ...View.propTypes
    }
});
module.exports =RCTMdpHeader;
