package com.yukgaejang.voss.domain.practice.repository;

import com.yukgaejang.voss.domain.practice.repository.entity.ScriptLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScriptLineRepository extends JpaRepository<ScriptLine, Long> {
}
