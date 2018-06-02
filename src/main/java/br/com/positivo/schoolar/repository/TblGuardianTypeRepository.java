package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblGuardianType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblGuardianType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblGuardianTypeRepository extends JpaRepository<TblGuardianType, Long> {

}
