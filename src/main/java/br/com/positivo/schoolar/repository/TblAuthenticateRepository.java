package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblAuthenticate;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblAuthenticate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblAuthenticateRepository extends JpaRepository<TblAuthenticate, Long> {

}
