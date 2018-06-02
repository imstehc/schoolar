package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblLevelType.
 */
@Entity
@Table(name = "tbl_level_type", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblLevelType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Column(name = "str_name")
    private String strName;

    @Column(name = "str_abbreviation")
    private String strAbbreviation;

    @Column(name = "int_order")
    private Integer intOrder;

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

    public TblLevelType strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public String getStrAbbreviation() {
        return strAbbreviation;
    }

    public TblLevelType strAbbreviation(String strAbbreviation) {
        this.strAbbreviation = strAbbreviation;
        return this;
    }

    public void setStrAbbreviation(String strAbbreviation) {
        this.strAbbreviation = strAbbreviation;
    }

    public Integer getIntOrder() {
        return intOrder;
    }

    public TblLevelType intOrder(Integer intOrder) {
        this.intOrder = intOrder;
        return this;
    }

    public void setIntOrder(Integer intOrder) {
        this.intOrder = intOrder;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblLevelType dtmLastUpdate(Instant dtmLastUpdate) {
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
        TblLevelType tblLevelType = (TblLevelType) o;
        if (tblLevelType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblLevelType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblLevelType{" +
            "id=" + getId() +
            ", strName='" + getStrName() + "'" +
            ", strAbbreviation='" + getStrAbbreviation() + "'" +
            ", intOrder=" + getIntOrder() +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
