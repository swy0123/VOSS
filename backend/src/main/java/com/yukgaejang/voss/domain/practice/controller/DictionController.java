package com.yukgaejang.voss.domain.practice.controller;

import com.yukgaejang.voss.infra.chatgpt.ChatGptClient;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/practice/diction")
@RequiredArgsConstructor
public class DictionController {
    private final ChatGptClient chatGptClient;

    @GetMapping("/script")
    public String chatGpt(@Param("cmd") String cmd) {
        return chatGptClient.commend(cmd);
    }
}
