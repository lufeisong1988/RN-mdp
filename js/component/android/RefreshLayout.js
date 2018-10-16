import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    View,
    requireNativeComponent
} from 'react-native'
const RCTRefreshLayout = requireNativeComponent('AndroidRefreshLayout',{
    propTypes:{
        ...View.propTypes
    }
});
module.exports =RCTRefreshLayout;
