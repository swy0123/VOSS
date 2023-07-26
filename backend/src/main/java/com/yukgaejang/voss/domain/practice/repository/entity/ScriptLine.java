package com.yukgaejang.voss.domain.practice.repository.entity;

import com.yukgaejang.voss.domain.grouppractice.repository.entity.Cast;
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

    @ManyToOne(fetch = FetchType.LAZY)
    private Cast cast;

    private Integer startSec;

    private Integer endSec;

    private String content; // 대사

    public ScriptLine(Cast cast, Integer startSec, Integer endSec, String content) {
        this.cast = cast;
        this.startSec = startSec;
        this.endSec = endSec;
        this.content = content;
    }
}
