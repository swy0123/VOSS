package com.yukgaejang.voss.domain.grouppractice.repository.entity;

import com.yukgaejang.voss.domain.meet.repository.entity.MeetJoin;
import com.yukgaejang.voss.domain.practice.repository.entity.ScriptLine;
<<<<<<< HEAD
<<<<<<< HEAD
import com.yukgaejang.voss.global.entity.BaseEntity;
=======
>>>>>>> c203284 (feat: Casing Entity 생성 S09P12B106-173)
=======
import com.yukgaejang.voss.global.entity.BaseEntity;
>>>>>>> back-dev
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
<<<<<<< HEAD
<<<<<<< HEAD
import lombok.ToString;

import java.util.List;
=======
>>>>>>> c203284 (feat: Casing Entity 생성 S09P12B106-173)
=======
import lombok.ToString;

import java.util.List;
>>>>>>> back-dev

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
<<<<<<< HEAD
<<<<<<< HEAD
@ToString
public class Casting extends BaseEntity {
=======
public class Casting {
>>>>>>> c203284 (feat: Casing Entity 생성 S09P12B106-173)
=======
@ToString
public class Casting extends BaseEntity {
>>>>>>> back-dev

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private MeetJoin meetJoin;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> back-dev
    @OneToMany
    private List<ScriptLine> scriptLine;

    public Casting(MeetJoin meetJoin, List<ScriptLine> scriptLine) {
<<<<<<< HEAD
=======
    @OneToOne(fetch = FetchType.LAZY)
    private ScriptLine scriptLine;

    public Casting(MeetJoin meetJoin, ScriptLine scriptLine) {
>>>>>>> c203284 (feat: Casing Entity 생성 S09P12B106-173)
=======
>>>>>>> back-dev
        this.meetJoin = meetJoin;
        this.scriptLine = scriptLine;
    }
}
