package com.yukgaejang.voss.domain.practice.serivce;

import com.yukgaejang.voss.domain.practice.serivce.dto.response.ScriptListResponse;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptResponse;

import java.util.List;

public interface DubService {
    ViewScriptResponse viewScript(Long scriptId);

    List<ScriptListResponse> getScriptList();
}
