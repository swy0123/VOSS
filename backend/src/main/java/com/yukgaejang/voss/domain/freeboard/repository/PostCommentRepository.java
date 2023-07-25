package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {

    @Query(value = "select pc from PostComment pc where pc.post.id = ?1 and pc.isDeleted = 0")
    public Page<PostComment> findAllByPostIdAndIsDeletedFalse(Long postId, Pageable pageable);
}
