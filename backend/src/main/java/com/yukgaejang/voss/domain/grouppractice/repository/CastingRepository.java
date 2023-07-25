package com.yukgaejang.voss.domain.grouppractice.repository;

import com.yukgaejang.voss.domain.grouppractice.repository.entity.Casting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CastingRepository extends JpaRepository<Casting, Long>, CastingSupportRepository {
}
