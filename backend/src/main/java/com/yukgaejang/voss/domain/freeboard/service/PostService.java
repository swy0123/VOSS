package com.yukgaejang.voss.domain.freeboard.service;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostService {
    CreatePostResponse createPost(String email, CreatePostRequest createPostRequest);
    UpdatePostResponse updatePost(Long id, UpdatePostRequest updatePostRequest);
    PostDetailResponse getPostDetail(String email, Long id);
    Page<PostListResponse> getPostList(Pageable pageable, String title, String content, String nickname);
    DeletePostResponse deletePost(Long id);
    Page<UserPostListResponse> getMyPostList(Pageable pageable, String email);
    Page<UserPostListResponse> getUserPostList(Pageable pageable, Long memberId);
}
