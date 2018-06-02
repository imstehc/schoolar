package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.repository.TblSchoolNetworkSchoolRepository;
import br.com.positivo.schoolar.util.BaseIntegrationTest;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class TblSchoolNetworkSchoolServiceTest extends BaseIntegrationTest {

    @Autowired
    private TblSchoolNetworkSchoolRepository schoolNetworkSchoolRepository;

    @Autowired
    private TblSchoolNetworkSchoolService schoolNetworkSchoolService;

    /**
     * Created by Sandro Bessa on 16/05/2018.
     */

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
    type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void testDeleteNetworkSchoolById() throws Exception{

        if (schoolNetworkSchoolRepository.exists(1L))
        {
            schoolNetworkSchoolService.deleteNetworkSchoolById(1L);
            Assert.assertTrue(!schoolNetworkSchoolRepository.exists(1L));
        }
    }
}

