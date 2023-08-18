package com.yukgaejang.voss.domain.practice.serivce;

import com.yukgaejang.voss.domain.practice.repository.CastingRepository;
import com.yukgaejang.voss.domain.practice.serivce.dto.CastingDto;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewCastingListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CastingServiceImpl implements CastingService {
    private final CastingRepository castingRepository;

    @Override
    public ViewCastingListResponse getCastingList(Long scriptId) {
        List<CastingDto> collect = castingRepository.findByScriptId(scriptId)
                .stream()
                .map(o -> new CastingDto(o))
                .collect(Collectors.toList());
        return new ViewCastingListResponse(collect);

    }
}
