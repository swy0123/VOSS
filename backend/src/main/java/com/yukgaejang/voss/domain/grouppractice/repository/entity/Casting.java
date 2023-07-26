package com.yukgaejang.voss.domain.grouppractice.repository.entity;

import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import com.yukgaejang.voss.domain.practice.repository.entity.ScriptLine;
import com.yukgaejang.voss.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Casting extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private MeetJoin meetJoin;

    @OneToMany
    private List<ScriptLine> scriptLine;

    public Casting(MeetJoin meetJoin, List<ScriptLine> scriptLine) {
        this.meetJoin = meetJoin;
        this.scriptLine = scriptLine;
    }
}
