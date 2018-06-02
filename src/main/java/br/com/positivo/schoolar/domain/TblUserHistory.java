package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblUserHistory.
 */
@Entity
@Table(name = "tbl_user_history", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblUserHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Size(max = 20)
    @Column(name = "str_cpf", length = 20)
    private String strCPF;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_first_name", length = 20, nullable = false)
    private String strFirstName;

    @Size(max = 20)
    @Column(name = "str_last_name", length = 20)
    private String strLastName;

    @Size(max = 20)
    @Column(name = "str_nick_name", length = 20)
    private String strNickName;

    @Column(name = "dtm_birthday")
    private Instant dtmBirthday;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_user_name", length = 20, nullable = false)
    private String strUserName;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_email", length = 20, nullable = false)
    private String strEmail;

    @NotNull
    @Size(max = 32)
    @Column(name = "str_password", length = 32, nullable = false)
    private String strPassword;

    @Size(max = 20)
    @Column(name = "str_photo", length = 20)
    private String strPhoto;

    @Size(max = 10)
    @Column(name = "str_gender", length = 10)
    private String strGender;

    @NotNull
    @Column(name = "int_excluded", nullable = false)
    private Integer intExcluded;

    @NotNull
    @Column(name = "dtm_changed", nullable = false)
    private Instant dtmChanged;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @ManyToOne
    private TblUser user;

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

    public String getStrCPF() {
        return strCPF;
    }

    public TblUserHistory strCPF(String strCPF) {
        this.strCPF = strCPF;
        return this;
    }

    public void setStrCPF(String strCPF) {
        this.strCPF = strCPF;
    }

    public String getStrFirstName() {
        return strFirstName;
    }

    public TblUserHistory strFirstName(String strFirstName) {
        this.strFirstName = strFirstName;
        return this;
    }

    public void setStrFirstName(String strFirstName) {
        this.strFirstName = strFirstName;
    }

    public String getStrLastName() {
        return strLastName;
    }

    public TblUserHistory strLastName(String strLastName) {
        this.strLastName = strLastName;
        return this;
    }

    public void setStrLastName(String strLastName) {
        this.strLastName = strLastName;
    }

    public String getStrNickName() {
        return strNickName;
    }

    public TblUserHistory strNickName(String strNickName) {
        this.strNickName = strNickName;
        return this;
    }

    public void setStrNickName(String strNickName) {
        this.strNickName = strNickName;
    }

    public Instant getDtmBirthday() {
        return dtmBirthday;
    }

    public TblUserHistory dtmBirthday(Instant dtmBirthday) {
        this.dtmBirthday = dtmBirthday;
        return this;
    }

    public void setDtmBirthday(Instant dtmBirthday) {
        this.dtmBirthday = dtmBirthday;
    }

    public String getStrUserName() {
        return strUserName;
    }

    public TblUserHistory strUserName(String strUserName) {
        this.strUserName = strUserName;
        return this;
    }

    public void setStrUserName(String strUserName) {
        this.strUserName = strUserName;
    }

    public String getStrEmail() {
        return strEmail;
    }

    public TblUserHistory strEmail(String strEmail) {
        this.strEmail = strEmail;
        return this;
    }

    public void setStrEmail(String strEmail) {
        this.strEmail = strEmail;
    }

    public String getStrPassword() {
        return strPassword;
    }

    public TblUserHistory strPassword(String strPassword) {
        this.strPassword = strPassword;
        return this;
    }

    public void setStrPassword(String strPassword) {
        this.strPassword = strPassword;
    }

    public String getStrPhoto() {
        return strPhoto;
    }

    public TblUserHistory strPhoto(String strPhoto) {
        this.strPhoto = strPhoto;
        return this;
    }

    public void setStrPhoto(String strPhoto) {
        this.strPhoto = strPhoto;
    }

    public String getStrGender() {
        return strGender;
    }

    public TblUserHistory strGender(String strGender) {
        this.strGender = strGender;
        return this;
    }

    public void setStrGender(String strGender) {
        this.strGender = strGender;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblUserHistory intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public Instant getDtmChanged() {
        return dtmChanged;
    }

    public TblUserHistory dtmChanged(Instant dtmChanged) {
        this.dtmChanged = dtmChanged;
        return this;
    }

    public void setDtmChanged(Instant dtmChanged) {
        this.dtmChanged = dtmChanged;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblUserHistory dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public TblUser getUser() {
        return user;
    }

    public TblUserHistory user(TblUser tblUser) {
        this.user = tblUser;
        return this;
    }

    public void setUser(TblUser tblUser) {
        this.user = tblUser;
    }

    public TblUser getUserAuthor() {
        return userAuthor;
    }

    public TblUserHistory userAuthor(TblUser tblUser) {
        this.userAuthor = tblUser;
        return this;
    }

    public void setUserAuthor(TblUser tblUser) {
        this.userAuthor = tblUser;
    }

    public TblAudienceClient getAudienceClient() {
        return audienceClient;
    }

    public TblUserHistory audienceClient(TblAudienceClient tblAudienceClient) {
        this.audienceClient = tblAudienceClient;
        return this;
    }

    public void setAudienceClient(TblAudienceClient tblAudienceClient) {
        this.audienceClient = tblAudienceClient;
    }

    public TblGeneralProcedureType getGeneralProcedureType() {
        return generalProcedureType;
    }

    public TblUserHistory generalProcedureType(TblGeneralProcedureType tblGeneralProcedureType) {
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
        TblUserHistory tblUserHistory = (TblUserHistory) o;
        if (tblUserHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblUserHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblUserHistory{" +
            "id=" + getId() +
            ", strCPF='" + getStrCPF() + "'" +
            ", strFirstName='" + getStrFirstName() + "'" +
            ", strLastName='" + getStrLastName() + "'" +
            ", strNickName='" + getStrNickName() + "'" +
            ", dtmBirthday='" + getDtmBirthday() + "'" +
            ", strUserName='" + getStrUserName() + "'" +
            ", strEmail='" + getStrEmail() + "'" +
            ", strPassword='" + getStrPassword() + "'" +
            ", strPhoto='" + getStrPhoto() + "'" +
            ", strGender='" + getStrGender() + "'" +
            ", intExcluded=" + getIntExcluded() +
            ", dtmChanged='" + getDtmChanged() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
