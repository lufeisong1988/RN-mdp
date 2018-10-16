/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//appName 必须与ios和android注册的name一样
AppRegistry.registerComponent(appName, () => App);
