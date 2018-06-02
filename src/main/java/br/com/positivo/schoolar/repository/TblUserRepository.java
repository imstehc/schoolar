package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblUser;
import br.com.positivo.schoolar.service.dto.TblSchoolCrudUserDTO;
import br.com.positivo.schoolar.service.dto.TblUserNFCDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the TblUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblUserRepository extends JpaRepository<TblUser, Long>{

    @Query("select distinct tbl_user from TblUser tbl_user " +
        "left join fetch tbl_user.tblPhones " +
        "left join fetch tbl_user.tblAddresses " +
        "where tbl_user.intExcluded not in(1)")
    List<TblUser> findAllWithEagerRelationships();

    @Query("select distinct tbl_user from TblUser tbl_user " +
        "where tbl_user.intExcluded != 1 " +
        "and (lower(tbl_user.strFirstName) like concat('%',lower(:name),'%') or lower(tbl_user.strLastName) like concat('%',lower(:name),'%')) " +
        "order by tbl_user.strFirstName")
    Page<TblUser> findAllPaginated(@Param("name") String name, Pageable pageRequest);

    @Query("select tbl_user from TblUser tbl_user where upper(CONCAT(tbl_user.strFirstName,' ', tbl_user.strLastName)) like CONCAT('%',upper(:name),'%') and tbl_user.intExcluded = 0")
    List<TblUser> findAllUsersWhereName(@Param("name") String name, Pageable pageable);

    @Query("select tbl_user from TblUser tbl_user " +
        "left join fetch tbl_user.tblPhones " +
        "left join fetch tbl_user.tblAddresses " +
        "left join fetch tbl_user.tblSchoolUserRole " +
        "where tbl_user.id =:id ")
    TblUser findOneWithEagerRelationships(@Param("id") Long id);

    @Query(" select new br.com.positivo.schoolar.service.dto.TblUserNFCDTO(" +
        " u.id, " +
        " u.strPhoto, " +
        " u.strFirstName, " +
        " u.strLastName, " +
        " n.strName, " +
        " g1.id, " +
        " g1.guardianUser.id, " +
        " g1.guardianUser.strFirstName, " +
        " g1.guardianUser.strLastName, " +
        " su.school.id, " +
        " su.school.strName, " +
        " su.school.strPhoto) " +
        " from TblUser u " +
        " join u.guardians g " +
        " join u.guardians g1 " +
        " join g.guardianUser gu " +
        " left join u.nfcs n " +
        " left join u.schoolUsers su " +
        " where g.guardianUser.id = :id " +
        " order by u.id, g1.guardianUser.id, su.school.id ")
    List<TblUserNFCDTO> findAllDependentsByGuardianId(@Param("id") final Long id);

    @Query(" select new br.com.positivo.schoolar.service.dto.TblUserNFCDTO(" +
        " u.id, " +
        " u.strPhoto, " +
        " u.strFirstName, " +
        " u.strLastName, " +
        " s.id, " +
        " s.strName, " +
        " s.strPhoto, " +
        " n.strName) " +
        " from TblUser u " +
        " inner join fetch TblNfc n on n.user.id = u.id " +
        " inner join fetch TblSchoolUser su on su.user.id = u.id " +
        " inner join fetch TblSchool s on s.id = su.school.id " +
        " where n.strName = :nfcId ")
    List<TblUserNFCDTO> findTblUserByNfcId(@Param("nfcId") final String nfcId);

    @Query(" select new br.com.positivo.schoolar.service.dto.TblUserNFCDTO(" +
        " u.id, " +
        " u.strPhoto, " +
        " u.strFirstName, " +
        " u.strLastName, " +
        " s.id, " +
        " s.strName, " +
        " s.strPhoto) " +
        " from TblUser u " +
        " left join u.schoolUsers us" +
        " left join us.school s " +
        " where u.id in :ids" +
        " order by u.id, us.school.id ")
    List<TblUserNFCDTO> findUsersByIds(@Param("ids") final Set<Long> ids);

    @Query(" select new br.com.positivo.schoolar.service.dto.TblUserNFCDTO(" +
        " u.id, " +
        " u.strPhoto, " +
        " u.strFirstName, " +
        " u.strLastName, " +
        " s.id, " +
        " s.strName, " +
        " s.strPhoto, " +
        " n.strName) " +
        " from TblUser u " +
        " left join TblLogin l on l.user.id = u.id " +
        " left join TblNfc n on n.user.id = u.id " +
        " left join TblSchoolUser su on su.user.id = u.id " +
        " left join TblSchool s on s.id = su.school.id " +
        " where u.id = :id")
    List<TblUserNFCDTO> findTblUserByUserId(@Param("id") final Long id);

    @Query(" select new br.com.positivo.schoolar.service.dto.TblSchoolCrudUserDTO(" +
        " s.id, s.strName ) " +
        " from TblSchoolUser su " +
        " join su.school s " +
        " join su.user u " +
        " where u.id = :id " +
        " order by u.id ")
    List<TblSchoolCrudUserDTO> getTblSchoolByUserId(@Param("id") final Long id);

}
