package com.yukgaejang.voss.domain.practice.repository;

import com.yukgaejang.voss.domain.practice.repository.entity.Stat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatRepository extends JpaRepository<Stat, Long> {
}