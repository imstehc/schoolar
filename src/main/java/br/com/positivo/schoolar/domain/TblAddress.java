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
 * A TblAddress.
 */
@Entity
@Table(name = "tbl_address", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Where(clause = "int_excluded = 0")
@SQLDelete(sql = "update schoolar.tbl_address set int_excluded = 1, dtm_last_update = now() where id = ?", check = ResultCheckStyle.COUNT)
public class TblAddress implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator" , schema = "schoolar")
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "str_label", length = 200, nullable = false)
    private String strLabel;

    @Size(max = 10)
    @Column(name = "str_post_code", length = 10)
    private String strPostCode;

    @NotNull
    @Size(max = 200)
    @Column(name = "str_street", length = 200, nullable = false)
    private String strStreet;

    @Size(max = 10)
    @Column(name = "str_number", length = 10)
    private String strNumber;

    @Size(max = 50)
    @Column(name = "str_neighborhood", length = 50)
    private String strNeighborhood;

    @Size(max = 200)
    @Column(name = "str_complement", length = 200)
    private String strComplement;

    @NotNull
    @Size(max = 50)
    @Column(name = "str_city", length = 50, nullable = false)
    private String strCity;

    @NotNull
    @Size(max = 2)
    @Column(name = "str_state", length = 2, nullable = false)
    private String strState;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_country", length = 20, nullable = false)
    private String strCountry;

    @Column(name = "dtm_create", nullable = false)
    @CreationTimestamp
    private Instant dtmCreate;

    @Column(name = "dtm_last_update")
    @CreationTimestamp
    private Instant dtmLastUpdate;

    @Column(name = "int_excluded", length = 1, nullable = false)
    private Integer intExcluded;

    @ManyToMany(mappedBy = "tblAddresses")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TblUser> tblUsers = new HashSet<>();

    @ManyToMany(mappedBy = "tblAddresses")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TblSchoolNetwork> tblSchoolNetworks = new HashSet<>();

    @ManyToMany(mappedBy = "tblAddresses")
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

    public String getStrLabel() {
        return strLabel;
    }

    public TblAddress strLabel(String strLabel) {
        this.strLabel = strLabel;
        return this;
    }

    public void setStrLabel(String strLabel) {
        this.strLabel = strLabel;
    }

    public String getStrPostCode() {
        return strPostCode;
    }

    public TblAddress strPostCode(String strPostCode) {
        this.strPostCode = strPostCode;
        return this;
    }

    public void setStrPostCode(String strPostCode) {
        this.strPostCode = strPostCode;
    }

    public String getStrStreet() {
        return strStreet;
    }

    public TblAddress strStreet(String strStreet) {
        this.strStreet = strStreet;
        return this;
    }

    public void setStrStreet(String strStreet) {
        this.strStreet = strStreet;
    }

    public String getStrNumber() {
        return strNumber;
    }

    public TblAddress strNumber(String strNumber) {
        this.strNumber = strNumber;
        return this;
    }

    public void setStrNumber(String strNumber) {
        this.strNumber = strNumber;
    }

    public String getStrNeighborhood() {
        return strNeighborhood;
    }

    public TblAddress strNeighborhood(String strNeighborhood) {
        this.strNeighborhood = strNeighborhood;
        return this;
    }

    public void setStrNeighborhood(String strNeighborhood) {
        this.strNeighborhood = strNeighborhood;
    }

    public String getStrComplement() {
        return strComplement;
    }

    public TblAddress strComplement(String strComplement) {
        this.strComplement = strComplement;
        return this;
    }

    public void setStrComplement(String strComplement) {
        this.strComplement = strComplement;
    }

    public String getStrCity() {
        return strCity;
    }

    public TblAddress strCity(String strCity) {
        this.strCity = strCity;
        return this;
    }

    public void setStrCity(String strCity) {
        this.strCity = strCity;
    }

    public String getStrState() {
        return strState;
    }

    public TblAddress strState(String strState) {
        this.strState = strState;
        return this;
    }

    public void setStrState(String strState) {
        this.strState = strState;
    }

    public String getStrCountry() {
        return strCountry;
    }

    public TblAddress strCountry(String strCountry) {
        this.strCountry = strCountry;
        return this;
    }

    public void setStrCountry(String strCountry) {
        this.strCountry = strCountry;
    }

    public Instant getDtmCreate() {
        return dtmCreate;
    }

    public TblAddress dtmCreate(Instant dtmCreate) {
        this.dtmCreate = dtmCreate;
        return this;
    }

    public void setDtmCreate(Instant dtmCreate) {
        this.dtmCreate = dtmCreate;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblAddress dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblAddress intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public Set<TblUser> getTblUsers() {
        return tblUsers;
    }

    public TblAddress tblUsers(Set<TblUser> tblUsers) {
        this.tblUsers = tblUsers;
        return this;
    }

    public TblAddress addTblUser(TblUser tblUser) {
        this.tblUsers.add(tblUser);
        tblUser.getTblAddresses().add(this);
        return this;
    }

    public TblAddress removeTblUser(TblUser tblUser) {
        this.tblUsers.remove(tblUser);
        tblUser.getTblAddresses().remove(this);
        return this;
    }

    public void setTblUsers(Set<TblUser> tblUsers) {
        this.tblUsers = tblUsers;
    }

    public Set<TblSchoolNetwork> getTblSchoolNetworks() {
        return tblSchoolNetworks;
    }

    public TblAddress tblSchoolNetworks(Set<TblSchoolNetwork> tblSchoolNetworks) {
        this.tblSchoolNetworks = tblSchoolNetworks;
        return this;
    }

    public TblAddress addTblSchoolNetwork(TblSchoolNetwork tblSchoolNetwork) {
        this.tblSchoolNetworks.add(tblSchoolNetwork);
        tblSchoolNetwork.getTblAddresses().add(this);
        return this;
    }

    public TblAddress removeTblSchoolNetwork(TblSchoolNetwork tblSchoolNetwork) {
        this.tblSchoolNetworks.remove(tblSchoolNetwork);
        tblSchoolNetwork.getTblAddresses().remove(this);
        return this;
    }

    public void setTblSchoolNetworks(Set<TblSchoolNetwork> tblSchoolNetworks) {
        this.tblSchoolNetworks = tblSchoolNetworks;
    }

    public Set<TblSchool> getTblSchools() {
        return tblSchools;
    }

    public TblAddress tblSchools(Set<TblSchool> tblSchools) {
        this.tblSchools = tblSchools;
        return this;
    }

    public TblAddress addTblSchool(TblSchool tblSchool) {
        this.tblSchools.add(tblSchool);
        tblSchool.getTblAddresses().add(this);
        return this;
    }

    public TblAddress removeTblSchool(TblSchool tblSchool) {
        this.tblSchools.remove(tblSchool);
        tblSchool.getTblAddresses().remove(this);
        return this;
    }

    public void setTblSchools(Set<TblSchool> tblSchools) {
        this.tblSchools = tblSchools;
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
        TblAddress tblAddress = (TblAddress) o;
        if (tblAddress.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblAddress.getId());
    }

    @PrePersist
    private void prePersist() {
        this.intExcluded = (this.intExcluded == null ? 0 : this.intExcluded);
        this.strLabel = (this.strLabel == null ? " " : this.strLabel);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblAddress{" +
            "id=" + getId() +
            ", strLabel='" + getStrLabel() + "'" +
            ", strPostCode='" + getStrPostCode() + "'" +
            ", strStreet='" + getStrStreet() + "'" +
            ", strNumber='" + getStrNumber() + "'" +
            ", strNeighborhood='" + getStrNeighborhood() + "'" +
            ", strComplement='" + getStrComplement() + "'" +
            ", strCity='" + getStrCity() + "'" +
            ", strState='" + getStrState() + "'" +
            ", strCountry='" + getStrCountry() + "'" +
            ", dtmCreate='" + getDtmCreate() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            "}";
    }
}
