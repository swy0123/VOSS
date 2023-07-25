package com.yukgaejang.voss.domain.freeboard.service.dto;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.*;
import org.springframework.data.domain.Page;

public interface FreeboardService {
    CreatePostResponse write(CreatePostRequest createPostRequest);
    UpdatePostResponse modify(UpdatePostRequest updatePostRequest);
    PostDetailResponse detail(Long id);

    Page<PostListResponse> getPostList(int page, int limit);

    DeletePostResponse delete(Long id);
}
