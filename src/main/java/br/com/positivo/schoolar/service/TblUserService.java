package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.domain.TblLogin;
import br.com.positivo.schoolar.domain.TblSchoolUserRole;
import br.com.positivo.schoolar.domain.TblUser;
import br.com.positivo.schoolar.repository.TblRoleRepository;
import br.com.positivo.schoolar.repository.TblSchoolUserRoleRepository;
import br.com.positivo.schoolar.repository.TblUserRepository;
import br.com.positivo.schoolar.service.dto.*;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.http.client.HttpResponseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service class for managing TblUserService.
 */
@Service
@Transactional
public class TblUserService implements Serializable {

    private static final long serialVersionUID = 1L;
    private static final String ENTITY_NAME = "tblLogin";
    private final transient TblUserRepository tblUserRepository;
    private final Logger log = LoggerFactory.getLogger(TblUserService.class);
    @Autowired
    private TblRoleRepository tblRoleRepository;

    @Autowired
    private UAAService uaaService;

    @Autowired
    private TblSchoolUserRoleRepository tblSchoolUserRoleRepository;

    public TblUserService(TblUserRepository tblUserRepository) {
        this.tblUserRepository = tblUserRepository;
    }

    @Transactional(readOnly = true)
    public List<TblUserNFCDTO> getAllDependentsByGuardianId(final Long id) {

        List<TblUserNFCDTO> results = tblUserRepository.findAllDependentsByGuardianId(id);

        List<TblUserNFCDTO> list = new ArrayList<>();

        Long currentUserId = null;
        Long currentGuardianId = null;
        Long currentSchoolId = null;
        TblUserNFCDTO currentUser = null;

        if (null != results && !results.isEmpty()) {

            for (TblUserNFCDTO user : results) {

                if (null != user.getId() && !user.getId().equals(currentUserId)) {
                    currentUserId = user.getId();
                    currentUser = TblUserNFCDTO.convertUserData(user);
                    list.add(currentUser);
                    currentUser.setGuardianList(new HashSet<>());
                    currentUser.setSchoolList(new HashSet<>());
                    currentGuardianId = null;
                    currentSchoolId = null;
                }

                if (null != user.getIdGuardian() && !user.getIdGuardian().equals(currentGuardianId)) {
                    currentGuardianId = user.getIdGuardian();
                    currentUser.getGuardianList().add(TblUserGuardianNFCDTO.convertDataToUserGuardianNFCDTO(user));
                    currentSchoolId = null;
                }

                if (null != user.getSchoolId() && !user.getSchoolId().equals(currentSchoolId)) {
                    currentSchoolId = user.getSchoolId();
                    currentUser.getSchoolList().add(TblSchoolNFCDTO.createTblSchoolDTO(user));
                    currentGuardianId = null;
                }
            }
            return list;
        }
        return list;
    }

    @Transactional(readOnly = true)
    public TblUserNFCDTO getTblUserByNfcId(String nfcId) {

        List<TblUserNFCDTO> list = tblUserRepository.findTblUserByNfcId(nfcId);
        TblUserNFCDTO user = new TblUserNFCDTO();
        if (null != list && !list.isEmpty()) {
            return getTblUserNFCDTO(list);
        }
        return user;
    }

    @Transactional(readOnly = true)
    public List<TblUserNFCDTO> getUsersByIds(final Set<Long> ids) {

        List<TblUserNFCDTO> result = tblUserRepository.findUsersByIds(ids);

        Long currentUserId = null;
        Long currentSchoolId = null;
        TblUserNFCDTO currentUser = null;

        List<TblUserNFCDTO> list = new ArrayList<>();

        if (null != result && !result.isEmpty()) {

            for (TblUserNFCDTO user : result) {

                if (null != user.getId() && !user.getId().equals(currentUserId)) {
                    currentUserId = user.getId();
                    currentUser = TblUserNFCDTO.convertUserData(user);
                    list.add(currentUser);
                    currentUser.setSchoolList(new HashSet<>());
                    currentSchoolId = null;
                }

                if (null != user.getSchoolId() && !user.getSchoolId().equals(currentSchoolId) && null != currentUser) {
                    currentSchoolId = user.getSchoolId();
                    currentUser.getSchoolList().add(TblSchoolNFCDTO.createTblSchoolDTO(user));
                }
            }
            return list;
        }
        return list;
    }

