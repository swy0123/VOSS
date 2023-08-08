package com.yukgaejang.voss.domain.recordboard.repository;

import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;
import com.yukgaejang.voss.domain.recordboard.service.dto.response.RecordDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecordSupportRepository {

    Record findByIdAndIsDeletedFalse(Long id);
    Page<RecordDetailResponse> findAllByIsDeletedFalse(Pageable pageable, Long memberId);
//    Page<RecordDetailResponse> findAllByMemberNicknameAndIsDeletedFalse(Pageable pageable, String nickname, Long memberId);
//    Page<RecordDetailResponse> findAllByDescriptionContainingAndIsDeletedFalse(Pageable pageable, String description, Long memberId);
}
