package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreatePostLikeResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.DeletePostLikeResponse;

public interface PostLikeService {
    CreatePostLikeResponse createPostLike(Long postId, String email);
    DeletePostLikeResponse deletePostLike(Long postId, String email);
}
