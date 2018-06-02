package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblSchoolUserRole;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the TblSchoolUserRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblSchoolUserRoleRepository extends JpaRepository<TblSchoolUserRole, Long> {


    @Query(" SELECT sur FROM TblSchoolUserRole sur WHERE sur.user.id=:id ")
    List<TblSchoolUserRole> findByUser(@Param("id") Long id);

}
