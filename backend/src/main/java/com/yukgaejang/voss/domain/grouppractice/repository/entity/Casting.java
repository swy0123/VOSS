package com.yukgaejang.voss.domain.grouppractice.repository.entity;

import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import com.yukgaejang.voss.domain.practice.repository.entity.ScriptLine;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Casting {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private MeetJoin meetJoin;

    @OneToOne(fetch = FetchType.LAZY)
    private ScriptLine scriptLine;

    public Casting(MeetJoin meetJoin, ScriptLine scriptLine) {
        this.meetJoin = meetJoin;
        this.scriptLine = scriptLine;
    }
}
