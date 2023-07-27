package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import org.springframework.data.domain.Page;

public interface PostService {
    CreatePostResponse createPost(CreatePostRequest createPostRequest);
    UpdatePostResponse updatePost(UpdatePostRequest updatePostRequest);
    PostDetailResponse getPostDetail(Long id);
    Page<PostListResponse> getPostList(int page, int limit);
    DeletePostResponse deletePost(Long id);
}
