package br.com.positivo.schoolar.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.*;
import org.hibernate.annotations.Cache;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TblPhone.
 */
@Entity
@Table(name = "tbl_phone", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Where(clause = "int_excluded = 0")
@SQLDelete(sql = "update schoolar.tbl_phone set int_excluded = 1, dtm_last_update = now() where id = ?", check = ResultCheckStyle.COUNT)
public class TblPhone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Size(max = 3)
    @Column(name = "str_prefix", length = 3)
    private String strPrefix;

    @NotNull
    @Size(max = 10)
    @Column(name = "str_number", length = 10, nullable = false)
    private String strNumber;

    @Size(max = 10)
    @Column(name = "str_phone_type", length = 10)
    private String strPhoneType;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_label", length = 20, nullable = false)
    private String strLabel;

    @Column(name = "dtm_created", nullable = false)
    @CreationTimestamp
    private Instant dtmCreated;

    @Column(name = "dtm_last_update")
    @UpdateTimestamp
    private Instant dtmLastUpdate;

    @Column(name = "int_excluded", length = 1, nullable = false)
    private Integer intExcluded;

    @ManyToMany(mappedBy = "tblPhones")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TblUser> tblUsers = new HashSet<>();

    @ManyToMany(mappedBy = "tblPhones")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TblSchoolNetwork> tblSchoolNetworks = new HashSet<>();

    @ManyToMany(mappedBy = "tblPhones")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TblSchool> tblSchools = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrPrefix() {
        return strPrefix;
    }

    public TblPhone strPrefix(String strPrefix) {
        this.strPrefix = strPrefix;
        return this;
    }

    public void setStrPrefix(String strPrefix) {
        this.strPrefix = strPrefix;
    }

    public String getStrNumber() {
        return strNumber;
    }

    public TblPhone strNumber(String strNumber) {
        this.strNumber = strNumber;
        return this;
    }

    public void setStrNumber(String strNumber) {
        this.strNumber = strNumber;
    }

    public String getStrPhoneType() {
        return strPhoneType;
    }

    public TblPhone strPhoneType(String strPhoneType) {
        this.strPhoneType = strPhoneType;
        return this;
    }

    public void setStrPhoneType(String strPhoneType) {
        this.strPhoneType = strPhoneType;
    }

    public String getStrLabel() {
        return strLabel;
    }

    public TblPhone strLabel(String strLabel) {
        this.strLabel = strLabel;
        return this;
    }

    public void setStrLabel(String strLabel) {
        this.strLabel = strLabel;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public TblPhone dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblPhone dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblPhone intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public Set<TblUser> getTblUsers() {
        return tblUsers;
    }

    public TblPhone tblUsers(Set<TblUser> tblUsers) {
        this.tblUsers = tblUsers;
        return this;
    }

    public TblPhone addTblUser(TblUser tblUser) {
        this.tblUsers.add(tblUser);
        tblUser.getTblPhones().add(this);
        return this;
    }

    public TblPhone removeTblUser(TblUser tblUser) {
        this.tblUsers.remove(tblUser);
        tblUser.getTblPhones().remove(this);
        return this;
    }

    public void setTblUsers(Set<TblUser> tblUsers) {
        this.tblUsers = tblUsers;
    }

    public Set<TblSchoolNetwork> getTblSchoolNetworks() {
        return tblSchoolNetworks;
    }

    public TblPhone tblSchoolNetworks(Set<TblSchoolNetwork> tblSchoolNetworks) {
        this.tblSchoolNetworks = tblSchoolNetworks;
        return this;
    }

    public TblPhone addTblSchoolNetwork(TblSchoolNetwork tblSchoolNetwork) {
        this.tblSchoolNetworks.add(tblSchoolNetwork);
        tblSchoolNetwork.getTblPhones().add(this);
        return this;
    }

    public TblPhone removeTblSchoolNetwork(TblSchoolNetwork tblSchoolNetwork) {
        this.tblSchoolNetworks.remove(tblSchoolNetwork);
        tblSchoolNetwork.getTblPhones().remove(this);
        return this;
    }

    public void setTblSchoolNetworks(Set<TblSchoolNetwork> tblSchoolNetworks) {
        this.tblSchoolNetworks = tblSchoolNetworks;
    }

    public Set<TblSchool> getTblSchools() {
        return tblSchools;
    }

    public TblPhone tblSchools(Set<TblSchool> tblSchools) {
        this.tblSchools = tblSchools;
        return this;
    }

    public TblPhone addTblSchool(TblSchool tblSchool) {
        this.tblSchools.add(tblSchool);
        tblSchool.getTblPhones().add(this);
        return this;
    }

    public TblPhone removeTblSchool(TblSchool tblSchool) {
        this.tblSchools.remove(tblSchool);
        tblSchool.getTblPhones().remove(this);
        return this;
    }

    public void setTblSchools(Set<TblSchool> tblSchools) {
        this.tblSchools = tblSchools;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @PrePersist
    private void prePersist() {
        this.intExcluded = (this.intExcluded == null ? 0 : this.intExcluded);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TblPhone tblPhone = (TblPhone) o;
        if (tblPhone.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblPhone.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblPhone{" +
            "id=" + getId() +
            ", strPrefix='" + getStrPrefix() + "'" +
            ", strNumber='" + getStrNumber() + "'" +
            ", strPhoneType='" + getStrPhoneType() + "'" +
            ", strLabel='" + getStrLabel() + "'" +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            "}";
    }
}
