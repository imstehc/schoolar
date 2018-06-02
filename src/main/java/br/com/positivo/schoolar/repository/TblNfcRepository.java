package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblNfc;
import feign.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


/**
 * Spring Data JPA repository for the TblNfc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblNfcRepository extends JpaRepository<TblNfc, Long> {
    @Query("select tbl_nfc from TblNfc tbl_nfc  where tbl_nfc.user.id=:id")
    List<TblNfc>findAssociated(@org.springframework.data.repository.query.Param("id") Long id);
}
