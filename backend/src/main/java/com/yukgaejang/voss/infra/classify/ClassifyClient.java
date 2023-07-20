package com.yukgaejang.voss.infra.classify;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ClassifyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class ClassifyClient {
    private final WebClient webClient;

    public ClassifyResponse classify(MultipartFile file) throws Exception {
        String url = "http://wonyoung210.p-e.kr:5000/classify";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        WebClient webClient = WebClient.builder().build();

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", file.getResource());

        String responseBody = webClient.post()
                .uri(url)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return parseClassification(responseBody);
    }

    private ClassifyResponse parseClassification(String body) throws Exception {
        List<String> selectedKeywords = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(body);

        int age = jsonNode.get(0).asInt();
        String gender = jsonNode.get(1).asText();

        System.out.println("age :::: " + age);
        System.out.println("gender :::: " + gender);

        return new ClassifyResponse(age, gender);
    }
}
