package com.yukgaejang.voss.domain.practice.serivce.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ClassifyResponse {
    private int age;
    private String gender;

    public ClassifyResponse(int age, String gender) {
        this.age = age;
        this.gender = gender;
    }
}
