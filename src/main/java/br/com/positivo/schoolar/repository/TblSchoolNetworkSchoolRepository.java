package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblSchoolNetworkSchool;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import javax.transaction.Transactional;



/**
 * Spring Data JPA repository for the TblSchoolNetworkSchool entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblSchoolNetworkSchoolRepository extends JpaRepository<TblSchoolNetworkSchool, Long> {

    @Modifying
    @Query("delete from TblSchoolNetworkSchool tbl_school_network_school where tbl_school_network_school.schoolId = :schoolId")
    @Transactional
    void deleteNetworkSchoolById(@Param("schoolId") Long schoolId);
}

