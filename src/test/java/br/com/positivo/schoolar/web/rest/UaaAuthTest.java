package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;
import br.com.positivo.schoolar.config.SecurityBeanOverrideConfiguration;
import org.codehaus.jettison.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Test class for the ProfileInfoResource REST controller.
 *
 * @see ProfileInfoResource
 **/
@RunWith(SpringRunner.class)
@SpringBootTest(classes = {SchoolarApp.class, SecurityBeanOverrideConfiguration.class})
public class UaaAuthTest {


    @Autowired()
    private OAuth2RestTemplate oAuthRestTemplate;

    @Autowired
    private RestTemplate restTemplate;

    @Test
    public void getProfileInfoWithRibbon() throws Exception {

        oAuthRestTemplate.getOAuth2ClientContext().getAccessTokenRequest().set("username", "admin");
        oAuthRestTemplate.getOAuth2ClientContext().getAccessTokenRequest().set("password", "admin");
        ResponseEntity<Object[]> entity = oAuthRestTemplate.getForEntity("http://localhost:8080/api/tbl-guardian-types", Object[].class);
        Assert.assertEquals(HttpStatus.OK, entity.getStatusCode());

    }

    @Test
    public void getProfileInfoWithRibbdon() throws Exception {

        oAuthRestTemplate.getOAuth2ClientContext().getAccessTokenRequest().set("username", "admin");
        oAuthRestTemplate.getOAuth2ClientContext().getAccessTokenRequest().set("password", "admin");

        ResponseEntity<Object> entity = oAuthRestTemplate.getForEntity("http://localhost:9999/api/account", Object.class);
        Assert.assertEquals(HttpStatus.OK, entity.getStatusCode());

    }

    @Test
    public void registerUserInUAABySchoolar() throws Exception {

        JSONObject request = new JSONObject();

        request.put("login", "13247lokiki45454547474jujujuhyhgy1245");
        request.put("password", "12345");
        request.put("firstName", "ncfteste");
        request.put("lastName", "nfctesate");
        request.put("email", "nfcteste@nfc.com.br");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> entity = new HttpEntity<>(request.toString(), headers);

        ResponseEntity<String> entityResponse = restTemplate.postForEntity("http://localhost:9999/api/register", entity, String.class);

        Assert.assertEquals(HttpStatus.CREATED, entityResponse.getStatusCode());
    }
}
