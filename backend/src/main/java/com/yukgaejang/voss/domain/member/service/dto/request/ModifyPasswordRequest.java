package com.yukgaejang.voss.domain.member.service.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
public class ModifyPasswordRequest {
    private String originalPassword;
    private String newPassword;

    public ModifyPasswordRequest(String originalPassword, String newPassword) {
        this.originalPassword = originalPassword;
        this.newPassword = newPassword;
    }
}
