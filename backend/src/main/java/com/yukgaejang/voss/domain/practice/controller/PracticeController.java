package com.yukgaejang.voss.domain.practice.controller;

import com.yukgaejang.voss.domain.practice.serivce.PracticeService;
import com.yukgaejang.voss.domain.practice.serivce.dto.request.AddStatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/practice")
@RestController
@RequiredArgsConstructor
public class PracticeController {

    private final PracticeService practiceService;

    @PostMapping("/stat")
    public ResponseEntity<Boolean> updateStat(@RequestBody AddStatRequest addStatRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        practiceService.updateStat(addStatRequest, authentication.getName());

        return ResponseEntity.ok(true);
    }

}
