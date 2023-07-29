package com.yukgaejang.voss.domain.messenger.service.dto.request;


import lombok.Data;

@Data
public class CreateMessengerRequest {
    private String myMemberEmail;
    private Long yourMemberId;

}
