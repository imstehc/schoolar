package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblSchool;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the TblSchool entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblSchoolRepository extends JpaRepository<TblSchool, Long> {

    @Query("select distinct tbl_school from TblSchool tbl_school left join fetch tbl_school.tblAddresses left join fetch tbl_school.tblPhones where tbl_school.intExcluded = 0")
    List<TblSchool> findAllWithEagerRelationships();

    @Query("select distinct tbl_school from TblSchool tbl_school " +
        " order by tbl_school.strName")
    List<TblSchool> findAll();

    @Query("select tbl_school from TblSchool tbl_school left join fetch tbl_school.tblAddresses left join fetch tbl_school.tblPhones where tbl_school.id =:id")
    TblSchool findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select tbl_school from TblSchool tbl_school inner join fetch tbl_school.tblAddresses where upper(tbl_school.strName) like CONCAT('%',upper(:name),'%')")
    List<TblSchool> findAllSchoolsWhereName(@Param("name") String name, Pageable pageable);

}
