package br.com.positivo.schoolar.repository;

import br.com.positivo.schoolar.domain.TblRole;
import br.com.positivo.schoolar.service.dto.TblRoleCrudUserDTO;
import br.com.positivo.schoolar.service.dto.TblSchoolUserRoleDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import java.util.List;


/**
 * Spring Data JPA repository for the TblRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TblRoleRepository extends JpaRepository<TblRole, Long> {

    @Query(" select new br.com.positivo.schoolar.service.dto.TblSchoolUserRoleDTO(" +
        " u.id, s.strName, r.strName, sur.role.id, sur.school.id) " +
        " from TblSchoolUserRole sur " +
        " join sur.user u " +
        " join sur.role r " +
        " join sur.school s " +
        " where u.id = :id " +
        " and  u.intExcluded = 0 " +
        " order by u.id ")
    List<TblSchoolUserRoleDTO> getTblSchoolUserRoleByUserId(@Param("id") final Long id);

    @Query(" select new br.com.positivo.schoolar.service.dto.TblRoleCrudUserDTO(" +
        " r.id, r.strDescription ) " +
        " from TblRole r " +
        " order by r.strDescription ")
    List<TblRoleCrudUserDTO> getAllTblRoles();

}
