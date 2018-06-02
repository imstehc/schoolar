package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblGuardian;
import br.com.positivo.schoolar.service.dto.TblGuardianDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import javax.transaction.Transactional;
import java.util.List;


/**
 * Spring Data JPA repository for the TblGuardian entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblGuardianRepository extends JpaRepository<TblGuardian, Long> {

    @Query(" select new br.com.positivo.schoolar.service.dto.TblGuardianDTO(" +
        " u.id, " +
        " u.strPhoto, " +
        " u.strFirstName, " +
        " u.strLastName, " +
        " g1.id, " +
        " g1.guardianUser.id, " +
        " g1.guardianUser.strFirstName, " +
        " g1.guardianUser.strLastName, " +
        " gt.id, " +
        " gt.strName, " +
        " gt.strDescription) " +
        " from TblUser u " +
        " join u.guardians g " +
        " join u.guardians g1 " +
        " join g1.guardianType gt " +
        " join g.guardianUser gu " +
        " where g.guardianUser.id = :id " +
        " and  u.intExcluded = 0 " +
        " order by g1.id desc")
    List<TblGuardianDTO> findAllDependentsByGuardianId(@Param("id") final Long id);

    @Query(" select new br.com.positivo.schoolar.service.dto.TblGuardianDTO(" +
        " g.id, " +
        " g.dtmLastUpdate, " +
        " g.user.id, " +
        " g.guardianUser.id, " +
        " g.guardianType.id ) " +
        " from TblGuardian g " +
        " order by g.id desc")
    List<TblGuardianDTO> findAllGuardians();

    @Modifying
    @Query(" delete from TblGuardian tbl_guardian where tbl_guardian.user.id = :userId")
    @Transactional
    void deleteUserIdGuardian(@Param("userId") Long userId);

}

