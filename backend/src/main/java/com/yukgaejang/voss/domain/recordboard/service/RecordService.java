package com.yukgaejang.voss.domain.recordboard.service;

import com.yukgaejang.voss.domain.recordboard.service.dto.request.CreateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.request.UpdateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecordService {

    CreateRecordResponse createRecord(String email, CreateRecordRequest createRecordRequest);
    UpdateRecordResponse updateRecord(Long id, UpdateRecordRequest updateRecordRequest);
    Page<RecordDetailResponse> getRecordList(String email, Pageable pageable);
    Page<RecordDetailResponse> getRecordListByDescription(String email, Pageable pageable, String description);
    Page<RecordDetailResponse> getRecordListByNickname(String email, Pageable pageable, String nickname);
    DeleteRecordResponse deleteRecord(Long id);

}
