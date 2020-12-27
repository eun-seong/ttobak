package com.firstpenguin.ttobak;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.media.MediaRecorder;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

import java.io.IOException;
import java.lang.ref.WeakReference;
import java.util.Objects;

public class MainActivity extends AppCompatActivity {
    // Requesting permission to RECORD_AUDIO
    private boolean permissionToRecordAccepted = false;
    private String[] permissions = {Manifest.permission.RECORD_AUDIO};
    private static final int REQUEST_RECORD_AUDIO_PERMISSION = 200;
    private final static String TAG = "@@@";
    private String fileName = null;
    private MediaRecorder recorder;
    private Context mContext;
    private WebView webView;
    private String gender_;
    private String transcript_;
    private boolean isStopped=false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mContext = this;

        ActivityCompat.requestPermissions(this, permissions, REQUEST_RECORD_AUDIO_PERMISSION);
        hideNavigationBar();

        /* WebView */
        webView = (WebView) findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);//자바스크립트 허용
        WebView.setWebContentsDebuggingEnabled(true);
        webView.addJavascriptInterface(new AndroidBridge(), "BRIDGE");
        webView.setWebChromeClient(new WebChromeClient());//웹뷰에 크롬 사용 허용//이 부분이 없으면 크롬에서 alert가 뜨지 않음

        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setMediaPlaybackRequiresUserGesture(false);

        webView.loadUrl("http://3.35.71.135/main/main");//웹뷰 실행
//        webView.loadUrl("http://172.30.1.53:3000/main/main");//웹뷰 실행

        /* Recording */
        fileName = Objects.requireNonNull(getExternalCacheDir()).getAbsolutePath();
        fileName += "/audiorecordtest.mp3";
    }

    @Override
    public void onStop() {
        super.onStop();
        if (recorder != null) {
            recorder.release();
            recorder = null;
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        try {
            Class.forName("android.webkit.WebView")
                    .getMethod("onPause", (Class[]) null)
                    .invoke(webView, (Object[]) null);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        try {
            Class.forName("android.webkit.WebView")
                    .getMethod("onResume", (Class[]) null)
                    .invoke(webView, (Object[]) null);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onDestroy(){
        super.onDestroy();


    }

    private void startRecording() {
        Log.d(TAG, "startRecording: ");
        recorder = new MediaRecorder();
        recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
        recorder.setOutputFile(fileName);
        recorder.setAudioEncoder(MediaRecorder.AudioEncoder.HE_AAC);
        recorder.setAudioEncodingBitRate(384000);
        recorder.setAudioSamplingRate(44100);

        try {
            recorder.prepare();
        } catch (IOException e) {
            Log.e(TAG, "prepare() failed");
        }

        recorder.start();
    }

    private void stopRecording() {
        Log.d(TAG, "stopRecording: ");

        try {
            recorder.stop();
        } catch(RuntimeException stopException) {
            // handle cleanup here
        }

        recorder.release();
        recorder = null;

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                webView.evaluateJavascript(
                        "var event = new CustomEvent(\"androidStopRecording\", {\n" +
                                "    detail: {\n" +
                                "        isRecording:" + false + "\n" +
                                "    }\n" +
                                "});\n" +
                                "window.dispatchEvent(event);\n"
                        , new ValueCallback<String>() {
                            @Override
                            public void onReceiveValue(String value) {
                                Log.d(TAG, "onReceiveValue: " + value);
                            }
                        });
            }
        });

        request(gender_, transcript_);
        Log.d(TAG, "run: " + gender_ + " " + transcript_);
    }

    private void request(String gender, String transcript) {
        try {
            HttpConnection task = new HttpConnection(new WeakReference<>(this));
            task.execute(gender, transcript, fileName);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case REQUEST_RECORD_AUDIO_PERMISSION:
                permissionToRecordAccepted = grantResults[0] == PackageManager.PERMISSION_GRANTED;
                break;
        }
        if (!permissionToRecordAccepted) finish();
    }

    private void hideNavigationBar() {
        int uiOptions = getWindow().getDecorView().getSystemUiVisibility();
        int newUiOptions = uiOptions;
        boolean isImmersiveModeEnabled =
                ((uiOptions | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY) == uiOptions);
        if (isImmersiveModeEnabled) {
            Log.d(TAG, "Turning immersive mode mode off. ");
        } else {
            Log.d(TAG, "Turning immersive mode mode on.");
        }
        newUiOptions ^= View.SYSTEM_UI_FLAG_HIDE_NAVIGATION;
        newUiOptions ^= View.SYSTEM_UI_FLAG_FULLSCREEN;
        newUiOptions ^= View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
        getWindow().getDecorView().setSystemUiVisibility(newUiOptions);
    }

    class AndroidBridge {
        @JavascriptInterface
        public void recordAudio(final String gender, final String transcript) {
            startRecording();
            gender_ = gender;
            transcript_ = transcript;
            isStopped = false;

            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    if(!isStopped) stopRecording();
                }
            }, 12000);
        }

        @JavascriptInterface
        public void requestStopRecording() {
            isStopped=true;
            stopRecording();
        }
    }

}
