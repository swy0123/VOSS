package com.yukgaejang.voss.domain.practice.serivce.dto.response;

import com.yukgaejang.voss.domain.practice.repository.entity.Casting;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class ViewCastingListResponse {
    private List<String> name;

    public ViewCastingListResponse(List<Casting> casting) {
        name = casting.stream()
                .map(o -> new String(o.getName()))
                .collect(Collectors.toList());
    }
}
