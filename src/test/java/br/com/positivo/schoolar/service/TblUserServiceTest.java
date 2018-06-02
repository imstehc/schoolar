package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.domain.*;
import br.com.positivo.schoolar.repository.*;
import br.com.positivo.schoolar.service.dto.*;
import br.com.positivo.schoolar.util.BaseIntegrationTest;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Test class for the TblUserResource REST controller.
 *
 * @see UserService
 */
@Transactional
public class TblUserServiceTest extends BaseIntegrationTest {

    private static final String NFCID = "123";
    public static final int TWO = 2;
    public static final int ONE = 1;

    private List<TblUserDTO> tblUser;
    private Integer limit = 2;
    public static String schoolName = "MF";

    @Autowired
    private TblUserService tblUserService;

    @Autowired
    private TblUserRepository tblUserRepository;


    @Test
    @Transactional
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/smartservice/school_user_role_nfc.yml"} ,
        type = DatabaseOperation.CLEAN_INSERT)
    public void testSaveUser() {

        ///// PHONE ////////
        TblUserDTO user = new TblUserDTO();

        user.setStrCPF("11111111111111");
        user.setStrFirstName("usuario pai");
        user.setStrLastName("ultimo nome");
        user.setStrNickName("apelido");
        user.setDtmBirthday(Instant.now());
        user.setStrEmail("test@test.com");
        user.setStrPhoto("1211212");
        user.setStrGender("M");

        //// PHONE ////////
        Set<TblPhoneDTO> tblPhones = new HashSet<>();
        TblPhoneDTO phoneDTO = new TblPhoneDTO();
        phoneDTO.setStrPrefix("092");
        phoneDTO.setStrNumber("88888-88888");
        phoneDTO.setStrLabel("label");

        tblPhones.add(phoneDTO);
        user.getTblPhones().addAll(tblPhones);


        ///////////ADDRESS///////
        Set<TblAddressDTO> tblAddresses = new HashSet<>();
        TblAddressDTO address = new TblAddressDTO();
        address.setStrLabel("Label");
        address.setStrPostCode("6907300");
        address.setStrStreet("Rua");
        address.setStrNumber("19");
        address.setStrNeighborhood("alguma coisa");
        address.setStrComplement("alguma coisa");
        address.setStrCity("cidade");
        address.setStrState("estado");
        address.setStrCountry("pais");

        tblAddresses.add(address);
        user.getTblAddresses().addAll(tblAddresses);

        ////////GUARDIAN/////
        TblGuardianTypeDTO tblGuardianType = new TblGuardianTypeDTO();
        tblGuardianType.setId(1L);
        tblGuardianType.setStrDescription("Financeiro");
        tblGuardianType.setStrName("Financeiro");

        List<TblUserDTO> tblUsers = new ArrayList<>();
        TblUserDTO user2 = new TblUserDTO();

        user2.setStrCPF("11111111111111");
        user2.setStrFirstName("usuario filho");
        user2.setStrLastName("ultimo nome");
        user2.setStrNickName("apelido");
        user2.setDtmBirthday(Instant.now());
        user2.setStrEmail("test@test.com");
        user2.setStrPhoto("1211212");
        user2.setStrGender("M");
        user2.setTblGuardianType(tblGuardianType);

        tblUsers.add(user2);
        user.getTblUsers().addAll(tblUsers);

        /////////////////////////SCHOOL-ROLE////////////////////////

        List<TblSchoolRolesDTO> tblSchoolRolesDTOS = new ArrayList<>();

        TblSchoolRolesDTO tblSchoolRolesDTO = new TblSchoolRolesDTO();

        List<TblRoleDTO> roleList = new ArrayList<>();
        TblRoleDTO tblRoleDTO = new TblRoleDTO();
        tblRoleDTO.setId(1L);
        tblRoleDTO.setChecked(true);
        roleList.add(tblRoleDTO);

        tblSchoolRolesDTO.setId(1L);
        tblSchoolRolesDTO.setRoleList(roleList);

        tblSchoolRolesDTOS.add(tblSchoolRolesDTO);

        user.getSchoolRoles().addAll(tblSchoolRolesDTOS);


        //////////NFC///////////
        List<TblNfcDTO> nfcs = new ArrayList<>();
        TblNfcDTO tblNfcDTO = new TblNfcDTO();
        tblNfcDTO.setStrName("zcxzc-212-cxcxc");

        nfcs.add(tblNfcDTO);
        user.getNfcs().addAll(nfcs);

        ////////SCHOOL USER ROLE/////////
        List<TblSchoolUserRoleDTO> schoolUserRoles = new ArrayList<>();
        TblSchoolUserRoleDTO tblSchoolUserRole = new TblSchoolUserRoleDTO();
        tblSchoolUserRole.setRoleId(1L);
        tblSchoolUserRole.setSchoolId(1L);
        tblSchoolUserRole.setUserId(1L);

        schoolUserRoles.add(tblSchoolUserRole);
        user.getTblSchoolUserRole().addAll(schoolUserRoles);


        TblUser save = tblUserService.save(user);

        Assert.assertNotNull(save.getId());
        Assert.assertEquals(1L, save.getTblPhones().size());
        Assert.assertEquals(1L, save.getTblAddresses().size());
        Assert.assertEquals(1L, save.getGuardians().size());
        Assert.assertEquals(1L, save.getTblSchoolUserRole().size());
        Assert.assertEquals(1L, save.getNfcs().size());
        Assert.assertEquals(1L, save.getSchoolUsers().size());
        Assert.assertEquals(1L, save.getUserRoles().size());
    }

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/smartservice/school_user_role_nfc.yml"} ,
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void testGetTblUserByNfcId() {
        TblUser tblUser = tblUserRepository.findOne(1L);
        TblUserNFCDTO tblUserNFCDTO = tblUserService.getTblUserByNfcId(NFCID);

        Assert.assertNotNull(tblUserNFCDTO);
        Assert.assertEquals(tblUser.getStrFirstName() + ' ' + tblUser.getStrLastName(), tblUserNFCDTO.getName());
        Assert.assertNotNull(NFCID, tblUserNFCDTO.getNfcId());
        Assert.assertEquals(TWO, tblUserNFCDTO.getSchoolList().size());
    }

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/smartservice/guardian_dependents.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void testListGetDependentListFromUserRequest() {

        List<TblUserNFCDTO> listTblUserNFCDTOS = tblUserService.getAllDependentsByGuardianId(2L);

        TblUser tblUser = tblUserRepository.findOne(1L);

        Assert.assertNotNull(listTblUserNFCDTOS);
        Assert.assertEquals(ONE, listTblUserNFCDTOS.size());
        Assert.assertEquals(tblUser.getStrFirstName() + ' ' + tblUser.getStrLastName(), listTblUserNFCDTOS.get(0).getName());
        Assert.assertEquals(TWO, listTblUserNFCDTOS.get(0).getSchoolList().size());
    }

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/smartservice/school_users_role_nfc.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void testGetUsersByIds() {

        Set<Long> ids = new HashSet<>();
        ids.add(1L);
        ids.add(2L);

        TblUser tblUser = new TblUser();
        tblUser.setId(1L);

        List<TblUserNFCDTO> users = tblUserService.getUsersByIds(ids);

        Assert.assertNotNull(users);
        Assert.assertEquals(TWO, users.size());
        Assert.assertEquals(tblUser.getId(), users.get(0).getId());
    }

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void testGetUsersByLogin() {

        TblUserNFCDTO user = tblUserService.getTblUserByUserId(2L);

        TblUser tblUserGuardianPai = new TblUser();
        tblUserGuardianPai.setStrFirstName("Responsavel");
        tblUserGuardianPai.setStrLastName("Pai");

        Assert.assertNotNull(user);
        Assert.assertEquals(tblUserGuardianPai.getStrFirstName(), user.getFirstName());
        Assert.assertEquals(tblUserGuardianPai.getStrLastName(), user.getLastName());
        Assert.assertEquals(ONE, user.getSchoolList().size());

    }

    /**
     * Created by Sandro Bessa on 16/05/2018.
     */
//"/dataset/common/user.yml",

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void testfindAllUsersWhereName() throws Exception{
        Pageable topElements = new PageRequest(0, limit);
        tblUser = tblUserService.findAllUsersWhereName("Sandr", topElements);
        Assert.assertTrue(tblUser.size() > 0);
    }

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void getTblSchoolByUserId() throws Exception{
        List<TblSchoolCrudUserDTO> dto = this.tblUserService.getTblSchoolByUserId(1L);
        Assert.assertEquals(1L, dto.size());
        Assert.assertEquals(new Long(1), dto.get(0).getId());
        Assert.assertEquals(schoolName, dto.get(0).getStrName());
    }
}
