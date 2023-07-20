package com.yukgaejang.voss.domain.practice.serivce.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ClassifyResponse {
    private int age;
    private String gender;

    public ClassifyResponse(int age, String gender) {
        this.age = age;
        this.gender = gender;
    }
}
