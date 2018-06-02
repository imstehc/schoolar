package br.com.positivo.schoolar.service.dto;

import java.io.Serializable;

/**
 * Created by frecarva on 2/6/2018.
 */
public class TblNfcDTO implements Serializable {

    private static final Long serialVersionUID = 1L;

    private Long id;

    private String strName;

    private String userStrFirstName;

    private String userStrLastName;

    private String userStrEmail;

    private Long userID;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrName() {
        return strName;
    }

    public void setStrName(String strName) {
        this.strName = strName;
    }

    public String getUserStrFirstName() {
        return userStrFirstName;
    }

    public void setUserStrFirstName(String userStrFirstName) {
        this.userStrFirstName = userStrFirstName;
    }

    public String getUserStrLastName() {
        return userStrLastName;
    }

    public void setUserStrLastName(String userStrLastName) {
        this.userStrLastName = userStrLastName;
    }

    public String getUserStrEmail() {
        return userStrEmail;
    }

    public void setUserStrEmail(String userStrEmail) {
        this.userStrEmail = userStrEmail;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblNfcDTO tblNfcDTO = (TblNfcDTO) o;

        if (id != null ? !id.equals(tblNfcDTO.id) : tblNfcDTO.id != null) return false;
        if (strName != null ? !strName.equals(tblNfcDTO.strName) : tblNfcDTO.strName != null) return false;
        if (userStrFirstName != null ? !userStrFirstName.equals(tblNfcDTO.userStrFirstName) : tblNfcDTO.userStrFirstName != null)
            return false;
        if (userStrLastName != null ? !userStrLastName.equals(tblNfcDTO.userStrLastName) : tblNfcDTO.userStrLastName != null)
            return false;
        return userStrEmail != null ? userStrEmail.equals(tblNfcDTO.userStrEmail) : tblNfcDTO.userStrEmail == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (strName != null ? strName.hashCode() : 0);
        result = 31 * result + (userStrFirstName != null ? userStrFirstName.hashCode() : 0);
        result = 31 * result + (userStrLastName != null ? userStrLastName.hashCode() : 0);
        result = 31 * result + (userStrEmail != null ? userStrEmail.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblNfcDTO{" +
            "id=" + id +
            ", strName='" + strName + '\'' +
            ", userStrFirstName='" + userStrFirstName + '\'' +
            ", userStrLastName='" + userStrLastName + '\'' +
            ", userStrEmail='" + userStrEmail + '\'' +
            '}';
    }
}
