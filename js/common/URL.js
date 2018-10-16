const BASE_URL = "http://139.224.219.149:8080/mobile/";//生产环境

// const BASE_URL = "http://192.168.5.52:8080/mobile/";//UAT环境

/**
 * System
 */
const AD_URL = BASE_URL + 'getInfoRecommend.do';//广告
const NOTICE_URL = BASE_URL + 'getNotice';//公告
const RECOMMEDN_URL = BASE_URL + 'getRecommend';//为你推荐
const SEND_AUTHCODE_URL = BASE_URL + 'sendVerifyCode.do';//发送验证码
const CHECK_AUTHCODE_URL = BASE_URL + 'checkVerifyCode.do.do';//校验验证码
/**
 * 用户
 */
const LOGIN_URL = BASE_URL + "login.do";//登录
const REGISTER_URL = BASE_URL + "register.do";//注册
const UPDATE_PSW_URL = BASE_URL + "updatePwdByForget.do";//更新密码
const UPDATE_USERINFO_URL = BASE_URL + "updateUserInfo";//更新用户信息

/**
 * 报价
 */
const QUOTE_FOR_APP_URL = BASE_URL + 'getQuotePriceForApp';
const DOMAINS_AND_TYPE_URL = BASE_URL + 'getDomainsAndType';
const ALL_QUOTE_URL = BASE_URL + 'getAllQuote';
const AREA_INFO_URL = BASE_URL + 'getAreaInfo';
const QUOTE_LIST_URL = BASE_URL + 'getQuoteList';

/**
 * cms
 */
const INFO_TAB_URL = BASE_URL + 'getInfoTab.do';//获取资讯分类
const ARTICLE_URL = BASE_URL + 'getArticleList.do';//获取资讯列表
/**
 * 策略
 */
const STRATEGYINIT_URL = BASE_URL + 'strategyInit';//获取策略栏目
const STRATEGYGETTRAGET_URL = BASE_URL + 'getStrategyTarget';//
const STRATEGYGETTRADATA_URL = BASE_URL + 'getStrategyTargetDatas';//
const STRATEGYPAPER_URL = BASE_URL + 'getStrategy';//获取文字
/**
 *
 * 产业圈
 */
const ACTIVITY_LIST_URL = BASE_URL + 'getActiveList';//获取活动列表
const ACTIVITY_DETAIL_URL = BASE_URL + 'getActiveDetail';

var URL = {
    AD_URL,
    NOTICE_URL,
    RECOMMEDN_URL,
    SEND_AUTHCODE_URL,
    CHECK_AUTHCODE_URL,

    LOGIN_URL,
    REGISTER_URL,
    UPDATE_PSW_URL,
    UPDATE_USERINFO_URL,


    QUOTE_FOR_APP_URL,
    DOMAINS_AND_TYPE_URL,
    ALL_QUOTE_URL,
    AREA_INFO_URL,
    QUOTE_LIST_URL,

    INFO_TAB_URL,
    ARTICLE_URL,

    STRATEGYINIT_URL,
    STRATEGYGETTRAGET_URL,
    STRATEGYGETTRADATA_URL,
    STRATEGYPAPER_URL,

    ACTIVITY_LIST_URL,
    ACTIVITY_DETAIL_URL,
};
export {URL}