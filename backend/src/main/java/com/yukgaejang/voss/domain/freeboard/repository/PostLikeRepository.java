package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.repository.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    boolean existsByPostIdAndMemberId(Long postId, Long memberId);
    Long countByPostId(Long postId);
    PostLike findByPostIdAndMemberId(Long postId, Long memberId);
    List<PostLike> findAllByPostId(Long postId);
}
