package com.yukgaejang.voss.domain.practice.repository.entity;

import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Casting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Script script;

    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    private Member member;

    public Casting(Script script, String name, Member member) {
        this.script = script;
        this.name = name;
        this.member = member;
    }
}
