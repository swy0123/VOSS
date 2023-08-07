package com.yukgaejang.voss.domain.game.repository;

import com.yukgaejang.voss.domain.game.repository.entity.MafiaGameSource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MafiaGameSourceRepository extends JpaRepository<MafiaGameSource, Long>, MafiaGameSourceSupportRepository {
}
