package com.yukgaejang.voss.infra.classify;

import com.yukgaejang.voss.domain.practice.serivce.dto.response.ClassifyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@RequiredArgsConstructor
public class ClassifyClient {
    private final WebClient webClient = WebClient.builder().build();

    public ClassifyResponse classify(MultipartFile file) {
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

    private ClassifyResponse parseClassification(String body) {
        int age = Integer.parseInt(body.substring(8,10));
        String gender = body.substring(22).replaceAll("[^a-z]","");

        return new ClassifyResponse(age, gender);
    }
}
