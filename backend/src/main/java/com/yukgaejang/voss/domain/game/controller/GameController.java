package com.yukgaejang.voss.domain.game.controller;

import com.yukgaejang.voss.domain.game.repository.entity.Type;
import com.yukgaejang.voss.domain.game.service.GameService;
import com.yukgaejang.voss.domain.game.service.dto.request.SearchCondition;
import com.yukgaejang.voss.domain.game.service.dto.response.GameSourceUploadResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameScoreListResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.MafiaGameSourceListResponse;
import com.yukgaejang.voss.domain.game.service.dto.response.StatusResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<StatusResponse> addScoreOfMafiaGame(@PathVariable int cnt) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(gameService.addMafiaGameScore(email, cnt));
    }

    @GetMapping("/score")
    public ResponseEntity<Page<MafiaGameScoreListResponse>> getMafiaGameScoreList(SearchCondition searchCondition) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(gameService.getMafiaGameScoreList(email, searchCondition));
    }
}
