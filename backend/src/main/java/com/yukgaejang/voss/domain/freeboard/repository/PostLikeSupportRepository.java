package com.yukgaejang.voss.domain.freeboard.repository;

public interface PostLikeSupportRepository {
    boolean existsByPostIdAndEmail(Long postId, String email);
    Long countByPostId(Long postId);
}
