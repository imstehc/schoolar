package br.com.positivo.schoolar.service;


import br.com.positivo.schoolar.domain.TblLogin;
import br.com.positivo.schoolar.domain.TblNfc;
import br.com.positivo.schoolar.domain.TblUser;
import br.com.positivo.schoolar.repository.TblLoginRepository;
import br.com.positivo.schoolar.repository.TblNfcRepository;
import br.com.positivo.schoolar.repository.TblUserRepository;
import br.com.positivo.schoolar.service.dto.TblLoginDTO;
import br.com.positivo.schoolar.service.dto.TblNfcDTO;
import br.com.positivo.schoolar.service.dto.UAATokenDTO;
import br.com.positivo.schoolar.service.dto.UserDTO;
import br.com.positivo.schoolar.web.rest.errors.BadRequestAlertException;
import com.google.gson.Gson;
import org.apache.commons.codec.binary.Base64;
import org.apache.http.client.HttpResponseException;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.token.AccessTokenProvider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing UAAService.
 */
@Service
@Transactional
public class UAAService implements Serializable {

    private static final String API_REGISTER = "/api/register";

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private TblUserRepository tblUserRepository;

    @Autowired
    private TblNfcRepository tblNfcRepository;

    @Autowired
    private TblLoginRepository tblLoginRepository;

    @Autowired
    private AccessTokenProvider accessTokenProvider;

    @Autowired
    private OAuth2RestTemplate oAuth2RestTemplate;

    @Value("${security.oauth2.resource.uriBase}")
    private String uriBase;

    private static final long serialVersionUID = 1L;

    private static final int STATUS_CODE_CREATED = 201;

    private final Logger log = LoggerFactory.getLogger(UAAService.class);

    private static final String keyPassword = "p455w0rdNFCSmart";

    private static byte [] encryptPassword = null;

    /**
     * Update basic information (first name, last name, email, language) for the current user.
     *
     * @param idNfc idNfc of TblNFC
     * @param idUser idUser of TblUser
     */

    public ResponseEntity<TblNfcDTO> associateTblNfcWithUser(Long idNfc, Long idUser) throws Exception {

        TblNfc tblNfc = tblNfcRepository.findOne(idNfc);

        TblUser tblUser = tblUserRepository.findOne(idUser);

        if(tblNfc == null || tblUser == null) {
            throw new Exception("Ncf or User is null");
        }

        tblNfc.setUser(tblUser);

        TblNfc savedTblNfc = tblNfcRepository.save(tblNfc);

        return registerUserByNfc(convertTblNfcInTblNfcDTO(savedTblNfc));
    }

    public TblLogin registerNewUser(TblLogin tblLogin) throws HttpResponseException{

        int statusCode = registerNewUserByLogin(tblLogin).getStatusCode().value();
        if(statusCode == STATUS_CODE_CREATED) {
            return null;
        } else {
            throw new HttpResponseException(statusCode, "Login not created");
        }
    }

    public Long deleteTblLogin(Long idDelete) throws Exception{

        UAATokenDTO uaaTokenDTO;

        if(idDelete != null) {
            TblLogin tblLogin = tblLoginRepository.findOne(idDelete);

            if(tblLogin != null && tblLogin.getUser() != null){

                tblLoginRepository.delete(idDelete);

                //Remove User from UAA Service
                deleteUserByLogin(tblLogin.getStrUserName());
            }
        }
        return idDelete;
    }

    private TblNfcDTO convertTblNfcInTblNfcDTO(TblNfc savedTblNfc) {

        TblNfcDTO tblNfcDTO = new TblNfcDTO();

        if(savedTblNfc != null){

            tblNfcDTO.setId(savedTblNfc.getId());
            tblNfcDTO.setStrName(savedTblNfc.getStrName());

            if(savedTblNfc.getUser() != null) {
                tblNfcDTO.setUserStrEmail(savedTblNfc.getUser().getStrEmail());
                tblNfcDTO.setUserStrFirstName(savedTblNfc.getUser().getStrFirstName());
                tblNfcDTO.setUserStrLastName(savedTblNfc.getUser().getStrLastName());
                tblNfcDTO.setUserID(savedTblNfc.getUser().getId());
            }
        }

        return tblNfcDTO;
    }

    private ResponseEntity<TblNfcDTO> registerUserByNfc(TblNfcDTO tblNfcDTO) throws Exception {

        String originalPassword = tblNfcDTO.getStrName();
        String generatedPassword = encrypt(originalPassword);

        //TODO Refactoring this in a unique method
        JSONObject request = new JSONObject();
        request.put("schoolarUserId", tblNfcDTO.getUserID());
        request.put("login", tblNfcDTO.getStrName());
        request.put("password", generatedPassword);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> entity = new HttpEntity<>(request.toString(), headers);

        return restTemplate.postForEntity(uriBase + API_REGISTER, entity, TblNfcDTO.class);
    }

    private UAATokenDTO fetchTokenFromUAA(TblLogin tblLogin){
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

        map.add("grant_type", "password");
        map.add("username", tblLogin.getStrUserName());
        map.add("password", tblLogin.getStrPassword());

        HttpHeaders headers = new HttpHeaders();
        headers.set(headers.AUTHORIZATION, "Basic Wjk1VVNLOSl4cUlURzMkcVdDKjBGMHU6N3JGbDROaTImYW1wO2pweUh1SCV5YHA0YlFWMVE=");
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        ResponseEntity<String> token = restTemplate.postForEntity(uriBase + "/oauth/token", request, String.class);

        Gson g = new Gson();
        UAATokenDTO tokenObject = g.fromJson(token.getBody(), UAATokenDTO.class);

        return tokenObject;
    }

