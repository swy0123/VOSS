package com.yukgaejang.voss.domain.freeboard.service.dto;

import com.yukgaejang.voss.domain.freeboard.service.dto.request.CreatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.request.UpdatePostRequest;
import com.yukgaejang.voss.domain.freeboard.service.dto.response.PostDetailResponse;

public interface FreeboardService {
    boolean write(CreatePostRequest createPostRequest);
    boolean modify(UpdatePostRequest updatePostRequest);
    PostDetailResponse detail(Long id);
}
