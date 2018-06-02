package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblClassStudent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblClassStudent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblClassStudentRepository extends JpaRepository<TblClassStudent, Long> {

}
