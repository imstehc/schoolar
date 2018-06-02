package br.com.positivo.schoolar.service.dto;

import br.com.positivo.schoolar.domain.TblGuardianType;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO representing a TblGuardianTypeDTO
 */
public class TblGuardianTypeDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @Size(max = 20)
    private String strName;

    @Size(max = 255)
    private String strDescription;

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

    public String getStrDescription() {
        return strDescription;
    }

    public void setStrDescription(String strDescription) {
        this.strDescription = strDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblGuardianTypeDTO that = (TblGuardianTypeDTO) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (strName != null ? !strName.equals(that.strName) : that.strName != null) return false;
        return strDescription != null ? strDescription.equals(that.strDescription) : that.strDescription == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (strName != null ? strName.hashCode() : 0);
        result = 31 * result + (strDescription != null ? strDescription.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblGuardianType{" +
            "id=" + getId() +
            ", strName='" + getStrName() + "'" +
            ", strDescription='" + getStrDescription() + "'" +
            "}";
    }
}
