/**
 * NetUitl 网络请求的实现
 * https://github.com/facebook/react-native
 */
import React, {Component} from 'react';

var CryptoJS = require("crypto-js");

class NetUitl extends React.Component {

    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url, params, callback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log("status = " + responseJSON.status + " errCode = " + responseJSON.errCode + " errMessage = " + responseJSON.errMessage + " zh_errMessage = " + responseJSON.zh_errMessage)
                callback(responseJSON)

            }).done();
    }

    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(url, params, headers, callback) {
        console.log('post ========= params : ' + JSON.stringify(params));
        let formParams = {
            'clientinfo_devicevendor': 'HONOR',
            'tokenId': '',
            'clientinfo_os': 'Android',
            'clientinfo_deviceid': 'c68e9d2c5fedee4bef664c6b5b02a35b',
            'clientinfo_osversion': '6.0.1',
            'clientinfo_channel': 'baidu',
            'registrationId': '190e35f7e04ae5a0e3e',
            'clientinfo_appname': '买豆粕',
            'clientinfo_devicename': 'KIW-TL00H/6.0.1',
            'clientinfo_appversion': '4.0.0',
            ...params,
        };
        // console.log('post ========= url : ' + url + " start formParams ====== " + JSON.stringify(formParams) + " ======= formParams end");
        let formData = new FormData();
        let requestJSON = this._dedStr(JSON.stringify(formParams));
        // console.log('post = ' + url + " start requestJSON ====== " + requestJSON + " ======= requestJSON end");
        formData.append('requestJSON',requestJSON);
        //fetch请求
        fetch(url, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log('post = ' + url + " start result ====== "  + JSON.stringify(responseJSON) + " ======= result end");
                callback(responseJSON)
            }).done();
    }

    //DES加密
    static _dedStr(input){
        var key = 'abcdefgh';
        // Encrypt
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.DES.encrypt(input, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
}

export {NetUitl};