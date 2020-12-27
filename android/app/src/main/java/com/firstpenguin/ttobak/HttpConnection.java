package com.firstpenguin.ttobak;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.webkit.ValueCallback;
import android.webkit.WebView;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;

public class HttpConnection extends AsyncTask<String, Void, String> {
    private static final String TAG = "@@@";
    private WeakReference<MainActivity> activityReference;

    public HttpConnection(WeakReference<MainActivity> activityReference) {
        this.activityReference = activityReference;
    }

    @Override
    protected String doInBackground(String... params) {
        final String urlStr = "http://13.125.213.48/api/segscore";
        final String twoHyphens = "--";
        String[] dataName = {"gender", "transcript", "file"};
        String resp = "";

        // boundary생성, 여기서는 고정값이지만 되도록이면 실행할때마다 다른값을 할당하자.
        String lineEnd = "\r\n";
        String boundary = "androidupload";
        File targetFile = new File(params[2]);

        byte[] buffer;
        int maxBufferSize = 5 * 1024 * 1024;
        HttpURLConnection conn = null;
        try {
            conn = (HttpURLConnection) new URL(urlStr).openConnection();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            assert conn != null;
            conn.setRequestMethod("POST");
        } catch (ProtocolException e) {
            e.printStackTrace();
        }
        conn.setReadTimeout(10000);
        conn.setConnectTimeout(10000);
        conn.setDoOutput(true);
        conn.setDoInput(true);
        conn.setUseCaches(false);
        conn.setRequestProperty("ENCTYPE", "multipart/form-data");
        conn.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + boundary);
        String delimiter = twoHyphens + boundary + lineEnd; // --androidupload\r\n

        StringBuilder postDataBuilder = new StringBuilder();
        for (int i = 0; i < 2; i++) {
            postDataBuilder.append(delimiter);
            postDataBuilder.
                    append("Content-Disposition: form-data; name=\"").
                    append(dataName[i]).append("\"").
                    append(lineEnd).
                    append(lineEnd).
                    append(params[i]).
                    append(lineEnd);
        }
        // 파일이 존재할 때에만 생성
        postDataBuilder.append(delimiter);
        postDataBuilder.
                append("Content-Disposition: form-data; name=\"").
                append(dataName[2]).
                append("\";filename=\"").
                append(targetFile.getName()).
                append("\"").append(lineEnd);
        try {
            DataOutputStream ds = new DataOutputStream(conn.getOutputStream());
            ds.write(postDataBuilder.toString().getBytes());

            ds.writeBytes(lineEnd);
            FileInputStream fStream = new FileInputStream(targetFile);
            buffer = new byte[maxBufferSize];
            int length = -1;
            while ((length = fStream.read(buffer)) != -1) {
                ds.write(buffer, 0, length);
            }
            ds.writeBytes(lineEnd);
            ds.writeBytes(lineEnd);
            ds.writeBytes(twoHyphens + boundary + twoHyphens + lineEnd); // requestbody end
            fStream.close();

            ds.flush();
            ds.close();

            int responseCode = conn.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                String line = null;
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                while ((line = br.readLine()) != null) {
                    resp += line;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return resp;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    @Override
    protected void onPostExecute(String result) {
        super.onPostExecute(result);
        Log.d(TAG, "onPostExecute: " + result);

        MainActivity activity = activityReference.get();
        if (activity == null || activity.isFinishing()) return;

        WebView webView = activity.findViewById(R.id.webView);
        webView.evaluateJavascript(
                "var event = new CustomEvent(\"android\", {\n" +
                        "    detail: \n" +
                        "        " + result + "\n" +
                        "    \n" +
                        "});\n" +
                        "window.dispatchEvent(event);\n"
                , new ValueCallback<String>() {
                    @Override
                    public void onReceiveValue(String value) {
                        Log.d(TAG, "onReceiveValue: " + value);
                    }
                });
    }
}