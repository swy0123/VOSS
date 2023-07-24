package com.yukgaejang.voss.domain.meet.repository.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Meet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String title;
    private int maxCount;
    private boolean isPassword;
    private boolean isDeleted;

    @OneToMany(mappedBy = "meet", cascade = CascadeType.ALL)
    private List<MeetJoin> meetJoins = new ArrayList<>();

    public Meet(String category, String title, int maxCount, boolean isPassword, boolean isDeleted) {
        this.category = category;
        this.title = title;
        this.maxCount = maxCount;
        this.isPassword = isPassword;
        this.isDeleted = isDeleted;
    }
}
