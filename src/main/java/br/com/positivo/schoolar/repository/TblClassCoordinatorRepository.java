package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblClassCoordinator;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblClassCoordinator entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblClassCoordinatorRepository extends JpaRepository<TblClassCoordinator, Long> {

}
