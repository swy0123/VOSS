package com.yukgaejang.voss.domain.recordboard.service.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DeleteRecordResponse {

        private boolean isSuccess;

        public DeleteRecordResponse(boolean isSuccess) {
            this.isSuccess = isSuccess;
        }
}
