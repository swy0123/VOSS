package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateRecordResponse {

    private boolean isSuccess;

    public UpdateRecordResponse(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

}
