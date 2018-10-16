import React,{Component} from 'react'
var CryptoJS = require("crypto-js");
export default class StringUtil extends Component{
    /**
     * 字符串是否为空
     * @param str
     * @returns {boolean}
     */
    static isEmpty(str){
        if(str == null || str.length == 0){
            return true
        }
        return false
    }

    /**
     * 手机号码正确
     * @param phone
     * @returns {boolean}
     */
    static isPhone(phone){
        if(this.isEmpty(phone)){
            return false
        }
        let reg = /^1[3|4|5|7|8][0-9]{9}/;
        if(reg.test(phone)){
            return true;//
        }
        return false;
    }

    /**
     * DES加密
     * @param input
     * @returns {string}
     * @private
     */
    static desStr(input){
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