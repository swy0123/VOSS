package com.yukgaejang.voss.domain.freeboard.repository;

import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostFileDetailResponse;

import java.util.List;

public interface PostFileSupportRepository {

    public List<PostFileDetailResponse> findAllByPostIdAndIsDeletedFalse(Long postId);

    public List<PostFileDetailResponse> findAllByPostIdAndIsDeletedFalseAndContentTypeStartsWith(Long postId, String contentType);

    public List<PostFileDetailResponse> findAllByPostIdAndIsDeletedFalseAndContentTypeNotStartsWith(Long postId, String contentType);
}
