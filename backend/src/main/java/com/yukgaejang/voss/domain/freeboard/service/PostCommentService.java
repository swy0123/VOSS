package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostCommentService {
    CreateCommentResponse createComment(Long postId, String email, CreateCommentRequest createCommentRequest);
    UpdateCommentResponse updateComment(Long postId, Long commentId, UpdateCommentRequest updateCommentRequest);
    List<CommentDetailResponse> getComments(Long postId);
    DeleteCommentResponse deleteComment(Long postId, Long commentId);
    Page<UserCommentListResponse> getMyCommentList(Pageable pageable, String email);
    Page<UserCommentListResponse> getUserCommentList(Pageable pageable, Long memberId);
}
