package com.yukgaejang.voss.domain.freeboard.controller;

import com.yukgaejang.voss.domain.freeboard.service.dto.PostCommentService;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreateCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.DeleteCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UpdateCommentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/postcomment")
public class PostCommentController {

    private final PostCommentService postCommentService;

    @PostMapping
    public ResponseEntity<CreateCommentResponse> createComment(@RequestBody CreateCommentRequest createCommentRequest) {
        return ResponseEntity.ok(postCommentService.createComment(createCommentRequest));
    }

    @PutMapping
    public ResponseEntity<UpdateCommentResponse> updateComment(@RequestBody UpdateCommentRequest updateCommentRequest) {
        return ResponseEntity.ok(postCommentService.updateComment(updateCommentRequest));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Page<CommentDetailResponse>> getComments(@PathVariable Long postId, @RequestParam int page, @RequestParam int limit) {
        return ResponseEntity.ok(postCommentService.getComments(postId, page, limit));
    }

    @DeleteMapping
    public ResponseEntity<DeleteCommentResponse> deleteComment(@RequestParam Long commentId) {
        return ResponseEntity.ok(postCommentService.deleteComment(commentId));
    }

}
