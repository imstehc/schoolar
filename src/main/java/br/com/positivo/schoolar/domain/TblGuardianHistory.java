package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblGuardianHistory.
 */
@Entity
@Table(name = "tbl_guardian_history", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblGuardianHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @NotNull
    @Column(name = "dtm_changed", nullable = false)
    private Instant dtmChanged;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @ManyToOne
    private TblUser user;

    @ManyToOne
    private TblUser guardianUser;

    @ManyToOne
    private TblGuardianType guardianType;

    @ManyToOne
    private TblUser userAuthor;

    @ManyToOne
    private TblAudienceClient audienceClient;

    @ManyToOne
    private TblGeneralProcedureType generalProcedureType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDtmChanged() {
        return dtmChanged;
    }

    public TblGuardianHistory dtmChanged(Instant dtmChanged) {
        this.dtmChanged = dtmChanged;
        return this;
    }

    public void setDtmChanged(Instant dtmChanged) {
        this.dtmChanged = dtmChanged;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblGuardianHistory dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public TblUser getUser() {
        return user;
    }

    public TblGuardianHistory user(TblUser tblUser) {
        this.user = tblUser;
        return this;
    }

    public void setUser(TblUser tblUser) {
        this.user = tblUser;
    }

    public TblUser getGuardianUser() {
        return guardianUser;
    }

    public TblGuardianHistory guardianUser(TblUser tblUser) {
        this.guardianUser = tblUser;
        return this;
    }

    public void setGuardianUser(TblUser tblUser) {
        this.guardianUser = tblUser;
    }

    public TblGuardianType getGuardianType() {
        return guardianType;
    }

    public TblGuardianHistory guardianType(TblGuardianType tblGuardianType) {
        this.guardianType = tblGuardianType;
        return this;
    }

    public void setGuardianType(TblGuardianType tblGuardianType) {
        this.guardianType = tblGuardianType;
    }

    public TblUser getUserAuthor() {
        return userAuthor;
    }

    public TblGuardianHistory userAuthor(TblUser tblUser) {
        this.userAuthor = tblUser;
        return this;
    }

    public void setUserAuthor(TblUser tblUser) {
        this.userAuthor = tblUser;
    }

    public TblAudienceClient getAudienceClient() {
        return audienceClient;
    }

    public TblGuardianHistory audienceClient(TblAudienceClient tblAudienceClient) {
        this.audienceClient = tblAudienceClient;
        return this;
    }

    public void setAudienceClient(TblAudienceClient tblAudienceClient) {
        this.audienceClient = tblAudienceClient;
    }

    public TblGeneralProcedureType getGeneralProcedureType() {
        return generalProcedureType;
    }

    public TblGuardianHistory generalProcedureType(TblGeneralProcedureType tblGeneralProcedureType) {
        this.generalProcedureType = tblGeneralProcedureType;
        return this;
    }

    public void setGeneralProcedureType(TblGeneralProcedureType tblGeneralProcedureType) {
        this.generalProcedureType = tblGeneralProcedureType;
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
        TblGuardianHistory tblGuardianHistory = (TblGuardianHistory) o;
        if (tblGuardianHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblGuardianHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblGuardianHistory{" +
            "id=" + getId() +
            ", dtmChanged='" + getDtmChanged() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
