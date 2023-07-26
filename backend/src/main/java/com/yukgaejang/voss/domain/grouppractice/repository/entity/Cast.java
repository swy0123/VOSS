package com.yukgaejang.voss.domain.grouppractice.repository.entity;

import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Cast extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Script script;

    private String name;

    public Cast(Script script, String name) {
        this.script = script;
        this.name = name;
    }
}
