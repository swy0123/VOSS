package com.yukgaejang.voss.domain.practice.repository.entity;

import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Script {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String title;

    private Long durationInSec;

    private String videoUrl;

    private Integer roleCnt;

    public Script(Category category, String title, Long durationInSec, String videoUrl, Integer roleCnt) {
        this.category = category;
        this.title = title;
        this.durationInSec = durationInSec;
        this.videoUrl = videoUrl;
        this.roleCnt = roleCnt;
    }

    public Script() {
    }
}
