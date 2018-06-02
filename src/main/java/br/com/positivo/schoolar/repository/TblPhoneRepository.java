package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblPhone;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblPhone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblPhoneRepository extends JpaRepository<TblPhone, Long> {

}
