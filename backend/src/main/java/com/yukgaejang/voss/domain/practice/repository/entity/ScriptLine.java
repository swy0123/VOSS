package com.yukgaejang.voss.domain.practice.repository.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class ScriptLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Script script;

    private String name; // 배역

    private Integer startSec;

    private Integer endSec;

    private String content; // 대사

    public ScriptLine(Script script, String name, Integer startSec, Integer endSec, String content) {
        this.script = script;
        this.name = name;
        this.startSec = startSec;
        this.endSec = endSec;
        this.content = content;
    }

    public ScriptLine() {
    }
}
