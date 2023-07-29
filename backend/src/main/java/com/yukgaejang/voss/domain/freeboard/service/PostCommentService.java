package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreateCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.DeleteCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UpdateCommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostCommentService {
    CreateCommentResponse createComment(Long postId, String email, CreateCommentRequest createCommentRequest);
    UpdateCommentResponse updateComment(Long commentId, UpdateCommentRequest updateCommentRequest);
    Page<CommentDetailResponse> getComments(Long postId, Pageable pageable);
    DeleteCommentResponse deleteComment(Long commentId);
}
