package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TblAuthentication.
 */
@Entity
@Table(name = "tbl_authentication", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblAuthentication implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @NotNull
    @Column(name = "id_authentication", nullable = false)
    private Long idAuthentication;

    @Size(max = 20)
    @Column(name = "str_cpf", length = 20)
    private String strCPF;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_user_name", length = 20, nullable = false)
    private String strUserName;

    @NotNull
    @Size(max = 20)
    @Column(name = "str_email", length = 20, nullable = false)
    private String strEmail;

    @Size(max = 32)
    @Column(name = "str_password", length = 32)
    private String strPassword;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdAuthentication() {
        return idAuthentication;
    }

    public TblAuthentication idAuthentication(Long idAuthentication) {
        this.idAuthentication = idAuthentication;
        return this;
    }

    public void setIdAuthentication(Long idAuthentication) {
        this.idAuthentication = idAuthentication;
    }

    public String getStrCPF() {
        return strCPF;
    }

    public TblAuthentication strCPF(String strCPF) {
        this.strCPF = strCPF;
        return this;
    }

    public void setStrCPF(String strCPF) {
        this.strCPF = strCPF;
    }

    public String getStrUserName() {
        return strUserName;
    }

    public TblAuthentication strUserName(String strUserName) {
        this.strUserName = strUserName;
        return this;
    }

    public void setStrUserName(String strUserName) {
        this.strUserName = strUserName;
    }

    public String getStrEmail() {
        return strEmail;
    }

    public TblAuthentication strEmail(String strEmail) {
        this.strEmail = strEmail;
        return this;
    }

    public void setStrEmail(String strEmail) {
        this.strEmail = strEmail;
    }

    public String getStrPassword() {
        return strPassword;
    }

    public TblAuthentication strPassword(String strPassword) {
        this.strPassword = strPassword;
        return this;
    }

    public void setStrPassword(String strPassword) {
        this.strPassword = strPassword;
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
        TblAuthentication tblAuthentication = (TblAuthentication) o;
        if (tblAuthentication.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblAuthentication.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblAuthentication{" +
            "id=" + getId() +
            ", idAuthentication=" + getIdAuthentication() +
            ", strCPF='" + getStrCPF() + "'" +
            ", strUserName='" + getStrUserName() + "'" +
            ", strEmail='" + getStrEmail() + "'" +
            ", strPassword='" + getStrPassword() + "'" +
            "}";
    }
}
