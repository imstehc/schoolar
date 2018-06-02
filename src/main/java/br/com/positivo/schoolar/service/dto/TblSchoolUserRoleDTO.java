package br.com.positivo.schoolar.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


/**
 * A DTO representing a TblSchoolUserRole
 */
public class TblSchoolUserRoleDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private Instant dtmCreated;

    private Instant dtmLastUpdate;

    private Integer intExcluded;

    private Long roleId;

    private Long schoolId;

    private Long userId;

    private String strNameSchool;

    private String strNameRole;

    private TblUserDTO user;

    private TblSchoolDTO school;

    private TblRoleDTO role;

    private List<TblSchoolRolesDTO> schoolList = new ArrayList<TblSchoolRolesDTO>();

    public TblSchoolUserRoleDTO() {

    }

    public TblSchoolUserRoleDTO(Long id, String strNameSchool, String strNameRole, Long roleId, Long schoolId) {
        this.id = id;
        this.strNameSchool = strNameSchool;
        this.strNameRole = strNameRole;
        this.roleId = roleId;
        this.schoolId = schoolId;
    }

    public List<TblSchoolRolesDTO> getSchoolList() {
        return schoolList;
    }

    public void setSchoolList(List<TblSchoolRolesDTO> schoolList) {
        this.schoolList = schoolList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TblUserDTO getUser() {
        return user;
    }

    public void setUser(TblUserDTO user) {
        this.user = user;
    }

    public String getStrNameSchool() {
        return strNameSchool;
    }

    public void setStrNameSchool(String strNameSchool) {
        this.strNameSchool = strNameSchool;
    }

    public String getStrNameRole() {
        return strNameRole;
    }

    public void setStrNameRole(String strNameRole) {
        this.strNameRole = strNameRole;
    }

    public TblSchoolDTO getSchool() {
        return school;
    }

    public void setSchool(TblSchoolDTO school) {
        this.school = school;
    }

    public Long getRoleId() { return roleId; }

    public void setRoleId(Long roleId) { this.roleId = roleId; }

    public Long getSchoolId() { return schoolId; }

    public void setSchoolId(Long schoolId) { this.schoolId = schoolId; }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public TblRoleDTO getRole() {
        return role;
    }

    public TblSchoolUserRoleDTO setRole(TblRoleDTO role) {
        this.role = role;
        return this;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public TblSchoolUserRoleDTO setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblSchoolUserRoleDTO setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblSchoolUserRoleDTO setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TblSchoolUserRoleDTO that = (TblSchoolUserRoleDTO) o;
        return Objects.equals(id, that.id) &&
            Objects.equals(roleId, that.roleId) &&
            Objects.equals(schoolId, that.schoolId) &&
            Objects.equals(strNameSchool, that.strNameSchool) &&
            Objects.equals(strNameRole, that.strNameRole) &&
            Objects.equals(user, that.user) &&
            Objects.equals(school, that.school);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, roleId, schoolId, strNameSchool, strNameRole, user, school);
    }

    @Override
    public String toString() {
        return "TblSchoolUserRoleDTO{" +
            "id=" + id +
            ", roleId=" + roleId +
            ", schoolId=" + schoolId +
            ", strNameSchool='" + strNameSchool + '\'' +
            ", strNameRole='" + strNameRole + '\'' +
            ", user=" + user +
            ", school=" + school +
            '}';
    }
}
