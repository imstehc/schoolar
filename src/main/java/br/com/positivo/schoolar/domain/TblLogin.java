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
 * A TblLogin.
 */
@Entity
@Table(name = "tbl_login", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblLogin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_user_name", length = 20, nullable = false)
    private String strUserName;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_password", length = 20, nullable = false)
    private String strPassword;

    @UpdateTimestamp
    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @JsonIgnore
    @ManyToOne
    private TblUser user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrUserName() {
        return strUserName;
    }

    public TblLogin strUserName(String strUserName) {
        this.strUserName = strUserName;
        return this;
    }

    public void setStrUserName(String strUserName) {
        this.strUserName = strUserName;
    }

    public String getStrPassword() {
        return strPassword;
    }

    public TblLogin strPassword(String strPassword) {
        this.strPassword = strPassword;
        return this;
    }

    public void setStrPassword(String strPassword) {
        this.strPassword = strPassword;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblLogin dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public TblUser getUser() {
        return user;
    }

    public TblLogin user(TblUser tblUser) {
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
        TblLogin tblLogin = (TblLogin) o;
        if (tblLogin.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblLogin.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblLogin{" +
            "id=" + getId() +
            ", strUserName='" + getStrUserName() + "'" +
            ", strPassword='" + getStrPassword() + "'" +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
