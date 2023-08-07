package com.yukgaejang.voss.domain.recordboard.repository.entity;

import com.mongodb.lang.Nullable;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecordFile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Record record;

    private String originalFileName;
    private String savedFileName;
    private String contentType;
    private Long size;

    private int isDeleted;

    @Nullable
    private LocalDateTime deletedAt;

    public void delete() {
        this.isDeleted = 1;
        this.deletedAt = LocalDateTime.now();
    }

    public RecordFile(Record record, String originalFileName, String savedFileName, String contentType, Long size) {
        this.record = record;
        this.originalFileName = originalFileName;
        this.savedFileName = savedFileName;
        this.contentType = contentType;
        this.size = size;
        this.isDeleted = 0;
    }

}
