package com.yukgaejang.voss.domain.meet.service.dto.response;

import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptLineResponse;
import lombok.Data;

import java.util.List;

@Data
public class SelectCastingResponse {
    private List<ViewScriptLineResponse> scriptLine;

    public SelectCastingResponse(List<ViewScriptLineResponse> scriptLine) {
        this.scriptLine = scriptLine;
    }
}
