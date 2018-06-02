package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblSchoolNetworkSchool.
 */
@Entity
@Table(name = "tbl_school_network_school", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblSchoolNetworkSchool implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @NotNull
    @Column(name = "dtm_created", nullable = false)
    private Instant dtmCreated;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @NotNull
    @Column(name = "int_excluded", nullable = false)
    private Integer intExcluded;

    @ManyToOne
    private TblSchool school;

    @Null
    @Column(name = "school_id", nullable = true, insertable = false, updatable = false)
    private Long schoolId;

    @ManyToOne
    private TblSchoolNetwork schoolNetwork;

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

    public TblSchoolNetworkSchool dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblSchoolNetworkSchool dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblSchoolNetworkSchool intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public Long getSchoolId() {
        return schoolId;
    }

    public TblSchool getSchool() {
        return school;
    }

    public TblSchoolNetworkSchool school(TblSchool tblSchool) {
        this.school = tblSchool;
        return this;
    }

    public void setSchool(TblSchool tblSchool) {
        this.school = tblSchool;
    }

    public TblSchoolNetwork getSchoolNetwork() {
        return schoolNetwork;
    }

    public TblSchoolNetworkSchool schoolNetwork(TblSchoolNetwork tblSchoolNetwork) {
        this.schoolNetwork = tblSchoolNetwork;
        return this;
    }

    public void setSchoolNetwork(TblSchoolNetwork tblSchoolNetwork) {
        this.schoolNetwork = tblSchoolNetwork;
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
        TblSchoolNetworkSchool tblSchoolNetworkSchool = (TblSchoolNetworkSchool) o;
        if (tblSchoolNetworkSchool.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblSchoolNetworkSchool.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblSchoolNetworkSchool{" +
            "id=" + getId() +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            ", schoolId=" + getSchoolId() +
            "}";
    }
}
