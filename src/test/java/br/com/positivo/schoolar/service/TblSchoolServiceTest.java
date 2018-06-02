package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.domain.TblSchool;
import br.com.positivo.schoolar.repository.TblSchoolRepository;
import br.com.positivo.schoolar.service.dto.TblSchoolCrudUserDTO;
import br.com.positivo.schoolar.util.BaseIntegrationTest;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public class TblSchoolServiceTest extends BaseIntegrationTest {

    @Autowired
    private TblSchoolRepository schoolRepository;

    @Autowired
    private TblSchoolService schoolService;

    private List<TblSchool> tblSchool;

    private Integer limit = 2;

    /**
     * Created by Sandro Bessa on 16/05/2018.
     */

    @Test
    @DatabaseSetup(value = {"/dataset/common/school_network.yml", "/dataset/common/school_user_role.yml", "/dataset/smartservice/nfc_login_guardian.yml"},
    type = DatabaseOperation.CLEAN_INSERT)
    @Transactional
    public void testfindAllSchoolsWhereName() throws Exception{
        Pageable topElements = new PageRequest(0, limit);
        tblSchool = schoolService.findAllSchoolsWhereName("MF", topElements);
        Assert.assertTrue(tblSchool.size() > 0);
    }

}

