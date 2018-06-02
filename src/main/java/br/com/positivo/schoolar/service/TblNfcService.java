package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.domain.TblNfc;
import br.com.positivo.schoolar.repository.TblNfcRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;

@Service
@Transactional
public class TblNfcService implements Serializable {

    private static final long serialVersionUID = 1L;

    @Autowired
    private UAAService uaaService;

    @Autowired
    private transient TblNfcRepository tblNfcRepository;

    public TblNfc save(TblNfc tblNfc) throws Exception {
        TblNfc result =  this.tblNfcRepository.save(tblNfc);

        if (result.getUser() != null) {
            uaaService.associateTblNfcWithUser(result.getId(), result.getUser().getId());
        }

        return result;
    }
}
