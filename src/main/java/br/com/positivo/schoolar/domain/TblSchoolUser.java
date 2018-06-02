package br.com.positivo.schoolar.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblSchoolUser.
 */
@Entity
@Table(name = "tbl_school_user", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblSchoolUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Column(name = "dtm_created", nullable = false)
    @CreationTimestamp
    private Instant dtmCreated;

    @Column(name = "dtm_last_update")
    @UpdateTimestamp
    private Instant dtmLastUpdate;

    @Column(name = "int_excluded", length = 1, nullable = false, columnDefinition = "integer(1) default 0")
    private Integer intExcluded;

    @ManyToOne
    private TblSchool school;

    @JsonIgnore
    @ManyToOne
    private TblUser user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public TblSchoolUser dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblSchoolUser dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblSchoolUser intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public TblSchool getSchool() {
        return school;
    }

    public TblSchoolUser school(TblSchool tblSchool) {
        this.school = tblSchool;
        return this;
    }

    public void setSchool(TblSchool tblSchool) {
        this.school = tblSchool;
    }

    public TblUser getUser() {
        return user;
    }

    public TblSchoolUser user(TblUser tblUser) {
        this.user = tblUser;
        return this;
    }

    public void setUser(TblUser tblUser) {
        this.user = tblUser;
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
        TblSchoolUser tblSchoolUser = (TblSchoolUser) o;
        if (tblSchoolUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblSchoolUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblSchoolUser{" +
            "id=" + getId() +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            "}";
    }
}
