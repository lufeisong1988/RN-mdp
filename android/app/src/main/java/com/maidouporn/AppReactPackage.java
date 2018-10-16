package com.maidouporn;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.maidouporn.refresh.MdpHeaderManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by lufeisong on 2018/8/27.
 */

public class AppReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new MdpHeaderManager()
        );
    }

}
