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
import java.util.Objects;

/**
 * A TblSchoolUserRole.
 */
@Entity
@Table(name = "tbl_school_user_role", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Where(clause = "int_excluded = 0")
@SQLDelete(sql = "UPDATE schoolar.tbl_school_user_role SET int_excluded = 1 WHERE id = ?", check = ResultCheckStyle.COUNT)
public class TblSchoolUserRole implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @CreationTimestamp
    @Column(name = "dtm_created", nullable = false)
    private Instant dtmCreated;

    @UpdateTimestamp
    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @Column(name = "int_excluded", length = 1, nullable = false, columnDefinition = "integer(1) default 0")
    private Integer intExcluded;

    @ManyToOne
    private TblRole role;

    @ManyToOne
    private TblSchool school;

    @ManyToOne
    @JsonIgnore
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

    public TblSchoolUserRole dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblSchoolUserRole dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblSchoolUserRole intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public TblRole getRole() {
        return role;
    }

    public TblSchoolUserRole role(TblRole tblRole) {
        this.role = tblRole;
        return this;
    }

    public void setRole(TblRole tblRole) {
        this.role = tblRole;
    }

    public TblSchool getSchool() {
        return school;
    }

    public TblSchoolUserRole school(TblSchool tblSchool) {
        this.school = tblSchool;
        return this;
    }

    public void setSchool(TblSchool tblSchool) {
        this.school = tblSchool;
    }

    public TblUser getUser() {
        return user;
    }

    public TblSchoolUserRole user(TblUser tblUser) {
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
        TblSchoolUserRole tblSchoolUserRole = (TblSchoolUserRole) o;
        if (tblSchoolUserRole.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblSchoolUserRole.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblSchoolUserRole{" +
            "id=" + getId() +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            "}";
    }
}
