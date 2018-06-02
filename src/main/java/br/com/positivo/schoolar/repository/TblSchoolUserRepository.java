package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblSchoolUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblSchoolUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblSchoolUserRepository extends JpaRepository<TblSchoolUser, Long> {

}
