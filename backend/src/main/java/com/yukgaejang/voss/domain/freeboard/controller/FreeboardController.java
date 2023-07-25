package com.yukgaejang.voss.domain.freeboard.controller;

import com.yukgaejang.voss.domain.freeboard.service.dto.FreeboardService;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreatePostResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UpdatePostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/freeboard")
public class FreeboardController {
    private final FreeboardService freeboardService;

    @PostMapping
    public ResponseEntity<CreatePostResponse> write(@RequestBody CreatePostRequest createPostRequest) {
        boolean success = freeboardService.write(createPostRequest);
        return ResponseEntity.ok(new CreatePostResponse(success));
    }

    @PutMapping
    public  ResponseEntity<UpdatePostResponse> modify(@RequestBody UpdatePostRequest updatePostRequest) {
        boolean success = freeboardService.modify(updatePostRequest);
        return ResponseEntity.ok(new UpdatePostResponse(success));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDetailResponse> detail(@PathVariable("postId") Long id) {
        PostDetailResponse postDetailResponse = freeboardService.detail(id);
        return ResponseEntity.ok(postDetailResponse);
    }
}
