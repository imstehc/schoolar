package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TblSchoolNetwork.
 */
@Entity
@Table(name = "tbl_school_network", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblSchoolNetwork implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_code", length = 20, nullable = false)
    private String strCode;

    @NotNull
    @Size(max = 50)
    @Column(name = "str_name", length = 50, nullable = false)
    private String strName;

    @Size(max = 50)
    @Column(name = "str_legal_name", length = 50)
    private String strLegalName;

    @Size(max = 20)
    @Column(name = "str_cnpj", length = 20)
    private String strCNPJ;

    @Size(max = 20)
    @Column(name = "str_email", length = 20)
    private String strEmail;

    @NotNull
    @Column(name = "dtm_created", nullable = false)
    private Instant dtmCreated;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @NotNull
    @Column(name = "int_excluded", nullable = false)
    private Integer intExcluded;

    @ManyToMany(cascade=CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "tbl_school_network_tbl_phone", schema = "schoolar",
               joinColumns = @JoinColumn(name="tbl_school_networks_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tbl_phones_id", referencedColumnName="id"))
    private Set<TblPhone> tblPhones = new HashSet<>();

    @ManyToMany(cascade=CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "tbl_school_network_tbl_address", schema = "schoolar",
               joinColumns = @JoinColumn(name="tbl_school_networks_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tbl_addresses_id", referencedColumnName="id"))
    private Set<TblAddress> tblAddresses = new HashSet<>();

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

    public TblSchoolNetwork strCode(String strCode) {
        this.strCode = strCode;
        return this;
    }

    public void setStrCode(String strCode) {
        this.strCode = strCode;
    }

    public String getStrName() {
        return strName;
    }

    public TblSchoolNetwork strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public String getStrLegalName() {
        return strLegalName;
    }

    public TblSchoolNetwork strLegalName(String strLegalName) {
        this.strLegalName = strLegalName;
        return this;
    }

    public void setStrLegalName(String strLegalName) {
        this.strLegalName = strLegalName;
    }

    public String getStrCNPJ() {
        return strCNPJ;
    }

    public TblSchoolNetwork strCNPJ(String strCNPJ) {
        this.strCNPJ = strCNPJ;
        return this;
    }

    public void setStrCNPJ(String strCNPJ) {
        this.strCNPJ = strCNPJ;
    }

    public String getStrEmail() {
        return strEmail;
    }

    public TblSchoolNetwork strEmail(String strEmail) {
        this.strEmail = strEmail;
        return this;
    }

    public void setStrEmail(String strEmail) {
        this.strEmail = strEmail;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public TblSchoolNetwork dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblSchoolNetwork dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblSchoolNetwork intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public Set<TblPhone> getTblPhones() {
        return tblPhones;
    }

    public TblSchoolNetwork tblPhones(Set<TblPhone> tblPhones) {
        this.tblPhones = tblPhones;
        return this;
    }

    public TblSchoolNetwork addTblPhone(TblPhone tblPhone) {
        this.tblPhones.add(tblPhone);
        tblPhone.getTblSchoolNetworks().add(this);
        return this;
    }

    public TblSchoolNetwork removeTblPhone(TblPhone tblPhone) {
        this.tblPhones.remove(tblPhone);
        tblPhone.getTblSchoolNetworks().remove(this);
        return this;
    }

    public void setTblPhones(Set<TblPhone> tblPhones) {
        this.tblPhones = tblPhones;
    }

    public Set<TblAddress> getTblAddresses() {
        return tblAddresses;
    }

    public TblSchoolNetwork tblAddresses(Set<TblAddress> tblAddresses) {
        this.tblAddresses = tblAddresses;
        return this;
    }

    public TblSchoolNetwork addTblAddress(TblAddress tblAddress) {
        this.tblAddresses.add(tblAddress);
        tblAddress.getTblSchoolNetworks().add(this);
        return this;
    }

    public TblSchoolNetwork removeTblAddress(TblAddress tblAddress) {
        this.tblAddresses.remove(tblAddress);
        tblAddress.getTblSchoolNetworks().remove(this);
        return this;
    }

    public void setTblAddresses(Set<TblAddress> tblAddresses) {
        this.tblAddresses = tblAddresses;
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
        TblSchoolNetwork tblSchoolNetwork = (TblSchoolNetwork) o;
        if (tblSchoolNetwork.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblSchoolNetwork.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblSchoolNetwork{" +
            "id=" + getId() +
            ", strCode='" + getStrCode() + "'" +
            ", strName='" + getStrName() + "'" +
            ", strLegalName='" + getStrLegalName() + "'" +
            ", strCNPJ='" + getStrCNPJ() + "'" +
            ", strEmail='" + getStrEmail() + "'" +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            "}";
    }
}
