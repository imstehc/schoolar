package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblUserHistory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblUserHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblUserHistoryRepository extends JpaRepository<TblUserHistory, Long> {

}
