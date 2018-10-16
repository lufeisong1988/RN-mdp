let SYNC = {};
SYNC.appIsFirstOpen = (params) => {
    let {resolve} = params;
    resolve && resolve(true)

};
SYNC.userInfo = (params) => {
    let {resolve} = params;
    resolve && resolve({
        isLogin: false,
        id: '',
        name: '',
        mobile: '',
        account: '',
        tokenId: '',
        grade: '',
        gradeName: '',
        gradePic: '',
        imToken: '',
        serviceLevel: '',
        counselorStatus: '',
        serviceStatus: '',
        nickName: '',
        intro: '',
        portraitUrl: '',
        hasPublishPermission: '',
    })

};
export default SYNC