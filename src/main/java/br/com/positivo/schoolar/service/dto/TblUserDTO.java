package br.com.positivo.schoolar.service.dto;

import br.com.positivo.schoolar.domain.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


/**
 * A DTO representing a TblUser
 */
public class TblUserDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    /// user ///
    private Long id;

    @Size(max = 20)
    private String strCPF;

    @Size(max = 200)
    private String strFirstName;

    @Size(max = 200)
    private String strLastName;

    @Size(max = 200)
    private String strNickName;

    private transient Instant dtmBirthday;

    @Size(max = 200)
    private String strEmail;

    @Size(max = 200)
    private String strPhoto;

    @Size(max = 1)
    private String strGender;

    private transient Instant dtmCreated;

    private Integer intExcluded;

    /// school-roleList ///
    private List<TblSchoolCrudUserDTO> tblSchools = new ArrayList<>();

    private List<TblRoleCrudUserDTO> tblRoles = new ArrayList<>();

    private List<TblSchoolUserRoleDTO> tblSchoolUserRole = new ArrayList<>();

    private List<TblSchoolRolesDTO> schoolRoles = new ArrayList<>();

    /// login ///
    private List<TblLoginDTO> logins = new ArrayList<>();

    /// nfc ///
    private List<TblNfcDTO> nfcs = new ArrayList<>();

    /// phones ///
    private Set<TblPhoneDTO> tblPhones = new HashSet<>();

    /// address ///
    private Set<TblAddressDTO> tblAddresses = new HashSet<>();

    /// associated user ///
    private Long guardianId;

    @JsonIgnore
    private TblUser user;

    private TblGuardianTypeDTO tblGuardianType;

    private List<TblUserDTO> tblUsers = new ArrayList<>();

    public static TblUserDTO parseTblUserToTblUserDTO(TblUser u) {
        TblUserDTO userDTO = new TblUserDTO();

        userDTO.setId(u.getId());
        userDTO.setStrCPF(u.getStrCPF());
        userDTO.setStrFirstName(u.getStrFirstName());
        userDTO.setStrLastName(u.getStrLastName());
        userDTO.setStrNickName(u.getStrNickName());
        userDTO.setDtmBirthday(u.getDtmBirthday());
        userDTO.setStrEmail(u.getStrEmail());
        userDTO.setStrPhoto(u.getStrPhoto());
        userDTO.setStrGender(u.getStrGender());

        return userDTO;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrCPF() {
        return strCPF;
    }

    public void setStrCPF(String strCPF) {
        this.strCPF = strCPF;
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

    public String getStrNickName() {
        return strNickName;
    }

    public void setStrNickName(String strNickName) {
        this.strNickName = strNickName;
    }

    public Instant getDtmBirthday() {
        return dtmBirthday;
    }

    public void setDtmBirthday(Instant dtmBirthday) {
        this.dtmBirthday = dtmBirthday;
    }

    public String getStrEmail() {
        return strEmail;
    }

    public void setStrEmail(String strEmail) {
        this.strEmail = strEmail;
    }

    public String getStrPhoto() {
        return strPhoto;
    }

    public void setStrPhoto(String strPhoto) {
        this.strPhoto = strPhoto;
    }

    public String getStrGender() {
        return strGender;
    }

    public void setStrGender(String strGender) {
        this.strGender = strGender;
    }

    public List<TblSchoolCrudUserDTO> getTblSchools() {
        return tblSchools;
    }

    public void setTblSchools(List<TblSchoolCrudUserDTO> tblSchools) {
        this.tblSchools = tblSchools;
    }

    public List<TblRoleCrudUserDTO> getTblRoles() {
        return tblRoles;
    }

    public void setTblRoles(List<TblRoleCrudUserDTO> tblRoles) {
        this.tblRoles = tblRoles;
    }

    public List<TblSchoolUserRoleDTO> getTblSchoolUserRole() {
        return tblSchoolUserRole;
    }

    public void setTblSchoolUserRole(List<TblSchoolUserRoleDTO> tblSchoolUserRole) {
        this.tblSchoolUserRole = tblSchoolUserRole;
    }

    public List<TblLoginDTO> getLogins() {
        return logins;
    }

    public void setLogins(List<TblLoginDTO> logins) {
        this.logins = logins;
    }

    public List<TblNfcDTO> getNfcs() {
        return nfcs;
    }

    public void setNfcs(List<TblNfcDTO> nfcs) {
        this.nfcs = nfcs;
    }

    public Set<TblPhoneDTO> getTblPhones() {
        return tblPhones;
    }

    public void setTblPhones(Set<TblPhoneDTO> tblPhones) {
        this.tblPhones = tblPhones;
    }

    public Set<TblAddressDTO> getTblAddresses() {
        return tblAddresses;
    }

    public void setTblAddresses(Set<TblAddressDTO> tblAddresses) {
        this.tblAddresses = tblAddresses;
    }

    public Long getGuardianId() {
        return guardianId;
    }

    public void setGuardianId(Long guardianId) {
        this.guardianId = guardianId;
    }

    public TblUser getUser() {
        return user;
    }

    public void setUser(TblUser user) {
        this.user = user;
    }

    public TblGuardianTypeDTO getTblGuardianType() {
        return tblGuardianType;
    }

    public void setTblGuardianType(TblGuardianTypeDTO tblGuardianType) {
        this.tblGuardianType = tblGuardianType;
    }

    public List<TblUserDTO> getTblUsers() {
        return tblUsers;
    }

    public void setTblUsers(List<TblUserDTO> tblUsers) {
        this.tblUsers = tblUsers;
    }

    public List<TblSchoolRolesDTO> getSchoolRoles() {
        return schoolRoles;
    }

    public void setSchoolRoles(List<TblSchoolRolesDTO> schoolRoles) {
        this.schoolRoles = schoolRoles;
    }

    public Instant getDtmCreated() {
        return dtmCreated;
    }

    public void setDtmCreated(Instant dtmCreated) {
        this.dtmCreated = dtmCreated;
    }

    public Integer getIntExcluded() {
        return intExcluded;
    }

    public void setIntExcluded(Integer intExcluded) {
        this.intExcluded = intExcluded;
    }

    @JsonIgnore
    public TblUser populateUserData() {

        TblUser tblUser = new TblUser();

        tblUser.setId(this.getId());
        tblUser.setStrCPF(this.getStrCPF());
        tblUser.setStrFirstName(this.getStrFirstName());
        tblUser.setStrLastName(this.getStrLastName());
        tblUser.setStrNickName(this.getStrNickName());
        tblUser.setDtmBirthday(this.getDtmBirthday());
        tblUser.setStrEmail(this.getStrEmail());
        tblUser.setStrPhoto(this.getStrPhoto());
        tblUser.setStrGender(this.getStrGender());
        tblUser.setDtmCreated(this.getDtmCreated());
        tblUser.setIntExcluded(this.getIntExcluded());

        return tblUser;
    }

    @JsonIgnore
    public Set<TblPhone> parsePhones() {
        Set<TblPhone> phones = new HashSet<>();

        this.getTblPhones().stream().forEach(t -> {
            TblPhone phone = new TblPhone();
            phone.setId(t.getId());
            phone.setStrPhoneType(t.getStrPhoneType());
            phone.setStrPrefix(t.getStrPrefix());
            phone.setStrNumber(t.getStrNumber());
            phone.setStrLabel(t.getStrLabel());
            phone.setDtmCreated(t.getDtmCreated());
            phone.setIntExcluded(t.getIntExcluded());

            phones.add(phone);
        });

        return phones;
    }

    @JsonIgnore
    public Set<TblAddress> parseAddress() {
        Set<TblAddress> addresses = new HashSet<>();

        this.getTblAddresses().stream().forEach(t -> {
            TblAddress address = new TblAddress();
            address.setId(t.getId());
            address.setStrLabel(t.getStrLabel());
            address.setStrPostCode(t.getStrPostCode());
            address.setStrStreet(t.getStrStreet());
            address.setStrNumber(t.getStrNumber());
            address.setStrNeighborhood(t.getStrNeighborhood());
            address.setStrComplement(t.getStrComplement());
            address.setStrCity(t.getStrCity());
            address.setStrState(t.getStrState());
            address.setStrCountry(t.getStrCountry());
            address.setDtmCreate(t.getDtmCreate());
            address.setIntExcluded(t.getIntExcluded());

            addresses.add(address);
        });

        return addresses;
    }

    @JsonIgnore
    public void parseGuardian() {

        this.getTblUsers().stream().forEach(t -> {
            if (t.guardianId != null) {
                return;
            }
            TblGuardian tblGuardian = new TblGuardian();
            tblGuardian.setId(t.getGuardianId());

            ///////
            TblUser tblUserDependent = new TblUser();
            tblUserDependent.setId(t.getId());
            tblGuardian.setUser(tblUserDependent);

            ////////
            tblGuardian.setGuardianUser(user);

            ////////
            TblGuardianType guardianType = new TblGuardianType();
            guardianType.setId(t.getTblGuardianType().getId());
            tblGuardian.setGuardianType(guardianType);

            user.addTblGuardian(tblGuardian);
        });
    }

    public Set<TblSchoolUser> parseSchool() {
        Set<TblSchoolUser> schoolsUser = new HashSet<>();

        this.getSchoolRoles().stream().forEach(t -> {
            //TODO verirficar necessida, se hibernate não remove
            //if (t.isChecked()) {
            TblSchoolUser tblSchoolsUser = new TblSchoolUser();
            TblSchool tblSchool = new TblSchool();
            tblSchool.setId(t.getId());
            tblSchoolsUser.setSchool(tblSchool);
            tblSchoolsUser.setUser(getUser());

            schoolsUser.add(tblSchoolsUser);
            //}
        });

        return schoolsUser;
    }

    public Set<TblUserRole> parseRole() {
        Set<TblUserRole> roleUser = new HashSet<>();

        this.getSchoolRoles().stream().forEach(t ->
            t.getRoleList().stream().forEach(r -> {
                if (r.isChecked()) {
                    TblUserRole tblRoleUser = new TblUserRole();
                    TblRole tblRole = new TblRole();
                    tblRole.setId(r.getId());
                    tblRoleUser.setRole(tblRole);
                    tblRoleUser.setUser(getUser());

                    roleUser.add(tblRoleUser);
                }
            })
        );

        return roleUser;
    }

    public Set<TblNfc> parseNFC() {
        Set<TblNfc> nfcList = new HashSet<>();
        this.getNfcs().stream().forEach(t -> {
            if (t.getStrName() != null) {
                TblNfc tblNFC = new TblNfc();
                tblNFC.setId(t.getId());
                tblNFC.setStrName(t.getStrName());
                tblNFC.setUser(getUser());

                nfcList.add(tblNFC);
            }
        });
        return nfcList;
    }

    @JsonIgnore
    public boolean isCPFEmpty() {
        return this.strCPF == null || this.strCPF.isEmpty();
    }

    @JsonIgnore
    public boolean isUserUnderage() {
        return !this.dtmBirthday.isBefore(Instant.now().minus(6574, ChronoUnit.DAYS));
    }

    @JsonIgnore
    public boolean isEmailEmpty() {
        return this.strEmail == null || this.strEmail.isEmpty();
    }

    public TblUser toTblUser() {

        this.setUser(populateUserData());
        this.getUser().setTblPhones(parsePhones());
        this.getUser().setTblAddresses(parseAddress());
        this.parseGuardian();
        this.getUser().setTblSchoolUserRole(parseSchoolUserRoles());
        this.getUser().setSchoolUsers(parseSchool());
        this.getUser().setUserRoles(parseRole());
        this.getUser().setNfcs(parseNFC());
        this.getUser().setLogins(parseLogin());

        return this.user;
    }

    private Set<TblSchoolUserRole> parseSchoolUserRoles() {
        Set<TblSchoolUserRole> tblSchoolUserRoles = new HashSet<>();

        this.getSchoolRoles().stream().forEach(s ->
            s.getRoleList().stream().forEach(r -> {

                if (r.isChecked()) {
                    TblSchoolUserRole tblSchoolUserRole = new TblSchoolUserRole();
                    tblSchoolUserRole.setUser(getUser());

                    //roleList
                    TblRole tblRole = new TblRole();
                    tblRole.setId(r.getId());
                    tblSchoolUserRole.setRole(tblRole);

                    //school
                    TblSchool tblSchool = new TblSchool();
                    tblSchool.setId(s.getId());
                    tblSchoolUserRole.setSchool(tblSchool);

                    tblSchoolUserRoles.add(tblSchoolUserRole);
                }
            })
        );

        return tblSchoolUserRoles;
    }

    private Set<TblLogin> parseLogin() {
        Set<TblLogin> login = new HashSet<>();
        this.getLogins().stream().forEach(t -> {
            if (t.getId() != null) {
                return;
            }
            TblLogin tblLogin = new TblLogin();
            tblLogin.setId(t.getId());
            tblLogin.setStrUserName(t.getStrUserName());
            tblLogin.setStrPassword(t.getStrPassword());
            tblLogin.setUser(getUser());

            login.add(tblLogin);
        });
        return login;
    }
}

