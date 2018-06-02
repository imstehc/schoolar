package br.com.positivo.schoolar.security.jwt;

import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.jwt.Jwt;
import org.springframework.security.jwt.JwtHelper;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;

public class TokenDecode {

    public static final Long decodeUser() {

//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        Jwt decode = JwtHelper.decode(((OAuth2AuthenticationDetails) authentication.getDetails()).getTokenValue());
//        LinkedTreeMap claims = (LinkedTreeMap) new Gson().fromJson( decode.getClaims(),  Object.class);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails) authentication.getDetails();
        Jwt decode = JwtHelper.decode(details.getTokenValue());
        LinkedTreeMap claims = (LinkedTreeMap) new Gson().fromJson( decode.getClaims(), Object.class);

        return ((Double)claims.get("schoolar_user_id")).longValue();
    }

}
