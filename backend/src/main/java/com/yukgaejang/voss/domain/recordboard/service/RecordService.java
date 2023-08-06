package com.yukgaejang.voss.domain.recordboard.service;

import com.yukgaejang.voss.domain.recordboard.service.dto.request.CreateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.request.UpdateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecordService {

    CreateRecordResponse createRecord(String email, CreateRecordRequest createRecordRequest);

    UpdateRecordResponse updateRecord(Long recordId, UpdateRecordRequest updateRecordRequest);

    RecordDetailResponse getRecordDetail(String email, Long recordId);

    Page<RecordListResponse> getRecordList(String description, String nickname, String sort, Pageable pageable);

    DeleteRecordResponse deleteRecord(Long recordId);
}
