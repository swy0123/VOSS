package com.yukgaejang.voss.infra.openvidu;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yukgaejang.voss.infra.openvidu.exception.NoSessionExcepion;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

@RequiredArgsConstructor
@Component
public class OpenViduClient {

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;
    @Value("${OPENVIDU_SECRET}")
    private String SECRET;
    private final HttpHeaders headers = new HttpHeaders();
    private String sessionId;
    private OpenVidu openVidu;
    private RecordingProperties recordingProperties = new RecordingProperties.Builder()
            .hasAudio(true)
            .hasVideo(false)
            .build();

    @PostConstruct
    public void init() {
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic " + Base64.getEncoder().encodeToString(("OPENVIDUAPP:" + SECRET).getBytes()));
    }


    public String createSession() {
        openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
        sessionId = UUID.randomUUID().toString();
        SessionProperties properties = new SessionProperties.Builder()
                .recordingMode(RecordingMode.MANUAL)
                .defaultRecordingProperties(recordingProperties)
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

    public Boolean recordStart(String meetRoomSessionId) {
        try {
            if (isRecordFileExists(meetRoomSessionId)) {
                deleteRecordFile(meetRoomSessionId);
            }
            openVidu.startRecording(meetRoomSessionId, recordingProperties);
            return true;
        } catch (OpenViduJavaClientException e) {
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }

    public Boolean recordStop(String meetRoomSessionId) {
        try {
            openVidu.stopRecording(meetRoomSessionId);
            return true;
        } catch (OpenViduJavaClientException e) {
            throw new RuntimeException(e);
        } catch (OpenViduHttpException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteRecordFile(String meetRoomSessionId) {
        String url = OPENVIDU_URL + "/openvidu/api/recordings/" + meetRoomSessionId;
        ResponseEntity<Void> block = WebClient.create().delete()
                .uri(url)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .toBodilessEntity()
                .block();
    }

    public Boolean isRecordFileExists(String meetRoomSessionId) {
        String url = OPENVIDU_URL + "/openvidu/api/recordings/" + meetRoomSessionId;
        return WebClient.create().get()
                .uri(url)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .exchangeToMono(response -> {
                    if (response.statusCode().is4xxClientError()) {
                        return Mono.just(false);
                    } else if (response.statusCode().is2xxSuccessful()) {
                        return Mono.just(true);
                    }
                    return Mono.empty();
                })
                .block();
    }

    public String getRecordFile(String meetRoomSessionId) {
        String url = OPENVIDU_URL + "/openvidu/api/recordings/" + meetRoomSessionId;
        String body = getString(url);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(body);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return jsonNode.get("url").asText();
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
        int content = jsonNode.get("content").size();
        for (int i = 0; i < content; i++) {
            List<Long> list = new ArrayList<>();
            String text = jsonNode.get("content").get(i).get("sessionId").asText();
            Long connectionCnt = jsonNode.get("content").get(i).get("connections").get("numberOfElements").asLong();
            if(connectionCnt==0) continue;
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
            String url = "https://i9b106.p.ssafy.io:9443/openvidu/api/sessions/" + sessionId + "/connection";

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