package br.com.positivo.schoolar.service.dto;


import java.io.Serializable;

/**
 * Created by thiago.lapa on 28/05/18.
 */
public class TblRoleCrudUserDTO implements Serializable {

    private static final long serialVersionUID =1L;

    private Long id;

    private String strDescription;

    private Long idSchool;

    private boolean checked;

    public TblRoleCrudUserDTO() {
    }

    public TblRoleCrudUserDTO(Long id, String strDescription) {
        this.id = id;
        this.strDescription = strDescription;
    }

    public TblRoleCrudUserDTO(TblRoleCrudUserDTO userRole) {
        this.id = userRole.getId();
        this.strDescription = userRole.getStrDescription();
        this.idSchool = userRole.getIdSchool();
        this.checked = userRole.isChecked();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrDescription() {
        return strDescription;
    }

    public void setStrDescription(String strDescription) {
        this.strDescription = strDescription;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public Long getIdSchool() {
        return idSchool;
    }

    public void setIdSchool(Long idSchool) {
        this.idSchool = idSchool;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblRoleCrudUserDTO that = (TblRoleCrudUserDTO) o;

        if (checked != that.checked) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        return strDescription != null ? strDescription.equals(that.strDescription) : that.strDescription == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (strDescription != null ? strDescription.hashCode() : 0);
        result = 31 * result + (checked ? 1 : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblRoleCrudUserDTO{" +
            "id=" + id +
            ", strDescription='" + strDescription + '\'' +
            ", checked=" + checked +
            '}';
    }

}
