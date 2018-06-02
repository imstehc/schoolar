package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblAddress;
import br.com.positivo.schoolar.domain.TblSchool;
import br.com.positivo.schoolar.domain.TblSchoolNetwork;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TblSchoolNetwork entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblSchoolNetworkRepository extends JpaRepository<TblSchoolNetwork, Long> {
    @Query("select distinct tbl_school_network from TblSchoolNetwork tbl_school_network left join fetch tbl_school_network.tblPhones left join fetch tbl_school_network.tblAddresses")
    List<TblSchoolNetwork> findAllWithEagerRelationships();

    @Query("select tbl_school_network from TblSchoolNetwork tbl_school_network left join fetch tbl_school_network.tblPhones left join fetch tbl_school_network.tblAddresses where tbl_school_network.id =:id")
    TblSchoolNetwork findOneWithEagerRelationships(@Param("id") Long id);

    @Query(" select tbl_school from TblSchool tbl_school inner join  TblSchoolNetworkSchool tbl_school_network_school on tbl_school_network_school.school = tbl_school.id inner join  TblSchoolNetwork tbl_school_network on tbl_school_network.id = tbl_school_network_school.schoolNetwork left join fetch tbl_school.tblAddresses left join fetch tbl_school.tblPhones where tbl_school_network.id = :id")
    List<TblSchool> findAllSchoolsWithEagerRelationships(@Param("id") Long id);


}
