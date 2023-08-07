package com.yukgaejang.voss.domain.recordboard.repository;

import com.yukgaejang.voss.domain.recordboard.repository.entity.RecordFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordFileRepository extends JpaRepository<RecordFile, Long>, RecordFileSupportRepository {

}
