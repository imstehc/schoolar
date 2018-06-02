package br.com.positivo.schoolar.service.dto;

import java.io.Serializable;

/**
 * Created by frecarva on 2/8/2018.
 */
public class UAATokenDTO implements Serializable{

    private String access_token;

    private String token_type;

    private String refresh_token;

    private Long expires_id;

    private String scope;

    private Long iat;

    private String jti;

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
    }

    public Long getExpires_id() {
        return expires_id;
    }

    public void setExpires_id(Long expires_id) {
        this.expires_id = expires_id;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public Long getIat() {
        return iat;
    }

    public void setIat(Long iat) {
        this.iat = iat;
    }

    public String getJti() {
        return jti;
    }

    public void setJti(String jti) {
        this.jti = jti;
    }
}
