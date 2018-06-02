package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblRole.
 */
@Entity
@Table(name = "tbl_role", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblRole implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_name", length = 20, nullable = false)
    private String strName;

    @Size(max = 200)
    @Column(name = "str_description", length = 200)
    private String strDescription;

    @NotNull
    @Column(name = "dtm_created", nullable = false)
    private Instant dtmCreated;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @NotNull
    @Column(name = "int_excluded", nullable = false)
    private Integer intExcluded;

    @NotNull
    @Column(name = "int_can_be_impersonated", nullable = false)
    private Integer intCanBeImpersonated;

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

    public TblRole strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public String getStrDescription() {
        return strDescription;
    }

    public TblRole strDescription(String strDescription) {
        this.strDescription = strDescription;
        return this;
    }

    public void setStrDescription(String strDescription) {
        this.strDescription = strDescription;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public TblRole dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblRole dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblRole intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public Integer getIntCanBeImpersonated() {
        return intCanBeImpersonated;
    }

    public TblRole intCanBeImpersonated(Integer intCanBeImpersonated) {
        this.intCanBeImpersonated = intCanBeImpersonated;
        return this;
    }

    public void setIntCanBeImpersonated(Integer intCanBeImpersonated) {
        this.intCanBeImpersonated = intCanBeImpersonated;
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
        TblRole tblRole = (TblRole) o;
        if (tblRole.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblRole.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblRole{" +
            "id=" + getId() +
            ", strName='" + getStrName() + "'" +
            ", strDescription='" + getStrDescription() + "'" +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            ", intCanBeImpersonated=" + getIntCanBeImpersonated() +
            "}";
    }
}
