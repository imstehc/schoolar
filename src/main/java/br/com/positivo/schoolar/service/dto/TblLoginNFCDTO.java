package br.com.positivo.schoolar.service.dto;


import java.io.Serializable;

/**
 * Created by fsupi on 03/02/18.
 */

public class TblLoginNFCDTO implements Serializable {

    private static final Long serialVersionUID = 1L;

    private Long id;

    private String strUserName;

    private TblUserNFCDTO user;

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

    public TblUserNFCDTO getUser() {
        return user;
    }

    public void setUser(TblUserNFCDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblLoginNFCDTO that = (TblLoginNFCDTO) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        return strUserName != null ? strUserName.equals(that.strUserName) : that.strUserName == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (strUserName != null ? strUserName.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblLoginNFCDTO{" +
            "id=" + id +
            ", strUserName='" + strUserName + '\'' +
            '}';
    }
}
