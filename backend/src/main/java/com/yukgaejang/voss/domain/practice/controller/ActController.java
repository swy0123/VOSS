package com.yukgaejang.voss.domain.practice.controller;

import com.yukgaejang.voss.domain.practice.serivce.ActService;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ClassifyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/practice/act")
@RequiredArgsConstructor
public class ActController {
    private final ActService actService;

    @PostMapping("/analysis")
    public ResponseEntity<ClassifyResponse> analysis(@RequestParam("file") MultipartFile file) {
        ClassifyResponse result = actService.analysis(file);

        return ResponseEntity.ok(result);
    }

}
