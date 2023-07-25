package com.yukgaejang.voss.domain.grouppractice.repository.entity;

import com.yukgaejang.voss.domain.meet.repository.MeetJoinRepository;
import com.yukgaejang.voss.domain.practice.repository.ScriptRepository;
import com.yukgaejang.voss.domain.practice.serivce.dto.response.ViewScriptLineResponse;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CastingTest {
    @Autowired
    ScriptRepository scriptRepository;

    @Autowired
    MeetJoinRepository meetJoinRepository;

    @Autowired
    EntityManager em;

    @Test
    public void setCasting() {
        List<ViewScriptLineResponse> scriptLines = scriptRepository.getScriptLines(1L);
        for (ViewScriptLineResponse scriptLine : scriptLines) {
            System.out.println("scriptLine = " + scriptLine);
        }
    }

}