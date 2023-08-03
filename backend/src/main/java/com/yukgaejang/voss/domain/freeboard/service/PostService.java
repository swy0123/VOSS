package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {
    CreatePostResponse createPost(String email, CreatePostRequest createPostRequest);
    UpdatePostResponse updatePost(Long id, UpdatePostRequest updatePostRequest);
    PostDetailResponse getPostDetail(Long id);
    Page<PostListResponse> getPostList(Pageable pageable);
    Page<PostListResponse> getPostListByNickname(Pageable pageable, String nickname);
    Page<PostListResponse> getPostListByContent(Pageable pageable, String content);
    Page<PostListResponse> getPostListByTitle(Pageable pageable, String title);
    DeletePostResponse deletePost(Long id);
}
