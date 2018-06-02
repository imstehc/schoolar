package br.com.positivo.schoolar.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO representing a user.
 */
public class TblRoleDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    public static final Integer EXIST_SCHOOL = 1;
    public static final Integer EXIST_ROLE = 1;

    private Long id;

    private String strName;

    private Integer permissionRole;

    private boolean checked;

    public TblRoleDTO() {
        // Empty constructor needed for Jackson.
    }

    public TblRoleDTO(Long id, String strName, Integer permissionRole) {
        this.id = id;
        this.strName = strName;
        this.permissionRole = permissionRole;
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

    public Integer getPermissionRole() {
        return permissionRole;
    }

    public void setPermissionRole(Integer permissionRole) {
        this.permissionRole = permissionRole;
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
        TblRoleDTO roleDTO = (TblRoleDTO) o;
        return Objects.equals(id, roleDTO.id) &&
            Objects.equals(strName, roleDTO.strName) &&
            Objects.equals(permissionRole, roleDTO.permissionRole);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, strName, permissionRole);
    }

    @Override
    public String toString() {
        return "TblRoleDTO{" +
            "id=" + id +
            ", strName='" + strName + '\'' +
            ", permissionRole=" + permissionRole +
            '}';
    }
}
