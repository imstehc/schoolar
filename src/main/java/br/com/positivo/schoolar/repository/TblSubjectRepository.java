package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblSubject;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblSubject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblSubjectRepository extends JpaRepository<TblSubject, Long> {

}
