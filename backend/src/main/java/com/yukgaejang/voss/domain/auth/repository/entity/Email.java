package com.yukgaejang.voss.domain.auth.repository.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Email {
    @Id
    @Column(length = 250)
    private String email;
    private String token;

    public Email(String email, String token) {
        this.email = email;
        this.token = token;
    }
}