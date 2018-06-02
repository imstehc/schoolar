package br.com.positivo.schoolar.web.rest;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Scope;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.AccessTokenProvider;
import org.springframework.security.oauth2.client.token.AccessTokenProviderChain;
import org.springframework.security.oauth2.client.token.DefaultAccessTokenRequest;
import org.springframework.security.oauth2.client.token.grant.password.ResourceOwnerPasswordAccessTokenProvider;
import org.springframework.security.oauth2.client.token.grant.password.ResourceOwnerPasswordResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;


@Configuration
@EnableOAuth2Client
public class OAuth2ClientConfig {

    @Value("${security.oauth2.client.clientId}")
    private String oAuth2ClientId;

    @Value("${security.oauth2.client.clientSecret}")
    private String oAuth2ClientSecret;

    @Value("${security.oauth2.client.accessTokenUri}")
    private String accessTokenUri;

    @Autowired
    private OAuth2ClientContext oauth2ClientContext;

    @Bean
    public ClientHttpRequestFactory httpRequestFactory() {
        return new HttpComponentsClientHttpRequestFactory(httpClient());
    }

    @Bean
    public HttpClient httpClient() {
        PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager();
        connectionManager.setMaxTotal(2);
        // This client is for internal connections so only one route is expected
        connectionManager.setDefaultMaxPerRoute(2);
        return HttpClientBuilder.create().setConnectionManager(connectionManager).build();
    }

    @Bean
    public OAuth2ProtectedResourceDetails oauth2ProtectedResourceDetails() {
        ResourceOwnerPasswordResourceDetails details = new ResourceOwnerPasswordResourceDetails();
        details.setId("uaa");
        details.setClientId(oAuth2ClientId);
        details.setClientSecret(oAuth2ClientSecret);
        details.setAccessTokenUri(accessTokenUri);

        return details;
    }

    @Bean
    public AccessTokenProvider accessTokenProvider() {
        ResourceOwnerPasswordAccessTokenProvider tokenProvider = new ResourceOwnerPasswordAccessTokenProvider();
        tokenProvider.setRequestFactory(httpRequestFactory());
        return new AccessTokenProviderChain(
            Arrays.<AccessTokenProvider> asList(tokenProvider)
        );
    }

    @Bean("serivcseOauthRestTemplate")
    public OAuth2RestTemplate restTemplate() {
        DefaultOAuth2ClientContext defaultOAuth2ClientContext = new DefaultOAuth2ClientContext(new DefaultAccessTokenRequest());
        OAuth2RestTemplate template = new OAuth2RestTemplate(oauth2ProtectedResourceDetails(), defaultOAuth2ClientContext);
        template.setRequestFactory(httpRequestFactory());
        template.setAccessTokenProvider(accessTokenProvider());
        template.getOAuth2ClientContext().getAccessTokenRequest().set("username", "admin");
        template.getOAuth2ClientContext().getAccessTokenRequest().set("password", "admin");
        return template;
    }
}
