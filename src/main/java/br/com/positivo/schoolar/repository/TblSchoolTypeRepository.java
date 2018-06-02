package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblSchoolType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblSchoolType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblSchoolTypeRepository extends JpaRepository<TblSchoolType, Long> {

}
