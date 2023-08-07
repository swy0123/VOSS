package com.yukgaejang.voss.domain.recordboard.repository;

import com.yukgaejang.voss.domain.recordboard.repository.entity.Record;

public interface RecordSupportRepository {

    Record findByIdAndIsDeletedFalse(Long id);
}
