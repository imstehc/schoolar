package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.*;
import org.hibernate.annotations.Cache;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TblSchool.
 */
@Entity
@Table(name = "tbl_school", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Where(clause = "int_excluded = 0")
@SQLDelete(sql = "update schoolar.tbl_school set int_excluded = 1, dtm_last_update = now() where id = ?", check = ResultCheckStyle.COUNT)
public class TblSchool implements Serializable {

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
    @Size(max = 200)
    @Column(name = "str_name", length = 200, nullable = false)
    private String strName;

    @NotNull
    @Size(max = 200)
    @Column(name = "str_legal_name", length = 200, nullable = false)
    private String strLegalName;

    @Size(max = 200)
    @Column(name = "str_email", length = 200)
    private String strEmail;

    @Size(max = 200)
    @Column(name = "str_photo", length = 200)
    private String strPhoto;

    @ManyToOne
    @JoinColumn(name = "id_school_type")
    private TblSchoolType schoolType;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_cnpj", length = 20, nullable = false)
    private String strCNPJ;

    @Size(max = 20)
    @Column(name = "str_inep", length = 20)
    private String strINEP;

    @Size(max = 20)
    @Column(name = "str_inep_name", length = 20)
    private String strINEPName;

    @Column(name = "dtm_created", nullable = false)
    @CreationTimestamp
    private Instant dtmCreated;

    @Column(name = "dtm_last_update", nullable = false)
    @UpdateTimestamp
    private Instant dtmLastUpdate;

    @Column(name = "int_excluded", nullable = false)
    private Integer intExcluded;

    @ManyToMany(cascade=CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "tbl_school_tbl_address", schema = "schoolar",
        joinColumns = @JoinColumn(name="tbl_schools_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name="tbl_addresses_id", referencedColumnName="id"))
    @SQLDeleteAll(sql = "update schoolar.tbl_school_tbl_address set dtm_last_update = now() where tbl_schools_id = ? ", check = ResultCheckStyle.COUNT)
    @SQLDelete(sql = "update schoolar.tbl_school_tbl_address set dtm_last_update = now() where tbl_schools_id = ? ", check = ResultCheckStyle.COUNT)
    private Set<TblAddress> tblAddresses = new HashSet<>();

    @ManyToMany(cascade=CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "tbl_school_tbl_phone", schema = "schoolar",
        joinColumns = @JoinColumn(name="tbl_schools_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name="tbl_phones_id", referencedColumnName="id"))
    @SQLDeleteAll(sql = "update schoolar.tbl_school_tbl_address set dtm_last_update = now() where tbl_schools_id = ? ", check = ResultCheckStyle.COUNT)
    @SQLDelete(sql = "update schoolar.tbl_school_tbl_phone set dtm_last_update = now() where tbl_schools_id = ? ", check = ResultCheckStyle.COUNT)
    private Set<TblPhone> tblPhones = new HashSet<>();

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "latitude")
    private Double latitude;

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

    public TblSchool strCode(String strCode) {
        this.strCode = strCode;
        return this;
    }

    public void setStrCode(String strCode) {
        this.strCode = strCode;
    }

    public String getStrName() {
        return strName;
    }

    public TblSchool strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public String getStrLegalName() {
        return strLegalName;
    }

    public TblSchool strLegalName(String strLegalName) {
        this.strLegalName = strLegalName;
        return this;
    }

    public void setStrLegalName(String strLegalName) {
        this.strLegalName = strLegalName;
    }

    public String getStrEmail() {
        return strEmail;
    }

    public TblSchool strEmail(String strEmail) {
        this.strEmail = strEmail;
        return this;
    }

    public void setStrEmail(String strEmail) {
        this.strEmail = strEmail;
    }

    public String getStrPhoto() {
        return strPhoto;
    }

    public TblSchool strPhoto(String strPhoto) {
        this.strPhoto = strPhoto;
        return this;
    }

    public void setStrPhoto(String strPhoto) {
        this.strPhoto = strPhoto;
    }

    public TblSchoolType getSchoolType() {
        return schoolType;
    }

    public TblSchool schoolType(TblSchoolType schoolType) {
        this.schoolType = schoolType;
        return this;
    }

    public void setSchoolType(TblSchoolType schoolType) {
        this.schoolType = schoolType;
    }

    public String getStrCNPJ() {
        return strCNPJ;
    }

    public TblSchool strCNPJ(String strCNPJ) {
        this.strCNPJ = strCNPJ;
        return this;
    }

    public void setStrCNPJ(String strCNPJ) {
        this.strCNPJ = strCNPJ;
    }

    public String getStrINEP() {
        return strINEP;
    }

    public TblSchool strINEP(String strINEP) {
        this.strINEP = strINEP;
        return this;
    }

    public void setStrINEP(String strINEP) {
        this.strINEP = strINEP;
    }

    public String getStrINEPName() {
        return strINEPName;
    }

    public TblSchool strINEPName(String strINEPName) {
        this.strINEPName = strINEPName;
        return this;
    }

    public void setStrINEPName(String strINEPName) {
        this.strINEPName = strINEPName;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public TblSchool dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblSchool dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblSchool intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public Set<TblAddress> getTblAddresses() {
        return tblAddresses;
    }

    public TblSchool tblAddresses(Set<TblAddress> tblAddresses) {
        this.tblAddresses = tblAddresses;
        return this;
    }

    public TblSchool addTblAddress(TblAddress tblAddress) {
        this.tblAddresses.add(tblAddress);
        tblAddress.getTblSchools().add(this);
        return this;
    }

    public TblSchool removeTblAddress(TblAddress tblAddress) {
        this.tblAddresses.remove(tblAddress);
        tblAddress.getTblSchools().remove(this);
        return this;
    }

    public void setTblAddresses(Set<TblAddress> tblAddresses) {
        this.tblAddresses = tblAddresses;
    }

    public Set<TblPhone> getTblPhones() {
        return tblPhones;
    }

    public TblSchool tblPhones(Set<TblPhone> tblPhones) {
        this.tblPhones = tblPhones;
        return this;
    }

    public TblSchool addTblPhone(TblPhone tblPhone) {
        this.tblPhones.add(tblPhone);
        tblPhone.getTblSchools().add(this);
        return this;
    }

    public TblSchool removeTblPhone(TblPhone tblPhone) {
        this.tblPhones.remove(tblPhone);
        tblPhone.getTblSchools().remove(this);
        return this;
    }

    public void setTblPhones(Set<TblPhone> tblPhones) {
        this.tblPhones = tblPhones;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public Double getLongitude() {
        return longitude;
    }

    public TblSchool longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public TblSchool latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TblSchool tblSchool = (TblSchool) o;
        if (tblSchool.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblSchool.getId());
    }

    @PrePersist
    private void prePersist() {
        this.intExcluded = (this.intExcluded == null ? 0 : this.intExcluded);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
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
            ", schoolType=" + getSchoolType() + "'" +
            ", strCNPJ='" + getStrCNPJ() + "'" +
            ", strINEP='" + getStrINEP() + "'" +
            ", strINEPName='" + getStrINEPName() + "'" +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() + "'" +
            ", longitute=" + getLongitude() + "'" +
            ", latitude=" + getLatitude() +
            "}";
    }
}
