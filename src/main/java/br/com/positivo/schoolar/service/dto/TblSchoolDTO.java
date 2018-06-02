package br.com.positivo.schoolar.service.dto;


import lombok.Data;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;

/**
 * Created by fsupi on 30/01/18.
 */
@Data
public class TblSchoolDTO implements Serializable {

    private static final long serialVersionUID =1L;

    private Long id;

    @Size(max = 10)
    private String strCode;

    @Size(max = 20)
    private String strName;

    @Size(max = 20)
    private String strLegalName;

    @Size(max = 20)
    private String strEmail;


    @Size(max = 60)
    private String strPhoto;

    private Long idSchoolType;

    @Size(max = 20)
    private String strCNPJ;

    @Size(max = 20)
    private String strNEP;

    @Size(max = 20)
    private String strNEPName;

    private transient Instant dtmCreated;

    private transient Instant dtmLastUpdate;

    private Boolean bolExcluded;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrCode() {
        return strCode;
    }

    public void setStrCode(String strCode) {
        this.strCode = strCode;
    }

    public String getStrName() {
        return strName;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public String getStrLegalName() {
        return strLegalName;
    }

    public void setStrLegalName(String strLegalName) {
        this.strLegalName = strLegalName;
    }

    public String getStrEmail() {
        return strEmail;
    }

    public void setStrEmail(String strEmail) {
        this.strEmail = strEmail;
    }

    public String getStrPhoto() {
        return strPhoto;
    }

    public void setStrPhoto(String strPhoto) {
        this.strPhoto = strPhoto;
    }

    public Long getIdSchoolType() {
        return idSchoolType;
    }

    public void setIdSchoolType(Long idSchoolType) {
        this.idSchoolType = idSchoolType;
    }

    public String getStrCNPJ() {
        return strCNPJ;
    }

    public void setStrCNPJ(String strCNPJ) {
        this.strCNPJ = strCNPJ;
    }

    public String getStrNEP() {
        return strNEP;
    }

    public void setStrNEP(String strNEP) {
        this.strNEP = strNEP;
    }

    public String getStrNEPName() {
        return strNEPName;
    }

    public void setStrNEPName(String strNEPName) {
        this.strNEPName = strNEPName;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Boolean getBolExcluded() {
        return bolExcluded;
    }

    public Boolean isBolExcluded() {
        return bolExcluded;
    }

    public void setBolExcluded(Boolean bolExcluded) {
        this.bolExcluded = bolExcluded;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblSchoolDTO schoolDTO = (TblSchoolDTO) o;

        if (id != null ? !id.equals(schoolDTO.id) : schoolDTO.id != null) return false;
        if (strCode != null ? !strCode.equals(schoolDTO.strCode) : schoolDTO.strCode != null) return false;
        if (strName != null ? !strName.equals(schoolDTO.strName) : schoolDTO.strName != null) return false;
        if (strLegalName != null ? !strLegalName.equals(schoolDTO.strLegalName) : schoolDTO.strLegalName != null)
            return false;
        if (strEmail != null ? !strEmail.equals(schoolDTO.strEmail) : schoolDTO.strEmail != null) return false;
        return strPhoto != null ? strPhoto.equals(schoolDTO.strPhoto) : schoolDTO.strPhoto == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (strCode != null ? strCode.hashCode() : 0);
        result = 31 * result + (strName != null ? strName.hashCode() : 0);
        result = 31 * result + (strLegalName != null ? strLegalName.hashCode() : 0);
        result = 31 * result + (strEmail != null ? strEmail.hashCode() : 0);
        result = 31 * result + (strPhoto != null ? strPhoto.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblSchool{" +
            "id=" + getId() +
            ", strCode='" + getStrCode() + "'" +
            ", strName='" + getStrName() + "'" +
            ", strLegalName='" + getStrLegalName() + "'" +
            ", strEmail='" + getStrEmail() + "'" +
            ", strPhoto='" + getStrPhoto() + "'" +
            ", idSchoolType=" + getIdSchoolType() +
            ", strCNPJ='" + getStrCNPJ() + "'" +
            ", strNEP='" + getStrNEP() + "'" +
            ", strNEPName='" + getStrNEPName() + "'" +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", bolExcluded='" + isBolExcluded() + "'" +
            "}";
    }
}
