package com.yukgaejang.voss.domain.practice.serivce.dto.response;

import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import com.yukgaejang.voss.domain.practice.repository.entity.ScriptLine;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ViewScriptLineResponse {
    private Long id;
    private String name;
    private String content;
    private Integer startSec;
    private Integer endSec;

    public ViewScriptLineResponse(Long id, String name, String content, Integer startSec, Integer endSec) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.startSec = startSec;
        this.endSec = endSec;
    }

    public ViewScriptLineResponse() {
    }
}
