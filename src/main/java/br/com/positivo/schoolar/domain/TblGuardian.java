package br.com.positivo.schoolar.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblGuardian.
 */
@Entity
@Table(name = "tbl_guardian", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblGuardian implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Column(name = "dtm_last_update")
    @UpdateTimestamp
    private Instant dtmLastUpdate;

    @ManyToOne
    private TblUser user;

    @ManyToOne
    @JsonIgnore
    private TblUser guardianUser;

    @ManyToOne
    private TblGuardianType guardianType;

    public void setId(Long Id) {
        this.id = Id;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblGuardian dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public TblUser getUser() {
        return user;
    }

    public TblGuardian user(TblUser tblUser) {
        this.user = tblUser;
        return this;
    }

    public void setUser(TblUser tblUser) {
        this.user = tblUser;
    }

    public TblUser getGuardianUser() {
        return guardianUser;
    }

    public TblGuardian guardianUser(TblUser tblUser) {
        this.guardianUser = tblUser;
        return this;
    }

    public void setGuardianUser(TblUser tblUser) {
        this.guardianUser = tblUser;
    }

    public TblGuardianType getGuardianType() {
        return guardianType;
    }

    public TblGuardian guardianType(TblGuardianType tblGuardianType) {
        this.guardianType = tblGuardianType;
        return this;
    }

    public void setGuardianType(TblGuardianType tblGuardianType) {
        this.guardianType = tblGuardianType;
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
        TblGuardian tblGuardian = (TblGuardian) o;
        if (tblGuardian.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblGuardian.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblGuardian{" +
            "id=" + getId() +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
