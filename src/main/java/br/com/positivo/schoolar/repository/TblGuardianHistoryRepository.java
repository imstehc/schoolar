package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblGuardianHistory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblGuardianHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblGuardianHistoryRepository extends JpaRepository<TblGuardianHistory, Long> {

}
