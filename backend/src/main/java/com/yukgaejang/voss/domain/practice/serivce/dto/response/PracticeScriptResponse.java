package com.yukgaejang.voss.domain.practice.serivce.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PracticeScriptResponse {
    private String script;

    public PracticeScriptResponse(String script) {
        this.script = script;
    }
}
