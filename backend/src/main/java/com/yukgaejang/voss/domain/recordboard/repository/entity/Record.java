package com.yukgaejang.voss.domain.recordboard.repository.entity;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Record extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member member;

    private String description;
    private Long hit;
    private int isDeleted;
    private LocalDateTime deletedAt;

    public void updateHit() {
        this.hit++;
    }

    public void updateRecord(String description) {
        this.description = description;
    }

    public void delete() {
        this.isDeleted = 1;
        this.deletedAt = LocalDateTime.now();
    }

    @Builder
    public Record(String description, Member member) {
        this.description = description;
        this.member = member;
        this.hit = 0L;
        this.isDeleted = 0;
    }
}
