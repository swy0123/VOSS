package com.yukgaejang.voss.domain.practice.repository;

import com.yukgaejang.voss.domain.practice.repository.entity.Script;
import lombok.extern.java.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScriptRepository extends JpaRepository<Script, Long>, ScriptSupportRepository {

}
