package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.MyPostListResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostSupportRepository {

    Page<PostListResponse> findAllByConditionAndIsDeletedFalse(Pageable pageable, String title, String content, String nickname);

//    Page<PostListResponse> findAllByMemberNicknameAndIsDeletedFalse(Pageable pageable, String nickname);
//
//    Page<PostListResponse> findAllByTitleContainingAndIsDeletedFalse(Pageable pageable, String title);
//
//    Page<PostListResponse> findAllByContentContainingAndIsDeletedFalse(Pageable pageable, String content);
//
//    Page<PostListResponse> findAllByIsDeletedFalse(Pageable pageable);

    Post findByIdAndIsDeletedFalse(Long id);

    Page<MyPostListResponse> findAllByMemberEmailAndIsDeletedFalse(Pageable pageable, String email);
}
