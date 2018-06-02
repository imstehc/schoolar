package br.com.positivo.schoolar.service.dto;

import java.io.Serializable;

/**
 * Created by frecarva on 03/02/18.
 */

public class TblLoginDTO implements Serializable {

    private static final Long serialVersionUID = 1L;

    private Long id;

    private String strUserName;

    private String strFirstName;

    private String strLastName;

    private String userStrEmail;

    private String strPassword;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrUserName() {
        return strUserName;
    }

    public void setStrUserName(String strUserName) {
        this.strUserName = strUserName;
    }

    public String getStrFirstName() {
        return strFirstName;
    }

    public void setStrFirstName(String strFirstName) {
        this.strFirstName = strFirstName;
    }

    public String getStrLastName() {
        return strLastName;
    }

    public void setStrLastName(String strLastName) {
        this.strLastName = strLastName;
    }

    public String getUserStrEmail() {
        return userStrEmail;
    }

    public void setUserStrEmail(String userStrEmail) {
        this.userStrEmail = userStrEmail;
    }

    public String getStrPassword() {
        return strPassword;
    }

    public void setStrPassword(String strPassword) {
        this.strPassword = strPassword;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblLoginDTO that = (TblLoginDTO) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (strUserName != null ? !strUserName.equals(that.strUserName) : that.strUserName != null) return false;
        if (strFirstName != null ? !strFirstName.equals(that.strFirstName) : that.strFirstName != null) return false;
        if (strLastName != null ? !strLastName.equals(that.strLastName) : that.strLastName != null) return false;
        if (userStrEmail != null ? !userStrEmail.equals(that.userStrEmail) : that.userStrEmail != null) return false;
        return strPassword != null ? strPassword.equals(that.strPassword) : that.strPassword == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (strUserName != null ? strUserName.hashCode() : 0);
        result = 31 * result + (strFirstName != null ? strFirstName.hashCode() : 0);
        result = 31 * result + (strLastName != null ? strLastName.hashCode() : 0);
        result = 31 * result + (userStrEmail != null ? userStrEmail.hashCode() : 0);
        result = 31 * result + (strPassword != null ? strPassword.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblLoginDTO{" +
            "id=" + id +
            ", strUserName='" + strUserName + '\'' +
            ", strFirstName='" + strFirstName + '\'' +
            ", strLastName='" + strLastName + '\'' +
            ", userStrEmail='" + userStrEmail + '\'' +
            '}';
    }

    public static TblLoginDTO convertToTblLoginDTO(UserDTO u) {
        TblLoginDTO tblLoginDTO = new TblLoginDTO();
        tblLoginDTO.setId(u.getId());
        tblLoginDTO.setStrUserName(u.getLogin());
        tblLoginDTO.setStrFirstName(u.getFirstName());
        tblLoginDTO.setStrLastName(u.getLastName());
        tblLoginDTO.setUserStrEmail(u.getEmail());
        tblLoginDTO.setStrPassword(u.getFirstName()); //confirmar se a senha é o firstname
        return tblLoginDTO;
    }
}
