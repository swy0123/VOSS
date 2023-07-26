package com.yukgaejang.voss.domain.grouppractice.repository;

import com.yukgaejang.voss.domain.grouppractice.repository.entity.Cast;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CastRepository extends JpaRepository<Cast, Long>, CastSupportRepository {
}
