package com.maidouporn.refresh;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class MdpHeaderManager extends SimpleViewManager<MdpHeader> {
    @Override
    public String getName() {
        return "RCTMdpHeader";
    }

    @Override
    protected MdpHeader createViewInstance(ThemedReactContext reactContext) {
        return new MdpHeader(reactContext);
    }
}
