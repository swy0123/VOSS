package com.yukgaejang.voss.domain.practice.serivce;

import com.yukgaejang.voss.domain.practice.repository.CastingRepository;
import com.yukgaejang.voss.domain.practice.repository.entity.Casting;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewCastingListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CastingServiceImpl implements CastingService {
    private final CastingRepository castingRepository;

    @Override
    public ViewCastingListResponse getCastingList(Long scriptId) {
        List<Casting> byScriptId = castingRepository.findByScriptId(scriptId);
        return new ViewCastingListResponse(byScriptId);
    }
}
