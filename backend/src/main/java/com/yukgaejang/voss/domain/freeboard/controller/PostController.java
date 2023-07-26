package com.yukgaejang.voss.domain.freeboard.controller;

import com.yukgaejang.voss.domain.freeboard.service.dto.PostService;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/freeboard")
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<CreatePostResponse> createPost(@RequestBody CreatePostRequest createPostRequest) {
        return ResponseEntity.ok(postService.createPost(createPostRequest));
    }

    @PutMapping
    public  ResponseEntity<UpdatePostResponse> updatePost(@RequestBody UpdatePostRequest updatePostRequest) {
        return ResponseEntity.ok(postService.updatePost(updatePostRequest));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDetailResponse> getPostDetail(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.getPostDetail(postId));
    }

    @GetMapping
    public ResponseEntity<Page<PostListResponse>> getPostList(@Param(value = "page") int page, @Param(value = "limit") int limit) {
        return ResponseEntity.ok(postService.getPostList(page, limit));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<DeletePostResponse> deletePost(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.deletePost(postId));
    }
}
