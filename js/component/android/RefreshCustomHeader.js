import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    requireNativeComponent
} from 'react-native'
const RCTRefreshCustomHeader = requireNativeComponent('CustomRefreshHeader',{
    propTypes:{
        ...View.propTypes
    }
});
module.exports =RCTRefreshCustomHeader;
