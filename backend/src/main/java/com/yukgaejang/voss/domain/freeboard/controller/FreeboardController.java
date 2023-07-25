package com.yukgaejang.voss.domain.freeboard.controller;

import com.yukgaejang.voss.domain.freeboard.service.dto.FreeboardService;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/freeboard")
public class FreeboardController {
    private final FreeboardService freeboardService;

    @PostMapping
    public ResponseEntity<CreatePostResponse> write(@RequestBody CreatePostRequest createPostRequest) {
        return ResponseEntity.ok(freeboardService.write(createPostRequest));
    }

    @PutMapping
    public  ResponseEntity<UpdatePostResponse> modify(@RequestBody UpdatePostRequest updatePostRequest) {
        return ResponseEntity.ok(freeboardService.modify(updatePostRequest));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDetailResponse> detail(@PathVariable Long postId) {
        return ResponseEntity.ok(freeboardService.detail(postId));
    }

    @GetMapping
    public ResponseEntity<Page<PostListResponse>> getPostList(@Param(value = "page") int page, @Param(value = "limit") int limit) {
        return ResponseEntity.ok(freeboardService.getPostList(page, limit));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<DeletePostResponse> delete(@PathVariable Long postId) {
        return ResponseEntity.ok(freeboardService.delete(postId));
    }
}
