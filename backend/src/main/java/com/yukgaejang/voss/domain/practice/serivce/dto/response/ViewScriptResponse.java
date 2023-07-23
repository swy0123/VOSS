package com.yukgaejang.voss.domain.practice.serivce.dto.response;

import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import com.yukgaejang.voss.domain.practice.repository.entity.ScriptLine;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ViewScriptResponse {
    private Script script;
    private List<ViewScriptLineResponse> lines;

    public ViewScriptResponse(Script script, List<ViewScriptLineResponse> lines) {
        this.script = script;
        this.lines = lines;
    }
}
