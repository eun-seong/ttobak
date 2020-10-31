package com.firstpenguin.ttobak;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

public class Splash extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_splash);

        Handler hd = new Handler();
        hd.postDelayed(new splashhandler(), 3000);

    }

    private class splashhandler implements Runnable{
        public void run(){
            startActivity(new Intent(getApplication(), MainActivity.class));
            Splash.this.finish();
        }
    }

    @Override
    public void onBackPressed() {
    }
}