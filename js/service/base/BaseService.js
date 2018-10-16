import React,{Component} from "react";
import {NetUitl} from "../../utils/NetUtil"

class BaseService extends React.Component{
    static baseGet(url,params,f1,f2){
        NetUitl.get(url,params,function (result) {
            if(result.errorCode == "0"){
                f1(result.result);
            }else{
                f2(result.errorCode,result.errorDesc);
            }
        })
    };
    static basePost(url,params,f1,f2){
        NetUitl.post(url,params,null,function (result) {
            if(result.errorCode == "0"){
                f1(result.resultObject);
            }else{
                f2(result.errorCode,result.errorDesc);
            }
        })
    }
};
export {BaseService};