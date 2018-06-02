package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblClass;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblClassRepository extends JpaRepository<TblClass, Long> {

}
