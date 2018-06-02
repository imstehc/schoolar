package br.com.positivo.schoolar.service.dto;

import java.io.Serializable;

/**
 * Created by fsupi on 01/02/18.
 */
public class TblSchoolNFCDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String name;

    private String photoLogo;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhotoLogo() {
        return photoLogo;
    }

    public void setPhotoLogo(String photoLogo) {
        this.photoLogo = photoLogo;
    }

    public static TblSchoolNFCDTO createTblSchoolDTO(TblUserNFCDTO r) {
        TblSchoolNFCDTO schoolNFCDTO = new TblSchoolNFCDTO();
        schoolNFCDTO.setId(r.getSchoolId());
        schoolNFCDTO.setName(r.getSchoolName());
        schoolNFCDTO.setPhotoLogo(r.getSchoolPhoto());
        return schoolNFCDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblSchoolNFCDTO that = (TblSchoolNFCDTO) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        return photoLogo != null ? photoLogo.equals(that.photoLogo) : that.photoLogo == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (photoLogo != null ? photoLogo.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblSchoolNFCDTO{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", photoLogo='" + photoLogo + '\'' +
            '}';
    }
}
