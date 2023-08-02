package com.yukgaejang.voss.domain.practice.controller;

import com.yukgaejang.voss.domain.practice.serivce.ActService;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ClassifyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/practice/act")
@RequiredArgsConstructor
public class ActController {
    private final ActService actService;

    @PostMapping("/classify")
    public  ResponseEntity<ClassifyResponse> classify(@RequestParam("file") MultipartFile file) {
        ClassifyResponse result = actService.analysis(file);
        return ResponseEntity.ok(result);
    }

}
