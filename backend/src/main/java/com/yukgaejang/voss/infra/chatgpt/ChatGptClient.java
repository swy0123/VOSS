package com.yukgaejang.voss.infra.chatgpt;

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

        System.out.println("============client  " + requestBody);


        String responseBody = webClient.post()
                .uri(url)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .body(BodyInserters.fromValue(requestBody))
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return parseChatGptResponse(responseBody);
    }

    private String parseChatGptResponse(String body) {

        String regex = "\"content\"\\s*:\\s*\"([^\"]+)\"";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(body);

        if (matcher.find()) {
            String content = matcher.group(1);
            return content;
        }

        return "";
    }

}
