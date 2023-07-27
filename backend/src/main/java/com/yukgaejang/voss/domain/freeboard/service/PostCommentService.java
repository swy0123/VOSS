package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreateCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.DeleteCommentResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UpdateCommentResponse;
import org.springframework.data.domain.Page;

public interface PostCommentService {
    CreateCommentResponse createComment(CreateCommentRequest createCommentRequest);
    UpdateCommentResponse updateComment(UpdateCommentRequest updateCommentRequest);
    Page<CommentDetailResponse> getComments(Long postId, int page, int limit);
    DeleteCommentResponse deleteComment(Long commentId);
}