    private ResponseEntity<TblLogin> registerNewUserByLogin(TblLogin tblLogin) {

        JSONObject request = new JSONObject();
        try {
            request.put("login", tblLogin.getStrUserName());
            request.put("password", tblLogin.getStrPassword());
            request.put("schoolarUserId", tblLogin.getUser().getId());
        } catch (JSONException e) {
            log.debug("Problem Json: ", e);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> entity = new HttpEntity<>(request.toString(), headers);

        try {
            log.info("creating loginUAA", tblLogin.getStrUserName());
            return restTemplate.postForEntity(uriBase + API_REGISTER, entity, TblLogin.class);
        } catch (HttpClientErrorException error) {
            if (error.getStatusCode().equals(HttpStatus.CONFLICT)) {
                throw new BadRequestAlertException(tblLogin.getStrUserName(), TblUser.ENTITY_NAME, "LOGIN_EXISTS");
            }
        }
        return restTemplate.postForEntity(uriBase + API_REGISTER, entity, TblLogin.class);
    }

    private void deleteUserByLogin(String loginName) throws Exception {

        HttpHeaders headers = new HttpHeaders();
        headers.set(headers.AUTHORIZATION, "Bearer " + oAuth2RestTemplate.getAccessToken().getValue());

        HttpEntity<Object> entity = new HttpEntity<>(headers);

        restTemplate.exchange(uriBase + "/api/users/" + loginName, HttpMethod.DELETE, entity, String.class);
    }

    private static String encrypt(String password) throws Exception{
        String strData = "";
        SecretKey key = new SecretKeySpec(keyPassword.getBytes(), "AES");
        Cipher pbeCipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] iv = new byte[pbeCipher.getBlockSize()];
        IvParameterSpec ivParams = new IvParameterSpec(iv);
        pbeCipher.init(Cipher.ENCRYPT_MODE, key, ivParams);
        byte[] encrypted = pbeCipher.doFinal(password.getBytes("UTF-8"));
        encryptPassword = encrypted;
        strData = Base64.encodeBase64String(encrypted);
        return strData;
    }

    private static String decrypt(byte [] passwordByte) throws Exception{
        String strData = "";
        SecretKey key = new SecretKeySpec(keyPassword.getBytes(), "AES");
        Cipher pbeCipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] iv = new byte[pbeCipher.getBlockSize()];
        IvParameterSpec ivParams = new IvParameterSpec(iv);
        pbeCipher.init(Cipher.DECRYPT_MODE, key, ivParams);
        byte[] encrypted = pbeCipher.doFinal(passwordByte);
        strData = new String(encrypted);
        return strData;
    }

    public List<TblLoginDTO> getUserLoginsUAA(final Long schoolarUserId) {
        HttpHeaders headers = new HttpHeaders();
        headers.set(headers.AUTHORIZATION, "Bearer " + oAuth2RestTemplate.getAccessToken().getValue());
        HttpEntity<Object> entity = new HttpEntity<>(headers);
        log.debug("contacting UAA endpoint /api/tbl-logins-by-user/schoolaruserid");
        ResponseEntity<List<UserDTO>> userLoginsUAADTO = restTemplate.exchange(uriBase + "/api/tbl-logins-by-user/" + schoolarUserId, HttpMethod.GET, entity, new ParameterizedTypeReference<List<UserDTO>>() {});
        if (userLoginsUAADTO.getStatusCode() != HttpStatus.OK) {
            log.debug("failed to get userLoginsUAA: {}", userLoginsUAADTO.getStatusCodeValue());
            throw new HttpClientErrorException(userLoginsUAADTO.getStatusCode());
        }
        log.info("get userLoginsUAA");
        ResponseEntity.ok(userLoginsUAADTO.getBody());
        List<TblLoginDTO> loginDTOS = new ArrayList<>();
        userLoginsUAADTO.getBody().stream().forEach(r -> loginDTOS.add(TblLoginDTO.convertToTblLoginDTO(r)));
        return loginDTOS;
    }

    /**
     * @param uaaUserId
     * @return a list of all the logins for uaaUserId
     */
    public ResponseEntity<UserDTO> resetPasswordUserId(final Long uaaUserId, String newPassword) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.set(headers.AUTHORIZATION, "Bearer " + oAuth2RestTemplate.getAccessToken().getValue());
        HttpEntity<Object> entity = new HttpEntity<>(headers);
        log.debug("contacting UAA endpoint /api/reset-password-by-user/uaauserid/newpassword");
        ResponseEntity<UserDTO> responseEntity = restTemplate.exchange(uriBase + "/api/reset-password-by-user/" + uaaUserId + "/" + newPassword, HttpMethod.PUT, entity, new ParameterizedTypeReference<UserDTO>() {});

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            log.debug("failed to put resetPasswordUserUAA: {}", responseEntity.getStatusCodeValue());
            throw new HttpClientErrorException(responseEntity.getStatusCode());
        }
        log.info("get resetPasswordUserUAA");

        return ResponseEntity.ok(responseEntity.getBody());
    }
}
