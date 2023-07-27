package com.yukgaejang.voss.domain.freeboard.controller;

import com.yukgaejang.voss.domain.freeboard.service.PostCommentService;
import com.yukgaejang.voss.domain.freeboard.service.PostService;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdateCommentRequest;
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
public class FreeboardController {
    private final PostService postService;
    private final PostCommentService postCommentService;

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

    @PostMapping("/comment")
    public ResponseEntity<CreateCommentResponse> createComment(@RequestBody CreateCommentRequest createCommentRequest) {
        return ResponseEntity.ok(postCommentService.createComment(createCommentRequest));
    }

    @GetMapping("/{postId}/comment")
    public ResponseEntity<Page<CommentDetailResponse>> getComments(@PathVariable Long postId, @RequestParam int page, @RequestParam int limit) {
        return ResponseEntity.ok(postCommentService.getComments(postId, page, limit));
    }

    @PutMapping("/comment")
    public ResponseEntity<UpdateCommentResponse> updateComment(@RequestBody UpdateCommentRequest updateCommentRequest) {
        return ResponseEntity.ok(postCommentService.updateComment(updateCommentRequest));
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<DeleteCommentResponse> deleteComment(@PathVariable Long commentId) {
        return ResponseEntity.ok(postCommentService.deleteComment(commentId));
    }
}
