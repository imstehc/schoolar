package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblSchoolSubject;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblSchoolSubject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblSchoolSubjectRepository extends JpaRepository<TblSchoolSubject, Long> {

}
