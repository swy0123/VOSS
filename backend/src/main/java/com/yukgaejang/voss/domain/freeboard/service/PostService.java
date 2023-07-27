package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {
    CreatePostResponse createPost(CreatePostRequest createPostRequest);
    UpdatePostResponse updatePost(UpdatePostRequest updatePostRequest);
    PostDetailResponse getPostDetail(Long id);
    Page<PostListResponse> getPostList(Pageable pageable);
    DeletePostResponse deletePost(Long id);
}
