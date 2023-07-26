package com.yukgaejang.voss.domain.freeboard.service.dto;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdateCommentRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreateCommentResponse;
<<<<<<< HEAD
import com.yukgaejang.voss.domain.freeboard.service.dto.response.DeleteCommentResponse;
=======
>>>>>>> 24af3aa037610bb2a16facece073f1c15ef500d3
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UpdateCommentResponse;
import org.springframework.data.domain.Page;

public interface PostCommentService {
    CreateCommentResponse createComment(CreateCommentRequest createCommentRequest);
    UpdateCommentResponse updateComment(UpdateCommentRequest updateCommentRequest);
    Page<CommentDetailResponse> getComments(Long postId, int page, int limit);
<<<<<<< HEAD
    DeleteCommentResponse deleteComment(Long commentId);
=======
>>>>>>> 24af3aa037610bb2a16facece073f1c15ef500d3
}
