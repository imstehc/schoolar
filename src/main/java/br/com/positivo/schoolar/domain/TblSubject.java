package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblSubject.
 */
@Entity
@Table(name = "tbl_subject", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblSubject implements Serializable {

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

    @Column(name = "str_label")
    private String strLabel;

    @Column(name = "dtm_created")
    private Instant dtmCreated;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @Column(name = "int_excluded")
    private Integer intExcluded;

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

    public TblSubject strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public String getStrAbbreviation() {
        return strAbbreviation;
    }

    public TblSubject strAbbreviation(String strAbbreviation) {
        this.strAbbreviation = strAbbreviation;
        return this;
    }

    public void setStrAbbreviation(String strAbbreviation) {
        this.strAbbreviation = strAbbreviation;
    }

    public Integer getIntOrder() {
        return intOrder;
    }

    public TblSubject intOrder(Integer intOrder) {
        this.intOrder = intOrder;
        return this;
    }

    public void setIntOrder(Integer intOrder) {
        this.intOrder = intOrder;
    }

    public String getStrLabel() {
        return strLabel;
    }

    public TblSubject strLabel(String strLabel) {
        this.strLabel = strLabel;
        return this;
    }

    public void setStrLabel(String strLabel) {
        this.strLabel = strLabel;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public TblSubject dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblSubject dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblSubject intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
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
        TblSubject tblSubject = (TblSubject) o;
        if (tblSubject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblSubject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblSubject{" +
            "id=" + getId() +
            ", strName='" + getStrName() + "'" +
            ", strAbbreviation='" + getStrAbbreviation() + "'" +
            ", intOrder=" + getIntOrder() +
            ", strLabel='" + getStrLabel() + "'" +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            "}";
    }
}
