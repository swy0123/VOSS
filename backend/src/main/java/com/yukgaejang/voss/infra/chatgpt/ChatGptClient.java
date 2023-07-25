package com.yukgaejang.voss.infra.chatgpt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class ChatGptClient {
    private final WebClient webClient;

}
