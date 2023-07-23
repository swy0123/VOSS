package com.yukgaejang.voss.domain.practice.serivce;

import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptResponse;

public interface DubService {
    ViewScriptResponse viewScript(Long scriptId);
}
