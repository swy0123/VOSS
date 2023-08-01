package com.yukgaejang.voss.domain.practice.repository.entity;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Stat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Enumerated(EnumType.STRING)
    private PracticeType practiceType;

    public Stat(Member member, PracticeType practiceType) {
        this.member = member;
        this.practiceType = practiceType;
    }
}
