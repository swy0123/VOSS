package com.yukgaejang.voss.domain.game.controller;

import com.yukgaejang.voss.domain.game.repository.entity.Type;
import com.yukgaejang.voss.domain.game.service.GameService;
import com.yukgaejang.voss.domain.game.service.dto.response.GameSourceUploadResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameSourceListResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.StatusResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
public class GameController {
    private final GameService gameService;

    @PostMapping("/upload")
    public ResponseEntity<GameSourceUploadResponse> uploadMultipleFile(@RequestPart MultipartFile file, Type type) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(gameService.uploadMafiaGameSource(file, email, type));
    }

    @GetMapping("/{cnt}")
    public ResponseEntity<List<MafiaGameSourceListResponse>> getRandomMafiaSourceListByCnt(@PathVariable int cnt) {
        return ResponseEntity.ok(gameService.getRandomMafiaSourceListLimitCnt(cnt));
    }

    @PostMapping("/score/{cnt}")
    public ResponseEntity<StatusResponse> setScoreOfMafiaGame(@PathVariable int cnt) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(gameService.setMafiaGameScore(email, cnt));
    }
}
