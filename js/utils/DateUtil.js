import React,{Component} from 'react'
export default class DateUtil extends Component{
    static parseYYYYmmToMM(yyyyMM){
        let mm ='01'
        // if(yyyyMM.length >= 5){
        //     mm = yyyyMM.substring(4,yyyyMM.length)
        // }else{
        //     return yyyyMM
        // }
        return mm
    }
    static formatDate(date,fmt){
        if(/(y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
        }
        let o = {
            'M+':date.getMonth() + 1,
            'd+':date.getDate(),
            'h+':date.getHours(),
            'm+':date.getMinutes(),
            's+':date.getSeconds()
        };

        // 遍历这个对象
        for(let k in o){
            if(new RegExp(`(${k})`).test(fmt)){
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return fmt;
    }
}