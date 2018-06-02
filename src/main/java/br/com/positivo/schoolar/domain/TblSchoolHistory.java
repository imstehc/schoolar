package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblSchoolHistory.
 */
@Entity
@Table(name = "tbl_school_history", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblSchoolHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @NotNull
    @Size(max = 10)
    @Column(name = "str_code", length = 10, nullable = false)
    private String strCode;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_name", length = 20, nullable = false)
    private String strName;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_legal_name", length = 20, nullable = false)
    private String strLegalName;

    @Size(max = 20)
    @Column(name = "str_email", length = 20)
    private String strEmail;

    @Size(max = 60)
    @Column(name = "str_photo", length = 60)
    private String strPhoto;

    @Column(name = "id_school_type")
    private Integer idSchoolType;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_cnpj", length = 20, nullable = false)
    private String strCNPJ;

    @Size(max = 20)
    @Column(name = "str_nep", length = 20)
    private String strNEP;

    @Size(max = 20)
    @Column(name = "str_nep_name", length = 20)
    private String strNEPName;

    @NotNull
    @Column(name = "int_excluded", nullable = false)
    private Integer intExcluded;

    @NotNull
    @Column(name = "dtm_changed", nullable = false)
    private Instant dtmChanged;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @ManyToOne
    private TblSchool school;

    @ManyToOne
    private TblUser userAuthor;

    @ManyToOne
    private TblAudienceClient audienceClient;

    @ManyToOne
    private TblGeneralProcedureType generalProcedureType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrCode() {
        return strCode;
    }

    public TblSchoolHistory strCode(String strCode) {
        this.strCode = strCode;
        return this;
    }

    public void setStrCode(String strCode) {
        this.strCode = strCode;
    }

    public String getStrName() {
        return strName;
    }

    public TblSchoolHistory strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public String getStrLegalName() {
        return strLegalName;
    }

    public TblSchoolHistory strLegalName(String strLegalName) {
        this.strLegalName = strLegalName;
        return this;
    }

    public void setStrLegalName(String strLegalName) {
        this.strLegalName = strLegalName;
    }

    public String getStrEmail() {
        return strEmail;
    }

    public TblSchoolHistory strEmail(String strEmail) {
        this.strEmail = strEmail;
        return this;
    }

    public void setStrEmail(String strEmail) {
        this.strEmail = strEmail;
    }

    public String getStrPhoto() {
        return strPhoto;
    }

    public TblSchoolHistory strPhoto(String strPhoto) {
        this.strPhoto = strPhoto;
        return this;
    }

    public void setStrPhoto(String strPhoto) {
        this.strPhoto = strPhoto;
    }

    public Integer getIdSchoolType() {
        return idSchoolType;
    }

    public TblSchoolHistory idSchoolType(Integer idSchoolType) {
        this.idSchoolType = idSchoolType;
        return this;
    }

    public void setIdSchoolType(Integer idSchoolType) {
        this.idSchoolType = idSchoolType;
    }

    public String getStrCNPJ() {
        return strCNPJ;
    }

    public TblSchoolHistory strCNPJ(String strCNPJ) {
        this.strCNPJ = strCNPJ;
        return this;
    }

    public void setStrCNPJ(String strCNPJ) {
        this.strCNPJ = strCNPJ;
    }

    public String getStrNEP() {
        return strNEP;
    }

    public TblSchoolHistory strNEP(String strNEP) {
        this.strNEP = strNEP;
        return this;
    }

    public void setStrNEP(String strNEP) {
        this.strNEP = strNEP;
    }

    public String getStrNEPName() {
        return strNEPName;
    }

    public TblSchoolHistory strNEPName(String strNEPName) {
        this.strNEPName = strNEPName;
        return this;
    }

    public void setStrNEPName(String strNEPName) {
        this.strNEPName = strNEPName;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblSchoolHistory intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public Instant getDtmChanged() {
        return dtmChanged;
    }

    public TblSchoolHistory dtmChanged(Instant dtmChanged) {
        this.dtmChanged = dtmChanged;
        return this;
    }

    public void setDtmChanged(Instant dtmChanged) {
        this.dtmChanged = dtmChanged;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblSchoolHistory dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public TblSchool getSchool() {
        return school;
    }

    public TblSchoolHistory school(TblSchool tblSchool) {
        this.school = tblSchool;
        return this;
    }

    public void setSchool(TblSchool tblSchool) {
        this.school = tblSchool;
    }

    public TblUser getUserAuthor() {
        return userAuthor;
    }

    public TblSchoolHistory userAuthor(TblUser tblUser) {
        this.userAuthor = tblUser;
        return this;
    }

    public void setUserAuthor(TblUser tblUser) {
        this.userAuthor = tblUser;
    }

    public TblAudienceClient getAudienceClient() {
        return audienceClient;
    }

    public TblSchoolHistory audienceClient(TblAudienceClient tblAudienceClient) {
        this.audienceClient = tblAudienceClient;
        return this;
    }

    public void setAudienceClient(TblAudienceClient tblAudienceClient) {
        this.audienceClient = tblAudienceClient;
    }

    public TblGeneralProcedureType getGeneralProcedureType() {
        return generalProcedureType;
    }

    public TblSchoolHistory generalProcedureType(TblGeneralProcedureType tblGeneralProcedureType) {
        this.generalProcedureType = tblGeneralProcedureType;
        return this;
    }

    public void setGeneralProcedureType(TblGeneralProcedureType tblGeneralProcedureType) {
        this.generalProcedureType = tblGeneralProcedureType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TblSchoolHistory tblSchoolHistory = (TblSchoolHistory) o;
        if (tblSchoolHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblSchoolHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblSchoolHistory{" +
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
            ", intExcluded=" + getIntExcluded() +
            ", dtmChanged='" + getDtmChanged() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
