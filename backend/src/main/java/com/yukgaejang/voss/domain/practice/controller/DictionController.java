package com.yukgaejang.voss.domain.practice.controller;

import com.yukgaejang.voss.domain.practice.serivce.dto.response.PracticeScriptResponse;
import com.yukgaejang.voss.infra.chatgpt.ChatGptClient;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/practice/diction")
@RequiredArgsConstructor
public class DictionController {
    private final ChatGptClient chatGptClient;

    @GetMapping("/script")
    public ResponseEntity<PracticeScriptResponse> chatGpt(@Param("cmd") String cmd) {
        String script = chatGptClient.commend(cmd);
        return ResponseEntity.ok(new PracticeScriptResponse(script));
    }
}
