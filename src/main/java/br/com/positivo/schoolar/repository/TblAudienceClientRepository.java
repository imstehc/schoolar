package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblAudienceClient;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TblAudienceClient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblAudienceClientRepository extends JpaRepository<TblAudienceClient, Long> {

}
