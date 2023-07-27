package com.yukgaejang.voss.domain.practice.repository.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScriptLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Casting casting;

    private Integer startSec;

    private Integer endSec;

    private String content; // 대사

    public ScriptLine(Casting casting, Integer startSec, Integer endSec, String content) {
        this.casting = casting;
        this.startSec = startSec;
        this.endSec = endSec;
        this.content = content;
    }
}
