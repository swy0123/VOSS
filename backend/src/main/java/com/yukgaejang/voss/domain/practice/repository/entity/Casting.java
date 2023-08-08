package com.yukgaejang.voss.domain.practice.repository.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Casting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Script script;

    private String name;


    public Casting(Script script, String name) {
        this.script = script;
        this.name = name;
    }
}
