package br.com.positivo.schoolar.service.dto;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by thiago.lapa on 28/05/18.
 */
public class TblSchoolCrudUserDTO implements Serializable {

    private static final long serialVersionUID =1L;

    private Long id;

    private String strName;

    private boolean checked;

    List<TblRoleCrudUserDTO> roleList = new ArrayList<>();

    public TblSchoolCrudUserDTO() {
    }

    public TblSchoolCrudUserDTO(Long id, String strName) {
        this.id = id;
        this.strName = strName;
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

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public List<TblRoleCrudUserDTO> getRoleList() {
        return roleList;
    }

    public void setRoleList(List<TblRoleCrudUserDTO> roleList) {
        this.roleList = roleList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblSchoolCrudUserDTO that = (TblSchoolCrudUserDTO) o;

        if (checked != that.checked) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        return strName != null ? strName.equals(that.strName) : that.strName == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (strName != null ? strName.hashCode() : 0);
        result = 31 * result + (checked ? 1 : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblSchoolCrudUserDTO{" +
            "id=" + id +
            ", strName='" + strName + '\'' +
            ", checked=" + checked +
            '}';
    }
}