    @Transactional(readOnly = true)
    public TblUserNFCDTO getTblUserByUserId(Long id) {
        List<TblUserNFCDTO> list = tblUserRepository.findTblUserByUserId(id);
        TblUserNFCDTO user = new TblUserNFCDTO();
        if (null != list && !list.isEmpty()) {
            return getTblUserNFCDTO(list);
        }
        return user;
    }

    private TblUserNFCDTO getTblUserNFCDTO(List<TblUserNFCDTO> list) {
        TblUserNFCDTO user;
        Set<TblSchoolNFCDTO> schools = new HashSet<>();
        list.stream().forEach(r -> schools.add(TblSchoolNFCDTO.createTblSchoolDTO(r)));
        user = list.get(0);
        user.setSchoolList(schools);
        return user;
    }

    public List<TblUserDTO> findAllUsersWhereName(@PathVariable String name, Pageable pageable) {
        List<TblUserDTO> tblUsersDTO = new ArrayList<>();
        List<TblUser> tblUsers = tblUserRepository.findAllUsersWhereName(name, pageable);

        tblUsers.stream().forEach(u -> tblUsersDTO.add(TblUserDTO.parseTblUserToTblUserDTO(u)));

        return tblUsersDTO;
    }

    public TblUser save(TblUserDTO tblUserDTO) {
        validate(tblUserDTO);
        removeSchoolUserRole(tblUserDTO.getId());
        TblUser user = tblUserDTO.toTblUser();
        tblUserRepository.save(user);

        user.getLogins().stream().forEach(t -> {
            try {
                createTblLogin(t);
            } catch (HttpResponseException e) {
                log.debug("Error save login: ", e);
            }
        });

        return user;
    }

    private void removeSchoolUserRole(Long id) {
        if (id != null) {
            List<TblSchoolUserRole> schoolUserRoles = tblSchoolUserRoleRepository.findByUser(id);
            schoolUserRoles.stream().forEach(t -> {
                t.setIntExcluded(1);
            });

            tblSchoolUserRoleRepository.save(schoolUserRoles);
        }
    }

    private TblLogin createTblLogin(TblLogin tblLogin) throws HttpResponseException {
        log.debug("REST request to save TblLogin : {}", tblLogin);

        if (tblLogin.getId() != null) {
            throw new BadRequestAlertException("A new tblLogin cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if (tblLogin.getUser() == null && tblLogin.getUser().getId() == null) {
            throw new BadRequestAlertException("User id can not be null", "ENTITY_NAME", "useridisnull");
        }

        return uaaService.registerNewUser(tblLogin);
    }

    public void delete(Long id) {
        tblUserRepository.delete(id);
    }

    public List<TblSchoolCrudUserDTO> getTblSchoolByUserId(Long id) {
        List<TblRoleCrudUserDTO> allTblRoles = tblRoleRepository.getAllTblRoles();

        List<TblSchoolCrudUserDTO> tblSchoolByUserId = tblUserRepository.getTblSchoolByUserId(id);

        tblSchoolByUserId.stream().forEach(t -> {
            t.getRoleList().addAll(allTblRoles.stream().map(role ->
                new TblRoleCrudUserDTO(role)
            ).collect(Collectors.toList()));
        });

        return tblSchoolByUserId;
    }


    public List<TblSchoolCrudUserDTO> getTblSchoolByUserEdit(Long idEdit, Long idLogged) {

        // all school/role
        List<TblSchoolCrudUserDTO> loggedInUserRolesBySchool = getTblSchoolByUserId(idLogged);

        // only persist
        TblUser user = this.tblUserRepository.findOneWithEagerRelationships(idEdit);

        user.getTblSchoolUserRole().stream().forEach(schoolUserRole -> {
            loggedInUserRolesBySchool.stream().forEach(school -> {
                school.getRoleList().stream().forEach(schoolRole -> {
                    if (schoolRole.getId().equals(schoolUserRole.getRole().getId())
                        && school.getId().equals(schoolUserRole.getSchool().getId())) {

                        schoolRole.setChecked(true);
                    }
                });
            });
        });


        return loggedInUserRolesBySchool;
    }

    @JsonIgnore
    public void validate(TblUserDTO userDTO) {
        if (!userDTO.isUserUnderage()) {
            if (userDTO.isEmailEmpty()) {
                throw new BadRequestAlertException("", TblUser.ENTITY_NAME, "ADULT_WITH_NO_EMAIL");
            }

            if (userDTO.isCPFEmpty()) {
                throw new BadRequestAlertException("", TblUser.ENTITY_NAME, "ADULT_WITH_NO_CPF");
            }
        }
    }
}
