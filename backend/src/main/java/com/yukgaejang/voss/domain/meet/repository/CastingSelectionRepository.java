package com.yukgaejang.voss.domain.meet.repository;

import com.yukgaejang.voss.domain.meet.repository.entity.CastingSelection;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CastingSelectionRepository extends JpaRepository<CastingSelection, Long>, CastingSelectionSupportRepository {

}
