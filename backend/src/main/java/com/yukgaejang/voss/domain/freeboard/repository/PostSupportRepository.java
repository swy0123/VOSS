package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostSupportRepository {

    public Page<PostListResponse> findAllByMemberNicknameAndIsDeletedFalse(Pageable pageable, String nickname);

    public Page<PostListResponse> findAllByTitleContainingAndIsDeletedFalse(Pageable pageable, String title);

    public Page<PostListResponse> findAllByContentContainingAndIsDeletedFalse(Pageable pageable, String content);

    public Page<PostListResponse> findAllByIsDeletedFalse(Pageable pageable);

    public Post findByIdAndIsDeletedFalse(Long id);
}
