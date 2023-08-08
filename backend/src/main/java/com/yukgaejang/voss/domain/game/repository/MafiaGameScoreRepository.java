package com.yukgaejang.voss.domain.game.repository;

import com.yukgaejang.voss.domain.game.repository.entity.MafiaGameScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MafiaGameScoreRepository extends JpaRepository<MafiaGameScore, Long>, MafiaGameScoreSupportRepository {
}
