package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.domain.User;
import br.com.positivo.schoolar.security.SecurityUtils;
import br.com.positivo.schoolar.security.oauth2.OAuth2AuthenticationService;
import br.com.positivo.schoolar.security.oauth2.OAuth2TokenEndpointClient;
import br.com.positivo.schoolar.service.MailService;
import br.com.positivo.schoolar.service.dto.UserDTO;
import br.com.positivo.schoolar.web.rest.errors.*;
import br.com.positivo.schoolar.web.rest.vm.KeyAndPasswordVM;
import br.com.positivo.schoolar.web.rest.vm.ManagedUserVM;
import com.codahale.metrics.annotation.Timed;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final MailService mailService;

    private OAuth2AuthenticationService authenticationService;

    public AccountResource(MailService mailService, OAuth2AuthenticationService authenticationService) {

        this.mailService = mailService;

        this.authenticationService = authenticationService;
    }

    /**
     * GET  /account : get the current user.
     *
     * @return the current user
     * @throws RuntimeException 500 (Internal Server Error) if the user couldn't be returned
     */
    @RequestMapping(value = "/account", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserDTO> getAccount(HttpServletRequest request, HttpServletResponse response) {

        return authenticationService.getAccount(request, response);
    }

    private static boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password) &&
            password.length() >= ManagedUserVM.PASSWORD_MIN_LENGTH &&
            password.length() <= ManagedUserVM.PASSWORD_MAX_LENGTH;
    }
}
