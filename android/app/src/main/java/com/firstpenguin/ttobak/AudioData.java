package com.firstpenguin.ttobak;

import java.io.File;

public class AudioData {
    private String gender;
    private String transcript;
    private File file;

    public AudioData(String gender, String transcript, String filepath) {
        this.gender = gender;
        this.transcript = transcript;
        this.file = new File(filepath);
    }

    public String getGender() {
        return gender;
    }

    public String getTranscript() {
        return transcript;
    }

    public File getFile() {
        return file;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setTranscript(String transcript) {
        this.transcript = transcript;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
