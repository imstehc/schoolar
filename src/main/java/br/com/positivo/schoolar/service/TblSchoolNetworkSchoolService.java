package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.repository.TblSchoolNetworkSchoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Service class for managing TblSchoolNetworkSchoolService.
 */
@Service
@Transactional
public class TblSchoolNetworkSchoolService {

    @Autowired
    private TblSchoolNetworkSchoolRepository tblSchoolNetworkSchoolRepository;

    public void deleteNetworkSchoolById(@PathVariable Long schoolId)
    {
        tblSchoolNetworkSchoolRepository.deleteNetworkSchoolById(schoolId);
    }
}
