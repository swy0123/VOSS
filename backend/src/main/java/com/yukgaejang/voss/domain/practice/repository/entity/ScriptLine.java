package com.yukgaejang.voss.domain.practice.repository.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class ScriptLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Script script;

    private String name;

    private Integer startSec;

    private Integer endSec;

    private String content;

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
