package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblGrade;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblGrade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblGradeRepository extends JpaRepository<TblGrade, Long> {

}
