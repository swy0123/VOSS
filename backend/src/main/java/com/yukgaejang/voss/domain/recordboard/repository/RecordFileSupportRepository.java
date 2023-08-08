package com.yukgaejang.voss.domain.recordboard.repository;

import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordFile;

public interface RecordFileSupportRepository {

    RecordFile findByIdAndIsDeletedFalse(Long id);
}
