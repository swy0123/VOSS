package com.yukgaejang.voss.domain.recordboard.service;

import com.yukgaejang.voss.domain.recordboard.service.dto.response.CreateRecordLikeResponse;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.DeleteRecordLikeResponse;

public interface RecordLikeService {
    CreateRecordLikeResponse createRecordLike(String email, Long recordId);
    DeleteRecordLikeResponse deleteRecordLike(String email, Long recordId);
}
