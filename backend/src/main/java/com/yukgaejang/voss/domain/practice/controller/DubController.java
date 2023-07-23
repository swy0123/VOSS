package com.yukgaejang.voss.domain.practice.controller;

import com.yukgaejang.voss.domain.practice.serivce.DubService;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/practice/dub")
@RequiredArgsConstructor
public class DubController {

    private final DubService dubService;

    @GetMapping("/{scriptId}")
    public ResponseEntity<ViewScriptResponse> viewScript(@PathVariable Long scriptId) {
        ViewScriptResponse viewScriptResponse = dubService.viewScript(scriptId);
        return ResponseEntity.ok(viewScriptResponse);
    }
}
