package com.yukgaejang.voss.domain.practice.controller;

import com.yukgaejang.voss.domain.practice.serivce.PracticeService;
import com.yukgaejang.voss.domain.practice.serivce.dto.request.AddStatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/practice")
@RestController
@RequiredArgsConstructor
public class PracticeController {

    private final PracticeService practiceService;

    @PostMapping("/stat")
    public ResponseEntity<Boolean> addStat(@RequestBody AddStatRequest addStatRequest) {

        return ResponseEntity.ok(true);
    }

}
