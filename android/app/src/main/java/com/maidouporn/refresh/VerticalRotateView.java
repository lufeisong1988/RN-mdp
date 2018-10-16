package com.maidouporn.refresh;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.content.Context;
import android.graphics.Canvas;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.RelativeLayout;

import com.maidouporn.R;

public class VerticalRotateView extends RelativeLayout {
    private Context context;
    private RelativeLayout parent;
    private View moveView;
    private View topView, midView, bottomView;

    private CubicBezierInterpolator middleStopInterpolator = new CubicBezierInterpolator(.12, .98, .83, .13);
    AnimatorSet animatorSet = new AnimatorSet();
    private int distant = 0;
    private float x,y;

    private boolean isAnimation = false;
    public VerticalRotateView(Context context) {
        super(context);
        init(context);
    }

    public VerticalRotateView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public VerticalRotateView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    void init(Context context) {
        this.context = context;
        final View view = LayoutInflater.from(context).inflate(R.layout.vertocal_dot_view, this);
        parent = (RelativeLayout) view.findViewById(R.id.dpv_parent);
        moveView = view.findViewById(R.id.view_move_dots);
        topView = view.findViewById(R.id.view_top_dots);
        midView = view.findViewById(R.id.view_center_dots);
        bottomView = view.findViewById(R.id.view_bottom_dots);
        view.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void onGlobalLayout() {
                distant = topView.getTop() - bottomView.getTop();
                x = view.getX();
                y = view.getY();
                //276

            }
        });
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

    }

    ObjectAnimator mRotationAnimator, mRotationAnimatorReverse, mTranslationXObjectAnimator, mTranslationXObjectAnimatorReverse;

    private void startAnimation() {
        mRotationAnimator = ObjectAnimator.ofFloat(parent, "rotation", 0, -180);
        mRotationAnimatorReverse = ObjectAnimator.ofFloat(parent, "rotation", 180, 0);
        mTranslationXObjectAnimator = ObjectAnimator.ofFloat(moveView, "translationY", 0, distant);
        mTranslationXObjectAnimatorReverse = ObjectAnimator.ofFloat(moveView, "translationY", distant, 0);
        mTranslationXObjectAnimator.setInterpolator(middleStopInterpolator);
        mTranslationXObjectAnimatorReverse.setInterpolator(middleStopInterpolator);
        animatorSet.playSequentially(mTranslationXObjectAnimator, mRotationAnimator, mTranslationXObjectAnimatorReverse, mRotationAnimatorReverse);
        animatorSet.setDuration(1000);
        animatorSet.addListener(new AnimatorListenerAdapter() {
            @Override
            public void onAnimationEnd(Animator animation) {
                super.onAnimationEnd(animation);
                Log.i("RotateView", "end to start");
                parent.setX(x);
                parent.setY(0);

                if(isAnimation)
                    animatorSet.start();

            }
        });
        animatorSet.start();
    }

    public void endAnimation() {
        Log.i("RotateView", "end");
        isAnimation = false;
        animatorSet.cancel();
        animatorSet.removeAllListeners();

        if(mRotationAnimator != null){
            mRotationAnimator.cancel();
        }
        if(mRotationAnimatorReverse != null){
            mRotationAnimatorReverse.cancel();
        }
        if(mTranslationXObjectAnimator != null){
            mTranslationXObjectAnimator.cancel();
        }
        if(mTranslationXObjectAnimatorReverse != null){
            mTranslationXObjectAnimatorReverse.cancel();
        }
        if(moveView.getAnimation() != null){
            moveView.clearAnimation();
        }
        if(parent.getAnimation() != null){
            parent.clearAnimation();
        }
        removeAllViews();
        init(context);
    }

    public void stepOne() {
        Log.i("RotateView", "1");
        topView.setBackground(getResources().getDrawable(R.drawable.white_dots));
        midView.setBackground(getResources().getDrawable(R.drawable.white_dots));
        bottomView.setBackground(getResources().getDrawable(R.drawable.white_dots));
    }

    public void stepTwo() {
        Log.i("RotateView", "2");
        topView.setBackground(getResources().getDrawable(R.drawable.white_dots));
        midView.setBackground(getResources().getDrawable(R.drawable.white_dots));
        bottomView.setBackground(getResources().getDrawable(R.drawable.black_dots));
    }

    public void stepThree() {
        Log.i("RotateView", "3");
        topView.setBackground(getResources().getDrawable(R.drawable.white_dots));
        midView.setBackground(getResources().getDrawable(R.drawable.black_dots));
        bottomView.setBackground(getResources().getDrawable(R.drawable.black_dots));
    }

    public void stepFour() {
        Log.i("RotateView", "4");
        topView.setBackground(getResources().getDrawable(R.drawable.black_dots));
        midView.setBackground(getResources().getDrawable(R.drawable.black_dots));
        bottomView.setBackground(getResources().getDrawable(R.drawable.black_dots));
    }

    public void start() {
        Log.i("RotateView", "start");
        isAnimation = true;
        moveView.setVisibility(VISIBLE);
        stepOne();
        startAnimation();
    }
}

