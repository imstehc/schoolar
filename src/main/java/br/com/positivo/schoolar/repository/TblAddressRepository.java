package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblAddress;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblAddress entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblAddressRepository extends JpaRepository<TblAddress, Long> {

}
