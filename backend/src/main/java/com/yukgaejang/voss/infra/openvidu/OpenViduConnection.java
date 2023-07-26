package com.yukgaejang.voss.infra.openvidu;


import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduException;
import io.openvidu.java.client.Session;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class OpenViduConnection {

    private final String OPENVIDU_URL = "https://i9b106.p.ssafy.io";
    private final String SECRET = "MY_SECRET";

    public String session() {
        OpenVidu openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
        try{
            Session session = openVidu.createSession();
            return session.getSessionId();
        } catch (OpenViduException e) {
            e.printStackTrace();
            return "세션 생성에 실패했습닌다.";
        }
    }

}
