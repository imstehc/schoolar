package br.com.positivo.schoolar.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by fsupi on 01/02/18.
 */
public class TblUserNFCDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    @Size(max = 20)
    private String photoPath;

    @Size(max = 20)
    private String name;

    @Size(max = 20)
    @JsonIgnore
    private String firstName;

    @Size(max = 20)
    @JsonIgnore
    private String lastName;

    @Size(max = 20)
    private String nfcId;

    @JsonIgnore
    private Long schoolId;

    @JsonIgnore
    private String schoolName;

    @JsonIgnore
    private String schoolPhoto;

    @JsonIgnore
    private Long idGuardian;

    @JsonIgnore
    private Long idGuardianUser;

    @JsonIgnore
    private String guardianFirstName;

    @JsonIgnore
    private String guardianLastName;

    private Set<TblSchoolNFCDTO> schoolList = new HashSet<>();

    private Set<TblUserGuardianNFCDTO> guardianList = new HashSet<>();

    @JsonIgnore
    private Set<TblNfcDTO> nfcs = new HashSet<>();

    public TblUserNFCDTO() {}

    public TblUserNFCDTO(Long id,
                         String photoPath,
                         String firstName,
                         String lastName,
                         Long schoolId,
                         String schoolName,
                         String schoolPhoto,
                         String nfcId) {
                         this.id = id;
                         this.photoPath = photoPath;
                         this.firstName = firstName;
                         this.lastName = lastName;
                         this.schoolId = schoolId;
                         this.schoolName = schoolName;
                         this.schoolPhoto = schoolPhoto;
                         this.nfcId = nfcId;
    }

    public TblUserNFCDTO(Long id,
                         String photoPath,
                         String firstName,
                         String lastName,
                         String nfcId,
                         Long idGuardian,
                         Long idGuardianUser,
                         String guardianFirstName,
                         String guardianLastName,
                         Long schoolId,
                         String schoolName,
                         String schoolPhoto) {
                         this.id = id;
                         this.photoPath = photoPath;
                         this.firstName = firstName;
                         this.lastName = lastName;
                         this.nfcId = nfcId;
                         this.idGuardian = idGuardian;
                         this.idGuardianUser = idGuardianUser;
                         this.guardianFirstName = guardianFirstName;
                         this.guardianLastName = guardianLastName;
                         this.schoolId = schoolId;
                         this.schoolName = schoolName;
                         this.schoolPhoto = schoolPhoto;
    }

    public TblUserNFCDTO(Long id,
                         String photoPath,
                         String firstName,
                         String lastName,
                         Long schoolId,
                         String schoolName,
                         String schoolPhoto) {
                        this.id = id;
                        this.photoPath = photoPath;
                        this.firstName = firstName;
                        this.lastName = lastName;
                        this.schoolId = schoolId;
                        this.schoolName = schoolName;
                        this.schoolPhoto = schoolPhoto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public String getName() {
        if (null != getFirstName() && null != getLastName() && !getFirstName().isEmpty() && !getLastName().isEmpty()) {
            this.name = getFirstName() + ' ' + getLastName();
        }
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNfcId() {
        return nfcId;
    }

    public void setNfcId(String nfcId) {
        this.nfcId = nfcId;
    }

    public Long getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getSchoolPhoto() {
        return schoolPhoto;
    }

    public void setSchoolPhoto(String schoolPhoto) {
        this.schoolPhoto = schoolPhoto;
    }

    public Set<TblSchoolNFCDTO> getSchoolList() {
        return schoolList;
    }

    public void setSchoolList(Set<TblSchoolNFCDTO> schoolList) {
        this.schoolList = schoolList;
    }

    public Set<TblUserGuardianNFCDTO> getGuardianList() {
        return guardianList;
    }

    public void setGuardianList(Set<TblUserGuardianNFCDTO> guardianList) {
        this.guardianList = guardianList;
    }

    public Long getIdGuardian() {
        return idGuardian;
    }

    public void setIdGuardian(Long idGuardian) {
        this.idGuardian = idGuardian;
    }

    public String getGuardianFirstName() {
        return guardianFirstName;
    }

    public void setGuardianFirstName(String guardianFirstName) {
        this.guardianFirstName = guardianFirstName;
    }

    public String getGuardianLastName() {
        return guardianLastName;
    }

    public void setGuardianLastName(String guardianLastName) {
        this.guardianLastName = guardianLastName;
    }

    public Long getIdGuardianUser() {
        return idGuardianUser;
    }

    public void setIdGuardianUser(Long idGuardianUser) {
        this.idGuardianUser = idGuardianUser;
    }

    public Set<TblNfcDTO> getNfcs() {
        return nfcs;
    }

    public void setNfcs(Set<TblNfcDTO> nfcs) {
        this.nfcs = nfcs;
    }

    public static TblUserNFCDTO convertUserData(TblUserNFCDTO t) {
        TblUserNFCDTO user = new TblUserNFCDTO();
        user.setId(t.getId());
        user.setName(t.getName());
        user.setPhotoPath(t.getPhotoPath());
        user.setNfcId(t.nfcId);
        return user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblUserNFCDTO that = (TblUserNFCDTO) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (firstName != null ? !firstName.equals(that.firstName) : that.firstName != null) return false;
        if (lastName != null ? !lastName.equals(that.lastName) : that.lastName != null) return false;
        if (nfcId != null ? !nfcId.equals(that.nfcId) : that.nfcId != null) return false;
        if (schoolId != null ? !schoolId.equals(that.schoolId) : that.schoolId != null) return false;
        return idGuardianUser != null ? idGuardianUser.equals(that.idGuardianUser) : that.idGuardianUser == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (firstName != null ? firstName.hashCode() : 0);
        result = 31 * result + (lastName != null ? lastName.hashCode() : 0);
        result = 31 * result + (nfcId != null ? nfcId.hashCode() : 0);
        result = 31 * result + (schoolId != null ? schoolId.hashCode() : 0);
        result = 31 * result + (idGuardianUser != null ? idGuardianUser.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblUserNFCDTO{" +
            "id=" + id +
            ", photoPath='" + photoPath + '\'' +
            ", name='" + name + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", nfcId='" + nfcId + '\'' +
            ", schoolId=" + schoolId +
            ", schoolName='" + schoolName + '\'' +
            ", schoolPhoto='" + schoolPhoto + '\'' +
            '}';
    }
}
