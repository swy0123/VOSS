package com.yukgaejang.voss.infra.classify;

import com.yukgaejang.voss.domain.practice.serivce.dto.response.ClassifyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;

@RequiredArgsConstructor
@Component
public class ClassifyClient {
    private final WebClient webClient;

    public ClassifyClient() {
        this.webClient = WebClient.builder()
                .baseUrl("http://wonyoung210.p-e.kr:5000")
                .build();
    }

    public ClassifyResponse classify(File file) {
        String url = "/classify";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        FileSystemResource fileSystemResource = new FileSystemResource(file);

        String responseBody = webClient.post()
                .uri(url)
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .body(BodyInserters.fromMultipartData("file", fileSystemResource))
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
