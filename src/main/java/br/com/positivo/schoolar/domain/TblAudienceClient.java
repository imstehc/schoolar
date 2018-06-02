package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TblAudienceClient.
 */
@Entity
@Table(name = "tbl_audience_client", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblAudienceClient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_base_64_secret", length = 20, nullable = false)
    private String strBase64Secret;

    @Size(max = 20)
    @Column(name = "str_name", length = 20)
    private String strName;

    @NotNull
    @Column(name = "int_days_access_token_expire", nullable = false)
    private Long intDaysAccessTokenExpire;

    @NotNull
    @Column(name = "int_days_refresh_token_expire", nullable = false)
    private Long intDaysRefreshTokenExpire;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrBase64Secret() {
        return strBase64Secret;
    }

    public TblAudienceClient strBase64Secret(String strBase64Secret) {
        this.strBase64Secret = strBase64Secret;
        return this;
    }

    public void setStrBase64Secret(String strBase64Secret) {
        this.strBase64Secret = strBase64Secret;
    }

    public String getStrName() {
        return strName;
    }

    public TblAudienceClient strName(String strName) {
        this.strName = strName;
        return this;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public Long getIntDaysAccessTokenExpire() {
        return intDaysAccessTokenExpire;
    }

    public TblAudienceClient intDaysAccessTokenExpire(Long intDaysAccessTokenExpire) {
        this.intDaysAccessTokenExpire = intDaysAccessTokenExpire;
        return this;
    }

    public void setIntDaysAccessTokenExpire(Long intDaysAccessTokenExpire) {
        this.intDaysAccessTokenExpire = intDaysAccessTokenExpire;
    }

    public Long getIntDaysRefreshTokenExpire() {
        return intDaysRefreshTokenExpire;
    }

    public TblAudienceClient intDaysRefreshTokenExpire(Long intDaysRefreshTokenExpire) {
        this.intDaysRefreshTokenExpire = intDaysRefreshTokenExpire;
        return this;
    }

    public void setIntDaysRefreshTokenExpire(Long intDaysRefreshTokenExpire) {
        this.intDaysRefreshTokenExpire = intDaysRefreshTokenExpire;
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
        TblAudienceClient tblAudienceClient = (TblAudienceClient) o;
        if (tblAudienceClient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblAudienceClient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblAudienceClient{" +
            "id=" + getId() +
            ", strBase64Secret='" + getStrBase64Secret() + "'" +
            ", strName='" + getStrName() + "'" +
            ", intDaysAccessTokenExpire=" + getIntDaysAccessTokenExpire() +
            ", intDaysRefreshTokenExpire=" + getIntDaysRefreshTokenExpire() +
            "}";
    }
}
