package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblClass.
 */
@Entity
@Table(name = "tbl_class", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblClass implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Column(name = "str_name")
    private String strName;

    @Column(name = "int_year")
    private Integer intYear;

    @Column(name = "dtm_created")
    private Instant dtmCreated;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @Column(name = "int_excluded")
    private Integer intExcluded;

    @ManyToOne
    private TblSchool tblSchool;

    @ManyToOne
    private TblShiftType tblShiftType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrName() {
        return strName;
    }

    public TblClass strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public Integer getIntYear() {
        return intYear;
    }

    public TblClass intYear(Integer intYear) {
        this.intYear = intYear;
        return this;
    }

    public void setIntYear(Integer intYear) {
        this.intYear = intYear;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public TblClass dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblClass dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblClass intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public TblSchool getTblSchool() {
        return tblSchool;
    }

    public TblClass tblSchool(TblSchool tblSchool) {
        this.tblSchool = tblSchool;
        return this;
    }

    public void setTblSchool(TblSchool tblSchool) {
        this.tblSchool = tblSchool;
    }

    public TblShiftType getTblShiftType() {
        return tblShiftType;
    }

    public TblClass tblShiftType(TblShiftType tblShiftType) {
        this.tblShiftType = tblShiftType;
        return this;
    }

    public void setTblShiftType(TblShiftType tblShiftType) {
        this.tblShiftType = tblShiftType;
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
        TblClass tblClass = (TblClass) o;
        if (tblClass.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblClass.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblClass{" +
            "id=" + getId() +
            ", strName='" + getStrName() + "'" +
            ", intYear=" + getIntYear() +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            "}";
    }
}
