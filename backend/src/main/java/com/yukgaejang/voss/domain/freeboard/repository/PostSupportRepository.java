package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.repository.entity.Post;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostListResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UserPostListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostSupportRepository {

    Page<PostListResponse> findAllByConditionAndIsDeletedFalse(Pageable pageable, String title, String content, String nickname);

    Post findByIdAndIsDeletedFalse(Long id);

    Page<UserPostListResponse> findAllByMemberIdAndIsDeletedFalse(Pageable pageable, Long memberId);
}
