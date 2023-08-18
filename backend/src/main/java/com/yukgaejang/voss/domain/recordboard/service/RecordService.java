package com.yukgaejang.voss.domain.recordboard.service;

import com.yukgaejang.voss.domain.recordboard.service.dto.request.CreateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.request.UpdateRecordRequest;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecordService {

    CreateRecordResponse createRecord(String email, CreateRecordRequest createRecordRequest);
    UpdateRecordResponse updateRecord(Long id, UpdateRecordRequest updateRecordRequest);
    Page<RecordDetailResponse> getRecordList(String email, Pageable pageable, String description, String nickname);
    DeleteRecordResponse deleteRecord(Long id);
    Page<UserRecordListResponse> getMyRecordList(Pageable pageable, String email);
    Page<UserRecordListResponse> getUserRecordList(Pageable pageable, Long memberId);
    UpdateHitResponse updateHitRecord(Long id);
}
