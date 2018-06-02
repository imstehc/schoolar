package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblShiftType.
 */
@Entity
@Table(name = "tbl_shift_type", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblShiftType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Column(name = "str_name")
    private String strName;

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

    public TblShiftType strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblShiftType dtmLastUpdate(Instant dtmLastUpdate) {
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
        TblShiftType tblShiftType = (TblShiftType) o;
        if (tblShiftType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblShiftType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblShiftType{" +
            "id=" + getId() +
            ", strName='" + getStrName() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
