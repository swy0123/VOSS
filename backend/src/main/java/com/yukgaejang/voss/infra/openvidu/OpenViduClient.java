package com.yukgaejang.voss.infra.openvidu;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yukgaejang.voss.domain.meet.service.dto.GetSessionAndConnection;
import com.yukgaejang.voss.infra.openvidu.exception.NoSessionExcepion;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@RequiredArgsConstructor
@Component
public class OpenViduClient {

    private final String OPENVIDU_URL = "https://i9b106.p.ssafy.io";
    private final String SECRET = "MY_SECRET";
    private final OpenVidu openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    private final HttpHeaders headers = new HttpHeaders();

    @PostConstruct
    public void init() {
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU");
    }


    public String createSession() {
        String sessionId = UUID.randomUUID().toString();
        SessionProperties properties = new SessionProperties.Builder()
                .customSessionId(sessionId)
                .build();
        try{
            Session session = openVidu.createSession(properties);
            return session.getSessionId();
        } catch (OpenViduException e) {
            e.printStackTrace();
            return "세션 생성에 실패했습니다.";
        }
    }

    public List<Long> getSessionBySessionId(String sessionId) {
        String url = OPENVIDU_URL + "/openvidu/api/sessions/" + sessionId;
        String body = getString(url);
        List<Long> list = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(body);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        long createdAt = jsonNode.get("createdAt").asLong();
        long cnt = jsonNode.get("connections").get("numberOfElements").asLong();
        list.add(createdAt);
        list.add(cnt);
        return list;
    }

    public HashMap<String, List<Long>> getSession() {
        String url = OPENVIDU_URL + "/openvidu/api/sessions";
        String body = getString(url);
        return getSessionId(body);
    }

    private static HashMap<String, List<Long>> getSessionId(String body) {
        HashMap<String, List<Long>> map = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(body);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        List<Long> list = new ArrayList<>();
        int content = jsonNode.get("content").size();
        for (int i = 0; i < content; i++) {
            String text = jsonNode.get("content").get(i).get("sessionId").asText();
            Long connectionCnt = jsonNode.get("content").get(i).get("connections").get("numberOfElements").asLong();
            Long createdAt = jsonNode.get("content").get(i).get("createdAt").asLong();
            list.add(connectionCnt);
            list.add(createdAt);
            map.put(text, list);
        }
        return map;
    }

    public String getJoinMeetToken(String sessionId, String email) {
        String token = null;
        try {
            String url = "https://i9b106.p.ssafy.io/openvidu/api/sessions/" + sessionId + "/connection";

            String requestBody = "{\"type\": \"WEBRTC\", \"data\": \"" + email + "\", \"role\": \"PUBLISHER\"}";

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

    public int currentCount(String sessionId) {
        String url = OPENVIDU_URL + "/openvidu/api/sessions/" + sessionId;
        String body = getString(url);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(body);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return jsonNode.get("connections").get("numberOfElements").asInt();
    }

    private String getString(String url) {
        String body = WebClient.create().get()
                .uri(url)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return body;
    }

    public List<String> meetJoinList(String sessionId) {
        String url = OPENVIDU_URL + "/openvidu/api/sessions/" + sessionId;
        String body = getString(url);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(body);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        int cnt = jsonNode.get("connections").get("numberOfElements").asInt();
        List<String> nickname = new ArrayList<>();
        for (int i = 0; i < cnt; i++) {
            nickname.add(jsonNode.get("connections").get("content").get(i).get("serverData").asText());
        }
        return nickname;
    }

}