package com.firstpenguin.ttobak;

import android.net.http.AndroidHttpClient;
import android.util.Log;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Objects;

public class HttpConnection {
    private static final String TAG = "@@@";
    private AudioData data;
    private final static String url = "http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/api/segscore";

//    public static String POST(AudioData data) {
//        InputStream is = null;
//        String result = "";
//        try {
//            URL urlCon = new URL(url);
//            HttpURLConnection httpCon = (HttpURLConnection) urlCon.openConnection();
//
//            String json = "";
//
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.accumulate("gender", data.getGender());
//            jsonObject.accumulate("transcript", data.getTranscript());
//            jsonObject.accumulate("file", data.getFile());
//
//            json = jsonObject.toString();
//            Log.d(TAG, "POST: " + json);
//
//            // ** Alternative way to convert Person object to JSON string usin Jackson Lib
//            // ObjectMapper mapper = new ObjectMapper();
//            // json = mapper.writeValueAsString(person);
//
//            httpCon.setRequestProperty("Accept", "application/json");
//            httpCon.setRequestProperty("Content-type", "multipart/form-data");
//
//            httpCon.setDoOutput(true);
//            httpCon.setDoInput(true);
//
//            OutputStream os = httpCon.getOutputStream();
//            os.write(json.getBytes("euc-kr"));
//            os.flush();
//            try {
//                is = httpCon.getInputStream();
//
//                if (is != null)
//                    result = convertInputStreamToString(is);
//                else
//                    result = "Did not work!";
//            } catch (IOException e) {
//                e.printStackTrace();
//            } finally {
//                httpCon.disconnect();
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (Exception e) {
//            Log.d("InputStream", Objects.requireNonNull(e.getLocalizedMessage()));
//        }
//
//        return result;
//    }
//
//    private static String convertInputStreamToString(InputStream inputStream) throws IOException {
//        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
//        String line = "";
//        StringBuilder result = new StringBuilder();
//        while ((line = bufferedReader.readLine()) != null)
//            result.append(line);
//
//        inputStream.close();
//        return result.toString();
//    }


    public static String fileServer(AudioData data) throws IOException {
        // Create MultipartEntityBuilder
        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);

        // Set String Params
        builder.addTextBody("gender", data.getGender(), ContentType.create("Multipart/related", "UTF-8"));
        builder.addTextBody("transcript", data.getTranscript(), ContentType.create("Multipart/related", "UTF-8"));

        // Set File Params
        builder.addPart("file", new FileBody(data.getFile()));
        // File 이 여러개 인 경우 아래와 같이 adpart 를 하나 더 추가해 주면 된다.
//        builder.addPart("Key 값", new FileBody(new File("File 경로")));

        // Send Request
        InputStream inputStream = null;
        HttpClient httpClient = AndroidHttpClient.newInstance("Android");
        HttpPost httpPost = new HttpPost(url);
        httpPost.setEntity(builder.build());
        HttpResponse httpResponse = httpClient.execute(httpPost);
        HttpEntity httpEntity = httpResponse.getEntity();
        inputStream = httpEntity.getContent();

        // Response
        BufferedReader buffedReader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
        StringBuilder stringBuilder = new StringBuilder();
        String line = null;

        while ((line = buffedReader.readLine()) != null) {
            stringBuilder.append(line).append("\n");
        }
        inputStream.close();

        return line;
    }
}
