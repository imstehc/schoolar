package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.repository.TblGuardianRepository;
import br.com.positivo.schoolar.service.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * Service class for managing TblGuardianService.
 */
@Service
@Transactional
public class TblGuardianService implements Serializable {

    private static final long serialVersionUID = 1L;

    private final transient TblGuardianRepository tblGuardianRepository;

    public TblGuardianService(TblGuardianRepository tblGuardianRepository) {
        this.tblGuardianRepository = tblGuardianRepository;
    }

    @Transactional(readOnly = true)
    public List<TblUserDTO> getAllDependentsByGuardianId(final Long id) {

        List<TblGuardianDTO> results = tblGuardianRepository.findAllDependentsByGuardianId(id);

        List<TblUserDTO> list = new ArrayList<>();

        Long currentUserId = null;
        Long currentGuardianId = null;
        Long currentSchoolId = null;
        TblGuardianDTO currentUser = null;

        if (null != results && !results.isEmpty()) {

            for (TblGuardianDTO user : results) {

                if (null != user.getId() && !user.getId().equals(currentUserId)) {
                    currentUserId = user.getId();
                    currentUser = TblGuardianDTO.convertUserData(user);
                    list.add(currentUser.getUser());
                    currentUser.setGuardianList(new HashSet<>());
                    currentUser.setSchoolList(new HashSet<>());
                    currentGuardianId = null;
                    currentSchoolId = null;
                }

                if (null != user.getIdGuardian() && !user.getIdGuardian().equals(currentGuardianId)) {
                    currentGuardianId = user.getIdGuardian();
                    currentUser.getGuardianList().add(TblGuardianDTO.convertDataToUserGuardianNFCDTO(user));
                    currentSchoolId = null;
                }

                if (null != user.getSchoolId() && !user.getSchoolId().equals(currentSchoolId)) {
                    currentSchoolId = user.getSchoolId();
                    currentUser.getSchoolList().add(TblGuardianDTO.createTblSchoolDTO(user));
                    currentGuardianId = null;
                }
            }
            return list;
        }
        return list;
    }

    public void deleteUserIdGuardian(@PathVariable Long userId) {
        tblGuardianRepository.deleteUserIdGuardian(userId);
    }
}
