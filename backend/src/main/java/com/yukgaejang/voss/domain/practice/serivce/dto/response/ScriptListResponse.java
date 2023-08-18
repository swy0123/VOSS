package com.yukgaejang.voss.domain.practice.serivce.dto.response;

import com.yukgaejang.voss.domain.practice.repository.entity.Category;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ScriptListResponse {
    private Long id;

    private String category;

    private String title;

    private Long durationInSec;

    private String videoUrl;

    private Integer roleCnt;

    public ScriptListResponse(Script script) {
        this.id = script.getId();
        this.category = script.getCategory().name();
        this.title = script.getTitle();
        this.durationInSec = script.getDurationInSec();
        this.videoUrl = script.getVideoUrl();
        this.roleCnt = script.getRoleCnt();
    }

    public ScriptListResponse(Long id, Category category, String title, Long durationInSec, String videoUrl, Integer roleCnt) {
        this.id = id;
        this.category = category.name();
        this.title = title;
        this.durationInSec = durationInSec;
        this.videoUrl = videoUrl;
        this.roleCnt = roleCnt;
    }
}
