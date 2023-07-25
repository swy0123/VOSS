package com.yukgaejang.voss.domain.freeboard.service.dto;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.CreatePostResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostDetailResponse;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.UpdatePostResponse;

public interface FreeboardService {
    CreatePostResponse write(CreatePostRequest createPostRequest);
    UpdatePostResponse modify(UpdatePostRequest updatePostRequest);
    PostDetailResponse detail(Long id);
}
