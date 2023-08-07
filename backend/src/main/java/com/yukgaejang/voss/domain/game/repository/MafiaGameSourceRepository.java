package com.yukgaejang.voss.domain.game.repository;

import com.yukgaejang.voss.domain.game.repository.entity.MafiaGameSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MafiaGameSourceRepository extends JpaRepository<MafiaGameSource, Long>, MafiaGameSourceSupportRepository {

    @Query(value = "SELECT * FROM mafia_game_source ORDER BY RAND() LIMIT :cnt", nativeQuery = true)
    List<MafiaGameSource> getRandomMafiaSourceListLimitCnt(@Param(value = "cnt") int cnt);
}
