package com.yukgaejang.voss.domain.practice.controller;

import com.yukgaejang.voss.domain.practice.serivce.CastingService;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewCastingListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/practice/casting")
@RequiredArgsConstructor
public class CastingController {

    private final CastingService castingService;

    @GetMapping("/{scriptId}")
    public ResponseEntity<ViewCastingListResponse> getCastingList(@PathVariable Long scriptId) {
        return ResponseEntity.ok(castingService.getCastingList(scriptId));
    }
}
