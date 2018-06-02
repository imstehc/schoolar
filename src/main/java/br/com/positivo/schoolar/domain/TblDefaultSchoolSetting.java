package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblDefaultSchoolSetting.
 */
@Entity
@Table(name = "tbl_default_school_setting", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblDefaultSchoolSetting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Column(name = "int_year")
    private Integer intYear;

    @Column(name = "int_enabled")
    private Integer intEnabled;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIntYear() {
        return intYear;
    }

    public TblDefaultSchoolSetting intYear(Integer intYear) {
        this.intYear = intYear;
        return this;
    }

    public void setIntYear(Integer intYear) {
        this.intYear = intYear;
    }

    public Integer getIntEnabled() {
        return intEnabled;
    }

    public TblDefaultSchoolSetting intEnabled(Integer intEnabled) {
        this.intEnabled = intEnabled;
        return this;
    }

    public void setIntEnabled(Integer intEnabled) {
        this.intEnabled = intEnabled;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblDefaultSchoolSetting dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
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
        TblDefaultSchoolSetting tblDefaultSchoolSetting = (TblDefaultSchoolSetting) o;
        if (tblDefaultSchoolSetting.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblDefaultSchoolSetting.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblDefaultSchoolSetting{" +
            "id=" + getId() +
            ", intYear=" + getIntYear() +
            ", intEnabled=" + getIntEnabled() +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
