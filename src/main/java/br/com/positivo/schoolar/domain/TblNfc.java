package br.com.positivo.schoolar.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblNfc.
 */
@Entity
@Table(name = "tbl_nfc", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblNfc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @NotNull
    @Column(name = "str_name", nullable = false)
    private String strName;

    @Column(name = "dtm_last_update")
    @UpdateTimestamp
    private Instant dtmLastUpdate;

    @ManyToOne
    @JsonIgnore
    private TblUser user;

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

    public TblNfc strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblNfc dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public TblUser getUser() {
        return user;
    }

    public TblNfc user(TblUser tblUser) {
        this.user = tblUser;
        return this;
    }

    public void setUser(TblUser tblUser) {
        this.user = tblUser;
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
        TblNfc tblNfc = (TblNfc) o;
        if (tblNfc.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblNfc.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblNfc{" +
            "id=" + getId() +
            ", strName='" + getStrName() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
