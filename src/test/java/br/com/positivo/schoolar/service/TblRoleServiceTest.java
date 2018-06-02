package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.domain.TblRole;
import br.com.positivo.schoolar.domain.TblSchool;
import br.com.positivo.schoolar.repository.TblRoleRepository;
import br.com.positivo.schoolar.repository.TblSchoolRepository;
import br.com.positivo.schoolar.service.dto.TblRoleCrudUserDTO;
import br.com.positivo.schoolar.service.dto.TblRoleDTO;
import br.com.positivo.schoolar.service.dto.TblSchoolRolesDTO;
import br.com.positivo.schoolar.service.dto.TblSchoolUserRoleDTO;
import br.com.positivo.schoolar.util.BaseIntegrationTest;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Test class for the TblRoleResource REST controller.
 *
 * @see TblRoleService
 */
@Transactional
public class TblRoleServiceTest extends BaseIntegrationTest {

    @Autowired
    private TblRoleRepository tblRoleRepository;
    @Autowired
    private TblRoleService tblRoleService;
    @Autowired
    private TblSchoolRepository tblSchoolRepository;

    public static final int TWO = 2;
    public static final int THREE = 3;
    public static final int FOUR = 4;
    private static final Long USERID = Long.valueOf("1");

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void getTblSchoolUserRole(){
        List<TblSchoolUserRoleDTO> tblSchoolUserRoleDTO = this.tblRoleService.getTblSchoolUserRole();

        Assert.assertNotNull(tblSchoolUserRoleDTO);
        Assert.assertEquals(THREE, tblSchoolUserRoleDTO.get(0).getSchoolList().size());
    }

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void createTblRolesDTO() {

        List<TblRole>  roleList = tblRoleRepository.findAll();
        List<TblRoleDTO> roleDTOS = tblRoleService.createTblRolesDTO(roleList);

        Assert.assertNotNull(roleDTOS);
        Assert.assertEquals(FOUR, roleDTOS.size());
    }

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void createTblSchoolDTO() {
        List<TblRole>  roleList = tblRoleRepository.findAll();
        List<TblRoleDTO> roleDTOS = tblRoleService.createTblRolesDTO(roleList);
        List<TblSchool>  schoolList = tblSchoolRepository.findAll();

        List<TblSchoolRolesDTO> schoolRolesDTOS = tblRoleService.createTblSchoolDTO(schoolList, roleDTOS);

        Assert.assertNotNull(schoolRolesDTOS);
        Assert.assertEquals(THREE, schoolRolesDTOS.size());
    }

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void getTblSchoolUserRoleByUserId() {
        List<TblSchoolUserRoleDTO> schoolUserRoleDTOS = this.tblRoleService.getTblSchoolUserRoleByUserId(USERID);

        Assert.assertNotNull(schoolUserRoleDTOS);
        Assert.assertEquals(TWO, schoolUserRoleDTOS.size());
        assertThat(schoolUserRoleDTOS.get(0).getStrNameSchool()).isEqualTo("MF");
        assertThat(schoolUserRoleDTOS.get(0).getStrNameRole()).isEqualTo("RESPONSAVEL");
        assertThat(schoolUserRoleDTOS.get(0).getSchoolList().get(0).getPermissionSchool()).isEqualTo(1);
        assertThat(schoolUserRoleDTOS.get(0).getSchoolList().get(1).getPermissionSchool()).isEqualTo(1);
        assertThat(schoolUserRoleDTOS.get(0).getSchoolList().get(2).getPermissionSchool()).isNotEqualTo(1);
        assertThat(schoolUserRoleDTOS.get(1).getStrNameSchool()).isEqualTo("MFA");
        assertThat(schoolUserRoleDTOS.get(1).getStrNameRole()).isEqualTo("ADMIN");
        assertThat(schoolUserRoleDTOS.get(1).getSchoolList().get(0).getRoleList().get(0).getPermissionRole()).isEqualTo(1);
        assertThat(schoolUserRoleDTOS.get(1).getSchoolList().get(0).getRoleList().get(1).getPermissionRole()).isEqualTo(1);
        assertThat(schoolUserRoleDTOS.get(1).getSchoolList().get(0).getRoleList().get(2).getPermissionRole()).isNotEqualTo(1);
        assertThat(schoolUserRoleDTOS.get(1).getSchoolList().get(0).getRoleList().get(3).getPermissionRole()).isNotEqualTo(1);
    }

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void getAllTblRoles() {

        List<TblRoleCrudUserDTO> roleDTOS = this.tblRoleService.getAllTblRoles();

        Assert.assertNotNull(roleDTOS);
        Assert.assertEquals(FOUR, roleDTOS.size());
        assertThat(roleDTOS.get(0).getId()).isEqualTo(2);
        assertThat(roleDTOS.get(0).getStrDescription()).isEqualTo("ADMIN");
        assertThat(roleDTOS.get(0).isChecked()).isFalse();
        assertThat(roleDTOS.get(1).getId()).isEqualTo(3);
        assertThat(roleDTOS.get(1).getStrDescription()).isEqualTo("DIRETOR");
        assertThat(roleDTOS.get(1).isChecked()).isFalse();
    }
}
