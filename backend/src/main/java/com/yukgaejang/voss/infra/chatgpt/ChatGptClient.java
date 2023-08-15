package com.yukgaejang.voss.infra.chatgpt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor

public class ChatGptClient {
    @Value("${chatGpt.apiKey}")
    private String apiKey;
    private final WebClient webClient;

    public String commend(String cmd) {
        String url = "https://api.openai.com/v1/chat/completions";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        String requestBody = "{\n" +
                "    \"model\": \"gpt-3.5-turbo\",\n" +
                "    \"messages\": [{\"role\": \"user\", \"content\": \"" + cmd + "\"}]\n" +
                "}";

        int maxRetries = 5;
        for (int retryCount = 0; retryCount < maxRetries; retryCount++) {
            try {
                String responseBody = WebClient.create().post()
                        .uri(url)
                        .headers(httpHeaders -> httpHeaders.addAll(headers))
                        .body(BodyInserters.fromValue(requestBody))
                        .retrieve()
                        .bodyToMono(String.class)
                        .block();

                return parseChatGptResponse(responseBody);
            } catch (Exception e) {
                if (retryCount < maxRetries - 1) {
                    long delayInMillis = 7000;
                    try {
                        Thread.sleep(delayInMillis);
                    } catch (InterruptedException ex) {
                        throw new RuntimeException(ex);
                    }
                } else {
                    throw e;
                }
            }
        }
        throw new RuntimeException("재시도 횟수 내에서 성공하지 못했습니다.");
    }

    private String parseChatGptResponse(String body) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = mapper.readTree(body);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        String content = jsonNode.get("choices").get(0).get("message").get("content").asText();
        return content;
    }


}
