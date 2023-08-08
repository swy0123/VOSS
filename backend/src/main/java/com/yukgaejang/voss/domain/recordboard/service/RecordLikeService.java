package com.yukgaejang.voss.domain.recordboard.service;

import com.yukgaejang.voss.domain.recordboard.service.dto.response.CreateRecordLikeResponse;

public interface RecordLikeService {
    CreateRecordLikeResponse createRecordLike(String email, Long recordId);
}
