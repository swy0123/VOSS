package com.yukgaejang.voss.infra.openvidu;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ClassifyResponse;
import com.yukgaejang.voss.infra.openvidu.exception.NoSessionExcepion;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduException;
import io.openvidu.java.client.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class OpenViduClient {

    private final String OPENVIDU_URL = "https://i9b106.p.ssafy.io";
    private final String SECRET = "MY_SECRET";
    private final OpenVidu openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    private WebClient webClient;

    public String createSession() {

        try{
            Session session = openVidu.createSession();
            return session.getSessionId();
        } catch (OpenViduException e) {
            e.printStackTrace();
            return "세션 생성에 실패했습닌다.";
        }
    }

    public String getJoinMeetToken(String sessionId, String nickname) {
        String token = null;
        try {
            String url = "https://i9b106.p.ssafy.io/openvidu/api/sessions/" + sessionId + "/connection";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU");

            String requestBody = "{\"type\": \"WEBRTC\", \"data\": \"" + nickname + "\", \"role\": \"PUBLISHER\"}";

            String responseBody = WebClient.create().post()
                    .uri(url)
                    .headers(httpHeaders -> httpHeaders.addAll(headers))
                    .body(BodyInserters.fromValue(requestBody))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            token = parseToken(responseBody);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new NoSessionExcepion("없는 세션입니다");
        }
        return token;
    }

    private String parseToken(String body) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = mapper.readTree(body);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        String token = jsonNode.get("token").asText();

        return token;
    }

}
