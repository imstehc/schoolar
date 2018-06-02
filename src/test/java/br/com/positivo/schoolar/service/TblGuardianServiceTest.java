package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.repository.TblGuardianRepository;
import br.com.positivo.schoolar.util.BaseIntegrationTest;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class TblGuardianServiceTest extends BaseIntegrationTest {

    @Autowired
    private TblGuardianRepository guardianRepository;

    @Autowired
    private TblGuardianService guardianService;

    /**
     * Created by Sandro Bessa on 16/05/2018.
     */

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
    type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void deleteUserIdGuardian() throws Exception{

        if (guardianRepository.exists(1L))
        {
            guardianService.deleteUserIdGuardian(1L);
            Assert.assertTrue(!guardianRepository.exists(1L));
        }
    }

    /**
     * Created by Sandro Bessa on 21/05/2018.
     */
    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
        type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void findAllGuardians() throws Exception{

            Assert.assertTrue(guardianRepository.findAllGuardians().size() > 0);
    }
}

