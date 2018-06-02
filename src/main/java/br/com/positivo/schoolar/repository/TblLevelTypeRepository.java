package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblLevelType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblLevelType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblLevelTypeRepository extends JpaRepository<TblLevelType, Long> {

}
