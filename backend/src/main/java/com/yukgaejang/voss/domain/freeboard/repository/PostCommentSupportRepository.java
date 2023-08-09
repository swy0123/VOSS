package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CommentDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.MyCommentListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostCommentSupportRepository {
    List<CommentDetailResponse> findAllByPostIdAndIsDeletedFalse(@Param("postId") Long postId);
    PostComment findByIdAndIsDeletedFalse(@Param("commentId") Long commentId);
    Page<MyCommentListResponse> findAllByMemberEmailAndIsDeletedFalse(Pageable pageable, String email);
}
