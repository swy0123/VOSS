package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateRecordResponse {

    private boolean isSuccess;

    public CreateRecordResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

}
