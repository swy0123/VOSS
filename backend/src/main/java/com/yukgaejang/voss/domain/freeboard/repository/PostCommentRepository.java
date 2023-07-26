package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {

    @Query(value = "select distinct pc from PostComment pc" +
            " join fetch pc.post p " +
            "where p.id = :postId and pc.isDeleted = 0 ", countQuery = "select count (pc) from PostComment pc")
    public Page<PostComment> findAllByPostIdAndIsDeletedFalse(Long postId, Pageable pageable);
}
