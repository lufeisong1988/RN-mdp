package com.maidouporn.refresh;

import android.content.Context;
import android.support.annotation.ColorInt;
import android.support.annotation.NonNull;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.maidouporn.DateUtil;
import com.maidouporn.R;
import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshKernel;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.constant.RefreshState;
import com.scwang.smartrefresh.layout.constant.SpinnerStyle;


public class MdpHeader extends LinearLayout implements RefreshHeader {

    private VerticalRotateView mProgressBar;//动态图
    private LinearLayout refreshIngLayout;//下拉刷新，松开刷新 ll
    private TextView refreshIngTextView;//下拉刷新，松开刷新  tv
    private LinearLayout refreshCompleteLayout;//刷新结束
    private TextView refreshCompleteText;
    private float x,y;
    public MdpHeader(Context context) {
        super(context);
        ViewGroup.LayoutParams lp = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        View view =  LayoutInflater.from(context).inflate(R.layout.smart_refresh_header,null);
        view.setLayoutParams(lp);
        mProgressBar = (VerticalRotateView) view.findViewById(R.id.xlistview_header_progressbar);
        refreshIngLayout = (LinearLayout)view. findViewById(R.id.xlistview_header_text);
        refreshIngTextView = (TextView)view. findViewById(R.id.xlistview_header_hint_textview);
        refreshCompleteLayout = (LinearLayout)view. findViewById(R.id.ll_refresh_complete);
        refreshCompleteText = (TextView) view.findViewById(R.id.tv_refresh);
        this.addView(view);
    }


    @NonNull
    @Override
    public View getView() {
        return this;
    }

    @NonNull
    @Override
    public SpinnerStyle getSpinnerStyle() {
        return SpinnerStyle.Translate;
    }



    @Override
    public void onStartAnimator(@NonNull RefreshLayout refreshLayout, int height, int maxDragHeight) {
//        mProgressBar.setAllDotsWhite();
//        mProgressBar.bottomToTop();
        mProgressBar.start();
    }

    @Override
    public int onFinish(@NonNull RefreshLayout refreshLayout, boolean success) {
        refreshIngLayout.setVisibility(GONE);
//        mProgressBar.refreshComplete(true);
        mProgressBar.endAnimation();
        mProgressBar.setVisibility(GONE);
        refreshCompleteLayout.setVisibility(VISIBLE);
        if(success){
            refreshCompleteText.setText("最后更新 " + DateUtil.getStringDate());
        }else{
            refreshCompleteText.setText("更新失败 ");
        }
        return 300;//延迟300毫秒之后再弹回
    }



    @Override
    public void onStateChanged(@NonNull RefreshLayout refreshLayout, @NonNull RefreshState oldState, @NonNull RefreshState newState) {
        switch (newState) {
            case None:
            case PullDownToRefresh:
                mProgressBar.setVisibility(VISIBLE);
                refreshIngLayout.setVisibility(VISIBLE);
                refreshCompleteLayout.setVisibility(GONE);
                refreshIngTextView.setText("下拉刷新");
                break;
            case Refreshing:
                refreshIngLayout.setVisibility(VISIBLE);
                refreshCompleteLayout.setVisibility(GONE);
                refreshIngTextView.setText("刷新中");
                break;
            case ReleaseToRefresh:
                refreshIngLayout.setVisibility(VISIBLE);
                refreshCompleteLayout.setVisibility(GONE);
                refreshIngTextView.setText("松开刷新");
                break;
        }
    }
    @Override
    public void setPrimaryColors(@ColorInt int... colors) {

    }

    @Override
    public void onInitialized(@NonNull RefreshKernel kernel, int height, int maxDragHeight) {

    }

    @Override
    public void onPulling(float percent, int offset, int height, int extendHeight) {
        setDotsBackground(offset,height);
    }

    @Override
    public void onReleasing(float percent, int offset, int height, int extendHeight) {

    }


//    @Override
//    public void onMoving(boolean isDragging, float percent, int offset, int height, int maxDragHeight) {
//        if(isDragging){
//            setDotsBackground(offset,height);
//        }
//    }

    @Override
    public void onReleased(@NonNull RefreshLayout refreshLayout, int height, int maxDragHeight) {

    }
    @Override
    public void onHorizontalDrag(float percentX, int offsetX, int offsetMax) {

    }

    @Override
    public boolean isSupportHorizontalDrag() {
        return false;
    }
    /**
     * 计算百分比动态的显示和隐藏
     * @param offset
     * @param height
     */
    private void setDotsBackground(int offset, int height) {
        if (offset < height / 3) {
//            mProgressBar.setAllDotsWhite();
            mProgressBar.stepOne();
        } else if (offset > height / 3  && offset < height / 3 * 2) {
//            mProgressBar.setBottomState();
            mProgressBar.stepTwo();
        } else if (offset > height / 3 * 2 && offset < height) {
            mProgressBar.stepThree();
//            mProgressBar.setCenterState();
        } else if (offset >= height) {
            mProgressBar.stepFour();
//            mProgressBar.setAllDotsBlack();
        }
    }
}
