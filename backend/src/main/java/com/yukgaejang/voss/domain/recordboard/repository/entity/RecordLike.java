package com.yukgaejang.voss.domain.recordboard.repository.entity;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecordLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Record record;

    @ManyToOne
    private Member member;

    @Builder
    public RecordLike(Record record, Member member) {
        this.record = record;
        this.member = member;
    }
}
