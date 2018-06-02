package br.com.positivo.schoolar.service.dto;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Created by fsupi on 30/01/18.
 */
public class TblSchoolRolesDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @Size(max = 20)
    private String strName;

    private Integer permissionSchool;

    private boolean checked;

    private List<TblRoleDTO> roleList = new ArrayList<>();

    public TblSchoolRolesDTO() {
    }

    public TblSchoolRolesDTO(Long id, String strName, Integer permissionSchool, List<TblRoleDTO> roleList) {
        this.id = id;
        this.strName = strName;
        this.permissionSchool = permissionSchool;
        this.roleList = roleList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrName() {
        return strName;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public Integer getPermissionSchool() {
        return permissionSchool;
    }

    public void setPermissionSchool(Integer permissionSchool) {
        this.permissionSchool = permissionSchool;
    }

    public List<TblRoleDTO> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<TblRoleDTO> roleList) {
        this.roleList = roleList;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TblSchoolRolesDTO that = (TblSchoolRolesDTO) o;
        return Objects.equals(id, that.id) &&
            Objects.equals(strName, that.strName) &&
            Objects.equals(permissionSchool, that.permissionSchool);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, strName);
    }

    @Override
    public String toString() {
        return "TblSchoolRolesDTO{" +
            "id=" + id +
            ", strName='" + strName + '\'' +
            ", permissionSchool=" + permissionSchool +
            '}';
    }
}
