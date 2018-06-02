package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblGeneralProcedureType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblGeneralProcedureType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblGeneralProcedureTypeRepository extends JpaRepository<TblGeneralProcedureType, Long> {

}
