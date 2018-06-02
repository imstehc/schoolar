package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblUserRole;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblUserRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblUserRoleRepository extends JpaRepository<TblUserRole, Long> {

}
