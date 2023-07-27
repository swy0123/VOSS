package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {

    @Query(value = "select pc from PostComment pc" +
            " where pc.post.id = :postId and pc.isDeleted = 0 ", countQuery = "select count (pc) from PostComment pc")
    public Page<PostComment> findAllByPostIdAndIsDeletedFalse(@Param("postId") Long postId, Pageable pageable);
}
