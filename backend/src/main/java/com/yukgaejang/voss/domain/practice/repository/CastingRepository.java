package com.yukgaejang.voss.domain.practice.repository;

import com.yukgaejang.voss.domain.practice.repository.entity.Casting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CastingRepository extends JpaRepository<Casting, Long>, CastingSupportRepository {
}
