package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostCommentSupportRepository {
    public List<CommentDetailResponse> findAllByPostIdAndIsDeletedFalse(@Param("postId") Long postId);
    public PostComment findByIdAndIsDeletedFalse(@Param("commentId") Long commentId);
}
