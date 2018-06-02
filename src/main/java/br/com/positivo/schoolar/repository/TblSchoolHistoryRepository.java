package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblSchoolHistory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblSchoolHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblSchoolHistoryRepository extends JpaRepository<TblSchoolHistory, Long> {

}
