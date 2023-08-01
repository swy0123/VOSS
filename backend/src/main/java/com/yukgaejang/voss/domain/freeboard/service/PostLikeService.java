package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreatePostLikeResponse;

public interface PostLikeService {
    CreatePostLikeResponse createPostLike(Long postId, String email);
}
