package com.yukgaejang.voss.domain.practice.repository;

import com.yukgaejang.voss.domain.practice.serivce.dto.response.ScriptListResponse;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptLineResponse;

import java.util.List;

public interface ScriptSupportRepository {
    List<ViewScriptLineResponse> getScriptLines(Long scriptId);
    List<String> getRoleNames(Long scriptId);

    List<ScriptListResponse> findAllScript();
}
