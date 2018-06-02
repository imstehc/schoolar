package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblClassSubjectTeacher;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblClassSubjectTeacher entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblClassSubjectTeacherRepository extends JpaRepository<TblClassSubjectTeacher, Long> {

}
