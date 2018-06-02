package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.domain.TblSchool;
import br.com.positivo.schoolar.repository.TblSchoolRepository;
import br.com.positivo.schoolar.service.dto.TblSchoolCrudUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * Service class for managing TblSchoolService.
 */
@Service
@Transactional
public class TblSchoolService {

    @Autowired
    private TblSchoolRepository tblSchoolRepository;

    public List<TblSchool> findAllSchoolsWhereName(@PathVariable String name, Pageable pageable) {
        return tblSchoolRepository.findAllSchoolsWhereName(name, pageable);
    }

}
