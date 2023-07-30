//package com.yukgaejang.voss.global.config;
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//
//import java.io.FileInputStream;
//
//@Configuration
//public class FirebaseConfig {
//
//    @Value("${firebase.path}")
//    private String path;
//
//    @PostConstruct
//    public void init() {
//        try {
//            FileInputStream serviceAccount = new FileInputStream(path);
//            FirebaseOptions options = new FirebaseOptions.Builder()
//                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                    .build();
//            FirebaseApp.initializeApp(options);
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//    }
//}
