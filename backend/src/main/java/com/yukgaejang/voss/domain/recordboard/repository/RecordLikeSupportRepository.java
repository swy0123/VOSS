package com.yukgaejang.voss.domain.recordboard.repository;

public interface RecordLikeSupportRepository {
    boolean existsByRecordIdAndEmail(Long recordId, String email);
}
