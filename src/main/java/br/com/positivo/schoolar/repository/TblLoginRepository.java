package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblLogin;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblLogin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblLoginRepository extends JpaRepository<TblLogin, Long> {

}
