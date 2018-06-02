package br.com.positivo.schoolar.service;

import br.com.positivo.schoolar.domain.TblRole;
import br.com.positivo.schoolar.domain.TblSchool;
import br.com.positivo.schoolar.repository.TblRoleRepository;
import br.com.positivo.schoolar.repository.TblSchoolRepository;
import br.com.positivo.schoolar.service.dto.TblRoleCrudUserDTO;
import br.com.positivo.schoolar.service.dto.TblRoleDTO;
import br.com.positivo.schoolar.service.dto.TblSchoolRolesDTO;
import br.com.positivo.schoolar.service.dto.TblSchoolUserRoleDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing TblRoleService.
 */
@Service
@Transactional
public class TblRoleService implements Serializable {

    private static final long serialVersionUID = 1L;

    @Autowired
    private transient TblRoleRepository tblRoleRepository;

    @Autowired
    private transient TblSchoolRepository tblSchoolRepository;

    /**
     * Create TblRolesDTO.
     * @param roleList
     * @return
     */
    public List<TblRoleDTO> createTblRolesDTO(List<TblRole>  roleList){
        List<TblRoleDTO> roleDTOS = new ArrayList<>();

        for(TblRole role: roleList){
            TblRoleDTO roleDTO = new TblRoleDTO(role.getId(), role.getStrName(), 0);
            roleDTOS.add(roleDTO);
        }

        return roleDTOS;
    }

    /**
     * Create TBLSchoolDTO.
     * @param schoolList
     * @param roleDTOS
     * @return
     */
    public List<TblSchoolRolesDTO> createTblSchoolDTO (List<TblSchool>  schoolList, List<TblRoleDTO> roleDTOS){
        List<TblSchoolRolesDTO> schoolRolesDTOS = new ArrayList<>();

        for(TblSchool school: schoolList){
            TblSchoolRolesDTO schoolRolesDTO = new TblSchoolRolesDTO(school.getId(), school.getStrName(), 0, roleDTOS);
            schoolRolesDTOS.add(schoolRolesDTO);
        }

        return schoolRolesDTOS;
    }

    @Transactional(readOnly = true)
    public List<TblSchoolUserRoleDTO> getTblSchoolUserRoleByUserId(final Long id) {
        List<TblSchoolUserRoleDTO>  list = tblRoleRepository.getTblSchoolUserRoleByUserId(id);

        List<TblSchool>  schoolList = tblSchoolRepository.findAll();
        List<TblRole>  roleList = tblRoleRepository.findAll();
        List<TblRoleDTO> roleDTOS = this.createTblRolesDTO(roleList);
        List<TblSchoolRolesDTO> schoolRolesDTOS = this.createTblSchoolDTO(schoolList, roleDTOS);

        for(TblSchoolUserRoleDTO dto: list){
            for(TblSchoolRolesDTO dtoSchool: schoolRolesDTOS){
                for(TblRoleDTO dtoRole: dtoSchool.getRoleList()){

                    if(dtoSchool.getId().equals(dto.getSchoolId()) && dtoRole.getId().equals(dto.getRoleId())){
                        dtoRole.setPermissionRole(TblRoleDTO.EXIST_ROLE);
                        dtoSchool.setPermissionSchool(TblRoleDTO.EXIST_SCHOOL);
                    }
                }
            }
            dto.getSchoolList().addAll(schoolRolesDTOS);
        }
        return list;
    }

    @Transactional(readOnly = true)
    public List<TblSchoolUserRoleDTO> getTblSchoolUserRole() {
        TblSchoolUserRoleDTO  schoolUserRoleDTO = new TblSchoolUserRoleDTO();
        List<TblSchoolUserRoleDTO>  list = new ArrayList<>();
        List<TblSchool>  schoolList = tblSchoolRepository.findAll();
        List<TblRole>  roleList = tblRoleRepository.findAll();
        List<TblRoleDTO> roleDTOS = this.createTblRolesDTO(roleList);
        List<TblSchoolRolesDTO> schoolRolesDTOS = this.createTblSchoolDTO(schoolList, roleDTOS);

        schoolUserRoleDTO.getSchoolList().addAll(schoolRolesDTOS);
        list.add(schoolUserRoleDTO);

        return list;
    }

    @Transactional(readOnly = true)
    public List<TblRoleCrudUserDTO> getAllTblRoles() {
        return tblRoleRepository.getAllTblRoles();
    }
}
