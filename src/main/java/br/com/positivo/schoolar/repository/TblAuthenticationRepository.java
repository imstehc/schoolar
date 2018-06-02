package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblAuthentication;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblAuthentication entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblAuthenticationRepository extends JpaRepository<TblAuthentication, Long> {

}
