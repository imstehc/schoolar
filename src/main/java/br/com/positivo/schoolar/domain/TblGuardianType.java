package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblGuardianType.
 */
@Entity
@Table(name = "tbl_guardian_type", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblGuardianType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Size(max = 20)
    @Column(name = "str_name", length = 20)
    private String strName;

    @Size(max = 200)
    @Column(name = "str_description", length = 200)
    private String strDescription;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

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

    public TblGuardianType strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public String getStrDescription() {
        return strDescription;
    }

    public TblGuardianType strDescription(String strDescription) {
        this.strDescription = strDescription;
        return this;
    }

    public void setStrDescription(String strDescription) {
        this.strDescription = strDescription;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblGuardianType dtmLastUpdate(Instant dtmLastUpdate) {
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
        TblGuardianType tblGuardianType = (TblGuardianType) o;
        if (tblGuardianType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblGuardianType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblGuardianType{" +
            "id=" + getId() +
            ", strName='" + getStrName() + "'" +
            ", strDescription='" + getStrDescription() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
