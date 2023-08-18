package com.yukgaejang.voss.domain.recordboard.repository;

import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordLikeRepository extends JpaRepository<RecordLike, Long> {
    boolean existsByRecordIdAndMemberId(Long recordId, Long memberId);
    RecordLike findByRecordIdAndMemberId(Long recordId, Long memberId);
    List<RecordLike> findByRecordId(Long recordId);
}
