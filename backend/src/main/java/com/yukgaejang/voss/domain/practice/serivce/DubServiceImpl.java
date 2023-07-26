package com.yukgaejang.voss.domain.practice.serivce;

import com.yukgaejang.voss.domain.member.repository.entity.Role;
import com.yukgaejang.voss.domain.practice.repository.ScriptRepository;
import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import com.yukgaejang.voss.domain.practice.repository.entity.ScriptLine;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ScriptListResponse;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptLineResponse;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DubServiceImpl implements DubService {

    private final ScriptRepository scriptRepository;

    @Override
    public ViewScriptResponse viewScript(Long scriptId) {
        Script script = scriptRepository.findById(scriptId).get();
        List<String> roles = scriptRepository.getRoleNames(scriptId);
        List<ViewScriptLineResponse> lines = scriptRepository.getScriptLines(scriptId);

        return new ViewScriptResponse(script, roles, lines);
    }

    @Override
    public List<ScriptListResponse> getScriptList() {
        List<ScriptListResponse> scriptList = scriptRepository.findAllScript();
        return scriptList;
    }
}
