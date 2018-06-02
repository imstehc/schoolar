package br.com.positivo.schoolar.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.Size;
import java.io.Serializable;


/**
 * A DTO representing a TblUser
 */
public class TblUserGuardianNFCDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @Size(max = 20)
    private String name;

    @Size(max = 20)
    @JsonIgnore
    private String strFirstName;

    @Size(max = 20)
    @JsonIgnore
    private String strLastName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStrFirstName() {
        return strFirstName;
    }

    public void setStrFirstName(String strFirstName) {
        this.strFirstName = strFirstName;
    }

    public String getStrLastName() {
        return strLastName;
    }

    public void setStrLastName(String strLastName) {
        this.strLastName = strLastName;
    }

    public static TblUserGuardianNFCDTO convertDataToUserGuardianNFCDTO(TblUserNFCDTO t) {
        TblUserGuardianNFCDTO dto = new TblUserGuardianNFCDTO();
        dto.setId(t.getIdGuardianUser());
        dto.setName(t.getGuardianFirstName() + ' ' + t.getGuardianLastName());
        return dto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblUserGuardianNFCDTO that = (TblUserGuardianNFCDTO) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (strFirstName != null ? !strFirstName.equals(that.strFirstName) : that.strFirstName != null) return false;
        return strLastName != null ? strLastName.equals(that.strLastName) : that.strLastName == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (strFirstName != null ? strFirstName.hashCode() : 0);
        result = 31 * result + (strLastName != null ? strLastName.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblUserGuardianNFCDTO{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", strFirstName='" + strFirstName + '\'' +
            ", strLastName='" + strLastName + '\'' +
            '}';
    }
}

