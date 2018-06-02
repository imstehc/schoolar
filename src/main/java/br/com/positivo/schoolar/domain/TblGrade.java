package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblGrade.
 */
@Entity
@Table(name = "tbl_grade", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblGrade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Column(name = "str_name")
    private String strName;

    @Column(name = "int_number")
    private Integer intNumber;

    @Column(name = "dtm_created")
    private Instant dtmCreated;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @Column(name = "int_excluded")
    private Integer intExcluded;

    @Column(name = "str_label")
    private String strLabel;

    @ManyToOne
    private TblLevelType tblLevelType;

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

    public TblGrade strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public Integer getIntNumber() {
        return intNumber;
    }

    public TblGrade intNumber(Integer intNumber) {
        this.intNumber = intNumber;
        return this;
    }

    public void setIntNumber(Integer intNumber) {
        this.intNumber = intNumber;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public TblGrade dtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
        return this;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblGrade dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public TblGrade intExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
        return this;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    public String getStrLabel() {
        return strLabel;
    }

    public TblGrade strLabel(String strLabel) {
        this.strLabel = strLabel;
        return this;
    }

    public void setStrLabel(String strLabel) {
        this.strLabel = strLabel;
    }

    public TblLevelType getTblLevelType() {
        return tblLevelType;
    }

    public TblGrade tblLevelType(TblLevelType tblLevelType) {
        this.tblLevelType = tblLevelType;
        return this;
    }

    public void setTblLevelType(TblLevelType tblLevelType) {
        this.tblLevelType = tblLevelType;
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
        TblGrade tblGrade = (TblGrade) o;
        if (tblGrade.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblGrade.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblGrade{" +
            "id=" + getId() +
            ", strName='" + getStrName() + "'" +
            ", intNumber=" + getIntNumber() +
            ", dtmCreated='" + getDtmCreated() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            ", intExcluded=" + getIntExcluded() +
            ", strLabel='" + getStrLabel() + "'" +
            "}";
    }
}
