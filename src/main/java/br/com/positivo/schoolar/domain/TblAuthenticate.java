package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblAuthenticate.
 */
@Entity
@Table(name = "tbl_authenticate", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblAuthenticate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Column(name = "dtm_time_stamp")
    private Instant dtmTimeStamp;

    @ManyToOne
    private TblAudienceClient audienceClient;

    @ManyToOne
    private TblUser user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDtmTimeStamp() {
        return dtmTimeStamp;
    }

    public TblAuthenticate dtmTimeStamp(Instant dtmTimeStamp) {
        this.dtmTimeStamp = dtmTimeStamp;
        return this;
    }

    public void setDtmTimeStamp(Instant dtmTimeStamp) {
        this.dtmTimeStamp = dtmTimeStamp;
    }

    public TblAudienceClient getAudienceClient() {
        return audienceClient;
    }

    public TblAuthenticate audienceClient(TblAudienceClient tblAudienceClient) {
        this.audienceClient = tblAudienceClient;
        return this;
    }

    public void setAudienceClient(TblAudienceClient tblAudienceClient) {
        this.audienceClient = tblAudienceClient;
    }

    public TblUser getUser() {
        return user;
    }

    public TblAuthenticate user(TblUser tblUser) {
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
        TblAuthenticate tblAuthenticate = (TblAuthenticate) o;
        if (tblAuthenticate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblAuthenticate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblAuthenticate{" +
            "id=" + getId() +
            ", dtmTimeStamp='" + getDtmTimeStamp() + "'" +
            "}";
    }
}
