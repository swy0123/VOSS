package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreateCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.DeleteCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UpdateCommentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostCommentService {
    CreateCommentResponse createComment(Long postId, String email, CreateCommentRequest createCommentRequest);
    UpdateCommentResponse updateComment(Long postId, Long commentId, UpdateCommentRequest updateCommentRequest);
    List<CommentDetailResponse> getComments(Long postId);
    DeleteCommentResponse deleteComment(Long postId, Long commentId);
}
