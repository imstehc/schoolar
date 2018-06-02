package br.com.positivo.schoolar.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.time.Instant;
import java.util.*;


/**
 * A DTO representing a TblGuardian
 */
public class TblGuardianDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private TblUserDTO user;

    private TblUserDTO guardianUser;

    private TblGuardianTypeDTO guardianType;

    private Long idGuardianType;

    private String nameGuardianType;

    private String descriptionGuardianType;

    private Instant dtmLastUpdate;

    private String photoPath;

    private String nfcId;

    private String name;

    @JsonIgnore
    private String firstName;

    @JsonIgnore
    private String lastName;

    @JsonIgnore
    private Long idGuardian;

    @JsonIgnore
    private Long idGuardianUser;

    @JsonIgnore
    private String guardianFirstName;

    @JsonIgnore
    private String guardianLastName;

    @JsonIgnore
    private Long schoolId;

    @JsonIgnore
    private String schoolName;

    @JsonIgnore
    private String schoolPhoto;

    private String photoLogo;


    //TODO verificar utilizadade disso
    @Deprecated
    private Set<TblGuardianDTO> schoolList = new HashSet<>();

    //TODO verificar utilizadade disso
    @Deprecated
    private Set<TblGuardianDTO> guardianList = new HashSet<>();

    //TODO verificar utilizadade disso
    @Deprecated
    private Set<TblGuardianTypeDTO> guardianTypeList = new HashSet<>();


    public TblGuardianDTO() {
    }

    public TblGuardianDTO(Long id, TblUserDTO user) {
        this.id = id;
        this.user = user;
    }

    public TblGuardianDTO(Long id,
                          String photoPath,
                          String firstName,
                          String lastName,
                          Long idGuardian,
                          Long idGuardianUser,
                          String guardianFirstName,
                          String guardianLastName,
                          Long idGuardianType,
                          String nameGuardianType,
                          String descriptionGuardianType) {
        this.id = id;
        this.photoPath = photoPath;
        this.firstName = firstName;
        this.lastName = lastName;
        this.idGuardian = idGuardian;
        this.idGuardianUser = idGuardianUser;
        this.guardianFirstName = guardianFirstName;
        this.guardianLastName = guardianLastName;
        this.idGuardianType = idGuardianType;
        this.nameGuardianType = nameGuardianType;
        this.descriptionGuardianType = descriptionGuardianType;
    }

    public TblGuardianDTO(Long id,
                          Instant dtmLastUpdate,
                          Long user,
                          Long guardianUser,
                          Long guardianType
                          ) {

        createGuardianDTO(id, dtmLastUpdate, user, guardianUser, guardianType);
    }

    private void createGuardianDTO(Long id, Instant dtmLastUpdate, Long user, Long guardianUser, Long guardianType) {
        this.id = id;
        this.dtmLastUpdate = dtmLastUpdate;

        TblUserDTO tblUserDTO = new TblUserDTO();
        tblUserDTO.setId(user);

        TblUserDTO tblGuardianUserDTO = new TblUserDTO();
        tblGuardianUserDTO.setId(guardianUser);

        TblGuardianTypeDTO tblGuardianTypeDTO = new TblGuardianTypeDTO();
        tblGuardianTypeDTO.setId(guardianType);

        this.user = tblUserDTO;
        this.guardianUser = tblGuardianUserDTO;
        this.guardianType = tblGuardianTypeDTO;
    }

    public static TblGuardianDTO convertUserData(TblGuardianDTO t) {
        TblGuardianDTO user = new TblGuardianDTO();
        TblUserDTO tblUserDTO = new TblUserDTO();
        user.setId(t.getId());

        user.setName(t.getName());
        user.setPhotoPath(t.getPhotoPath());
        user.setNfcId(t.nfcId);
        user.setIdGuardianType(t.idGuardianType);
        user.setNameGuardianType(t.nameGuardianType);
        user.setDescriptionGuardianType(t.descriptionGuardianType);
        user.setFirstName(t.getFirstName());
        user.setLastName(t.getLastName());
        user.setGuardianFirstName(t.getGuardianFirstName());
        user.setGuardianLastName(t.getGuardianLastName());
        user.setGuardianTypeList(t.getGuardianTypeList());
        user.setDtmLastUpdate(t.getDtmLastUpdate());
        user.setIdGuardian(t.getIdGuardian());

        tblUserDTO.setId(t.getId());
        tblUserDTO.setStrFirstName(t.getFirstName());
        tblUserDTO.setStrLastName(t.getLastName());
        tblUserDTO.setGuardianId(user.idGuardian);

        tblUserDTO.setTblGuardianType(TblGuardianDTO.convertDataToUserGuardianTypeDTO(user));

        user.setUser(tblUserDTO);
        return user;
    }

    public static TblGuardianTypeDTO convertDataToUserGuardianTypeDTO(TblGuardianDTO t) {
        TblGuardianTypeDTO dto = new TblGuardianTypeDTO();

        dto.setId(t.getIdGuardianType());
        dto.setStrName(t.getNameGuardianType());
        dto.setStrDescription(t.getDescriptionGuardianType());

        return dto;
    }

    public static TblGuardianDTO convertDataToUserGuardianNFCDTO(TblGuardianDTO t) {
        TblGuardianDTO dto = new TblGuardianDTO();
        TblUserDTO tblUserDTO = new TblUserDTO();

        dto.setId(t.getIdGuardianUser());
        dto.setName(t.getGuardianFirstName() + ' ' + t.getGuardianLastName());
        dto.setIdGuardianType(t.idGuardianType);
        dto.setNameGuardianType(t.nameGuardianType);
        dto.setDescriptionGuardianType(t.descriptionGuardianType);
        dto.setFirstName(t.getFirstName());
        dto.setLastName(t.getLastName());
        dto.setGuardianFirstName(t.getGuardianFirstName());
        dto.setGuardianLastName(t.getGuardianLastName());
        dto.setIdGuardian(t.getIdGuardian());

        tblUserDTO.setId(t.getId());
        tblUserDTO.setStrFirstName(t.getFirstName());
        tblUserDTO.setStrLastName(t.getLastName());
        tblUserDTO.setGuardianId(t.idGuardian);
        return dto;
    }

    public static TblGuardianDTO createTblSchoolDTO(TblGuardianDTO r) {
        TblGuardianDTO schoolNFCDTO = new TblGuardianDTO();
        schoolNFCDTO.setId(r.getSchoolId());
        schoolNFCDTO.setName(r.getSchoolName());
        schoolNFCDTO.setPhotoLogo(r.getSchoolPhoto());
        schoolNFCDTO.setIdGuardianType(r.idGuardianType);
        schoolNFCDTO.setNameGuardianType(r.nameGuardianType);
        schoolNFCDTO.setDescriptionGuardianType(r.descriptionGuardianType);
        schoolNFCDTO.setFirstName(r.getFirstName());
        schoolNFCDTO.setLastName(r.getLastName());
        schoolNFCDTO.setGuardianFirstName(r.getGuardianFirstName());
        schoolNFCDTO.setGuardianLastName(r.getGuardianLastName());
        return schoolNFCDTO;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TblUserDTO getUser() {
        return user;
    }

    public void setUser(TblUserDTO user) {
        this.user = user;
    }

    public TblUserDTO getGuardianUser() {
        return guardianUser;
    }

    public void setGuardianUser(TblUserDTO guardianUser) {
        this.guardianUser = guardianUser;
    }

    public TblGuardianTypeDTO getGuardianType() {
        return guardianType;
    }

    public void setGuardianType(TblGuardianTypeDTO guardianType) {
        this.guardianType = guardianType;
    }

    public Long getIdGuardianType() {
        return idGuardianType;
    }

    public void setIdGuardianType(Long idGuardianType) {
        this.idGuardianType = idGuardianType;
    }

    public String getNameGuardianType() {
        return nameGuardianType;
    }

    public void setNameGuardianType(String nameGuardianType) {
        this.nameGuardianType = nameGuardianType;
    }

    public String getDescriptionGuardianType() {
        return descriptionGuardianType;
    }

    public void setDescriptionGuardianType(String descriptionGuardianType) {
        this.descriptionGuardianType = descriptionGuardianType;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public String getNfcId() {
        return nfcId;
    }

    public void setNfcId(String nfcId) {
        this.nfcId = nfcId;
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

    public Long getIdGuardian() {
        return idGuardian;
    }

    public void setIdGuardian(Long idGuardian) {
        this.idGuardian = idGuardian;
    }

    public Long getIdGuardianUser() {
        return idGuardianUser;
    }

    public void setIdGuardianUser(Long idGuardianUser) {
        this.idGuardianUser = idGuardianUser;
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

    public String getPhotoLogo() {
        return photoLogo;
    }

    public void setPhotoLogo(String photoLogo) {
        this.photoLogo = photoLogo;
    }

    public Set<TblGuardianDTO> getSchoolList() {
        return schoolList;
    }

    public void setSchoolList(Set<TblGuardianDTO> schoolList) {
        this.schoolList = schoolList;
    }

    public Set<TblGuardianDTO> getGuardianList() {
        return guardianList;
    }

    public Set<TblGuardianTypeDTO> getGuardianTypeList() {
        return guardianTypeList;
    }

    public void setGuardianTypeList(Set<TblGuardianTypeDTO> guardianTypeList) {
        this.guardianTypeList = guardianTypeList;
    }

    public void setGuardianList(Set<TblGuardianDTO> guardianList) {
        this.guardianList = guardianList;
    }

    public Instant getDtmLastUpdate() {
        return dtmLastUpdate;
    }

    public void setDtmLastUpdate(Instant dtmLastUpdate) {
        this.dtmLastUpdate = dtmLastUpdate;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TblGuardianDTO that = (TblGuardianDTO) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (user != null ? !user.equals(that.user) : that.user != null) return false;
        if (guardianUser != null ? !guardianUser.equals(that.guardianUser) : that.guardianUser != null) return false;
        return guardianType != null ? guardianType.equals(that.guardianType) : that.guardianType == null;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (user != null ? user.hashCode() : 0);
        result = 31 * result + (guardianUser != null ? guardianUser.hashCode() : 0);
        result = 31 * result + (guardianType != null ? guardianType.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "TblGuardian{" +
            "id=" + getId() +
            "}";
    }

    public String getName() {
        if (null != getFirstName() && null != getLastName() && !getFirstName().isEmpty() && !getLastName().isEmpty()) {
            this.name = getFirstName() + ' ' + getLastName();
        }
        return name;
    }

}
