package com.firstpenguin.ttobak;

import android.content.Context;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Handler;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import java.io.IOException;

public class AndroidBridge{
    private static String LOG_TAG = "@@@";
    Context mContext;
    MediaPlayer mp;

    AndroidBridge(Context c){
        mContext = c;
    }

    private void isPlaying(){
        if(mp != null){
            if(mp.isPlaying()) mp.stop();
            mp.reset();
        }else{
            mp = new MediaPlayer();
        }
    }

    @JavascriptInterface
    public void playSound(final String sweepURl) {       // 계단 인식할 경우 실행
        new Handler().post(new Runnable() {
            @Override
            public void run(){
                isPlaying();
                mp.setAudioStreamType(AudioManager.STREAM_MUSIC);
                try {
                    mp.setDataSource(sweepURl);
                    mp.prepare(); // might take long! (for buffering, etc)
                } catch (IOException e){
                    Log.d(LOG_TAG, "onClick: "+e);
                }
                mp.start();
            }
        });
    }

    @JavascriptInterface
    public void startGame(){
        Log.d(LOG_TAG, "startGame: ");
        mp = new MediaPlayer();
    }

    @JavascriptInterface
    public void finishGame(){
        Log.d(LOG_TAG, "finishGame: ");
        mp.release();
        mp = null;
    }

}
