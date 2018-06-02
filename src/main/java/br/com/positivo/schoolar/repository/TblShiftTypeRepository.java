package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblShiftType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblShiftType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblShiftTypeRepository extends JpaRepository<TblShiftType, Long> {

}
