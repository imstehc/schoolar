package br.com.positivo.schoolar.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A TblClassSubjectTeacher.
 */
@Entity
@Table(name = "tbl_class_subject_teacher", schema = "schoolar")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TblClassSubjectTeacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator", schema = "schoolar")
    private Long id;

    @Column(name = "dtm_last_update")
    private Instant dtmLastUpdate;

    @ManyToOne
    private TblSubject tblSubject;

    @ManyToOne
    private TblUser tblUser;

    @ManyToOne
    private TblClass tblClass;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public TblClassSubjectTeacher dtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
        return this;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }

    public TblSubject getTblSubject() {
        return tblSubject;
    }

    public TblClassSubjectTeacher tblSubject(TblSubject tblSubject) {
        this.tblSubject = tblSubject;
        return this;
    }

    public void setTblSubject(TblSubject tblSubject) {
        this.tblSubject = tblSubject;
    }

    public TblUser getTblUser() {
        return tblUser;
    }

    public TblClassSubjectTeacher tblUser(TblUser tblUser) {
        this.tblUser = tblUser;
        return this;
    }

    public void setTblUser(TblUser tblUser) {
        this.tblUser = tblUser;
    }

    public TblClass getTblClass() {
        return tblClass;
    }

    public TblClassSubjectTeacher tblClass(TblClass tblClass) {
        this.tblClass = tblClass;
        return this;
    }

    public void setTblClass(TblClass tblClass) {
        this.tblClass = tblClass;
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
        TblClassSubjectTeacher tblClassSubjectTeacher = (TblClassSubjectTeacher) o;
        if (tblClassSubjectTeacher.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tblClassSubjectTeacher.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TblClassSubjectTeacher{" +
            "id=" + getId() +
            ", dtmLastUpdate='" + getDtmLastUpdate() + "'" +
            "}";
    }
}
