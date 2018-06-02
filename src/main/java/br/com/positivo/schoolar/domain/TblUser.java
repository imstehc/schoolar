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
 * A TblUser.
 */
@Entity
@Table(name = "tbl_user", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Where(clause = "int_excluded = 0")
@SQLDelete(sql = "UPDATE schoolar.tbl_user SET int_excluded = 1 WHERE id = ?", check = ResultCheckStyle.COUNT)
public class TblUser implements Serializable {

    private static final long serialVersionUID = 1L;

    public static final String ENTITY_NAME = "TblUser";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Size(max = 20)
    @Column(name = "str_cpf", length = 20)
    private String strCPF;

    @NotNull
    @Size(max = 200)
    @Column(name = "str_first_name", length = 200, nullable = false)
    private String strFirstName;

    @Size(max = 200)
    @Column(name = "str_last_name", length = 200)
    private String strLastName;

    @Size(max = 200)
    @Column(name = "str_nick_name", length = 200)
    private String strNickName;

    @Column(name = "dtm_birthday")
    private Instant dtmBirthday;

    @NotNull
    @Size(max = 200)
    @Column(name = "str_email", length = 200, nullable = false)
    private String strEmail;

    @Size(max = 200)
    @Column(name = "str_photo", length = 200)
    private String strPhoto;

    @Size(max = 1)
    @Column(name = "str_gender", length = 1)
    private String strGender;

    @Column(name = "dtm_created", nullable = false)
    @CreationTimestamp
    private Instant dtmCreated;

    @Column(name = "dtm_last_update", nullable = false)
    @UpdateTimestamp
    private Instant dtmLastUpdate;

    @Column(name = "int_excluded", length = 1, nullable = false, columnDefinition = "integer(1) default 0")
    private Integer intExcluded;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @SQLDeleteAll(sql = "update schoolar.tbl_guardian set dtm_last_update = now() where user_id = ? ", check = ResultCheckStyle.COUNT)
    @SQLDelete(sql = "update schoolar.tbl_guardian set dtm_last_update = now() where user_id = ?", check = ResultCheckStyle.COUNT)
    private Set<TblGuardian> guardians = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<TblLogin> logins = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<TblSchoolUser> schoolUsers  = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<TblUserRole> userRoles  = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private Set<TblNfc> nfcs = new HashSet<>();

    @ManyToMany(cascade=CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "tbl_user_tbl_phone", schema = "schoolar",
               joinColumns = @JoinColumn(name="tbl_users_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tbl_phones_id", referencedColumnName="id"))
    private Set<TblPhone> tblPhones = new HashSet<>();

    @ManyToMany(cascade=CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "tbl_user_tbl_address", schema = "schoolar",
               joinColumns = @JoinColumn(name="tbl_users_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tbl_addresses_id", referencedColumnName="id"))
    private Set<TblAddress> tblAddresses = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<TblSchoolUserRole> tblSchoolUserRole = new HashSet<>();

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

    public TblUser strCPF(String strCPF) {
        this.strCPF = strCPF;
        return this;
    }

    public void setStrCPF(String strCPF) {
        this.strCPF = strCPF;
    }

    public String getStrFirstName() {
        return strFirstName;
    }

    public TblUser strFirstName(String strFirstName) {
        this.strFirstName = strFirstName;
        return this;
    }

    public void setStrFirstName(String strFirstName) {
        this.strFirstName = strFirstName;
    }

    public String getStrLastName() {
        return strLastName;
    }

    public TblUser strLastName(String strLastName) {
        this.strLastName = strLastName;
        return this;
    }

    public void setStrLastName(String strLastName) {
        this.strLastName = strLastName;
    }

    public String getStrNickName() {
        return strNickName;
    }

    public TblUser strNickName(String strNickName) {
        this.strNickName = strNickName;
        return this;
    }

    public void setStrNickName(String strNickName) {
        this.strNickName = strNickName;
    }

    public Instant getDtmBirthday() {
        return dtmBirthday;
    }

    public TblUser dtmBirthday(Instant dtmBirthday) {
        this.dtmBirthday = dtmBirthday;
        return this;
    }

    public void setDtmBirthday(Instant dtmBirthday) {
        this.dtmBirthday = dtmBirthday;
    }

    public String getStrEmail() {
        return strEmail;
    }

    public TblUser strEmail(String strEmail) {
        this.strEmail = strEmail;
        return this;
    }

    public void setStrEmail(String strEmail) {
        this.strEmail = strEmail;
    }

    public String getStrPhoto() {
        return strPhoto;
    }

    public TblUser strPhoto(String strPhoto) {
        this.strPhoto = strPhoto;
        return this;
    }

    public void setStrPhoto(String strPhoto) {
        this.strPhoto = strPhoto;
    }

    public String getStrGender() {
        return strGender;
    }

    public TblUser strGender(String strGender) {
        this.strGender = strGender;
        return this;
    }

    public void setStrGender(String strGender) {
        this.strGender = strGender;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public TblUser dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblUser dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblUser intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public Set<TblPhone> getTblPhones() {
        return tblPhones;
    }

    public TblUser tblPhones(Set<TblPhone> tblPhones) {
        this.tblPhones = tblPhones;
        return this;
    }

    public TblUser addTblPhone(TblPhone tblPhone) {
        this.tblPhones.add(tblPhone);
        tblPhone.getTblUsers().add(this);
        return this;
    }

    public TblUser addTblNFC(TblNfc tblNfc) {
        this.nfcs.add(tblNfc);
        tblNfc.setUser(this);
        return this;
    }

    public TblUser addLogin(TblLogin tblLogin){
        this.logins.add(tblLogin);
        tblLogin.setUser(this);
        return this;
    }

    public TblUser removeTblPhone(TblPhone tblPhone) {
        this.tblPhones.remove(tblPhone);
        tblPhone.getTblUsers().remove(this);
        return this;
    }

    public void setTblPhones(Set<TblPhone> tblPhones) {
        this.tblPhones = tblPhones;
    }

    public Set<TblAddress> getTblAddresses() {
        return tblAddresses;
    }

    public TblUser tblAddresses(Set<TblAddress> tblAddresses) {
        this.tblAddresses = tblAddresses;
        return this;
    }

    public TblUser addTblAddress(TblAddress tblAddress) {
        this.tblAddresses.add(tblAddress);
        tblAddress.getTblUsers().add(this);
        return this;
    }

    public TblUser addTblSchoolUser(TblSchoolUser tblSchoolUser) {
        this.schoolUsers.add(tblSchoolUser);
        tblSchoolUser.setUser(this);
        return this;
    }

    public TblUser removeTblAddress(TblAddress tblAddress) {
        this.tblAddresses.remove(tblAddress);
        tblAddress.getTblUsers().remove(this);
        return this;
    }

    public TblUser addTblGuardian(TblGuardian tblGuardian){
        this.guardians.add(tblGuardian);
        return this;
    }

    public TblUser addTblSchoolUserRole(TblSchoolUserRole tblUserRole){
        this.tblSchoolUserRole.add(tblUserRole);
        tblUserRole.setUser(this);
        return this;
    }


    public void setTblAddresses(Set<TblAddress> tblAddresses) {
        this.tblAddresses = tblAddresses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public Set<TblGuardian> getGuardians() {
        return guardians;
    }

    public void setGuardians(Set<TblGuardian> guardians) {
        this.guardians = guardians;
    }

    public Set<TblLogin> getLogins() {
        return logins;
    }

    public void setLogins(Set<TblLogin> logins) {
        this.logins = logins;
    }

    public Set<TblSchoolUser> getSchoolUsers() {
        return schoolUsers;
    }

    public void setSchoolUsers(Set<TblSchoolUser> schoolUsers) {
        this.schoolUsers = schoolUsers;
    }

    public Set<TblUserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<TblUserRole> userRoles) {
        this.userRoles = userRoles;
    }

    public Set<TblNfc> getNfcs() {
        return nfcs;
    }

    public void setNfcs(Set<TblNfc> nfcs) {
        this.nfcs = nfcs;
    }

    public Set<TblSchoolUserRole> getTblSchoolUserRole(){ return tblSchoolUserRole;}

    public void setTblSchoolUserRole(Set<TblSchoolUserRole> tblSchoolUserRole){ this.tblSchoolUserRole = tblSchoolUserRole;}

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TblUser tblUser = (TblUser) o;
        if (tblUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblUser.getId());
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
        return "TblUser{" +
            "id=" + getId() +
            ", strCPF='" + getStrCPF() + "'" +
            ", strFirstName='" + getStrFirstName() + "'" +
            ", strLastName='" + getStrLastName() + "'" +
            ", strNickName='" + getStrNickName() + "'" +
            ", dtmBirthday='" + getDtmBirthday() + "'" +
            ", strEmail='" + getStrEmail() + "'" +
            ", strPhoto='" + getStrPhoto() + "'" +
            ", strGender='" + getStrGender() + "'" +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            "}";
    }

}
