package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblSchoolSubject.
 */
@Entity
@Table(name = "tbl_school_subject", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblSchoolSubject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Column(name = "dtm_created")
    private Instant dtmCreated;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @Column(name = "int_excluded")
    private Integer intExcluded;

    @ManyToOne
    private TblLevelType tblLevelType;

    @ManyToOne
    private TblSubject tblSubject;

    @ManyToOne
    private TblSchool tblSchool;

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

    public TblSchoolSubject dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblSchoolSubject dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdade(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblSchoolSubject intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public TblLevelType getTblLevelType() {
        return tblLevelType;
    }

    public TblSchoolSubject tblLevelType(TblLevelType tblLevelType) {
        this.tblLevelType = tblLevelType;
        return this;
    }

    public void setTblLevelType(TblLevelType tblLevelType) {
        this.tblLevelType = tblLevelType;
    }

    public TblSubject getTblSubject() {
        return tblSubject;
    }

    public TblSchoolSubject tblSubject(TblSubject tblSubject) {
        this.tblSubject = tblSubject;
        return this;
    }

    public void setTblSubject(TblSubject tblSubject) {
        this.tblSubject = tblSubject;
    }

    public TblSchool getTblSchool() {
        return tblSchool;
    }

    public TblSchoolSubject tblSchool(TblSchool tblSchool) {
        this.tblSchool = tblSchool;
        return this;
    }

    public void setTblSchool(TblSchool tblSchool) {
        this.tblSchool = tblSchool;
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
        TblSchoolSubject tblSchoolSubject = (TblSchoolSubject) o;
        if (tblSchoolSubject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblSchoolSubject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblSchoolSubject{" +
            "id=" + getId() +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdade='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            "}";
    }
}
