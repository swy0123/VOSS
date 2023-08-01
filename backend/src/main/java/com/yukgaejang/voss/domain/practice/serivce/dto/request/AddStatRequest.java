package com.yukgaejang.voss.domain.practice.serivce.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddStatRequest {
    String type;

    public AddStatRequest(String type) {
        this.type = type;
    }
}
