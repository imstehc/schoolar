package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblAudienceClient;
import br.com.positivo.schoolar.repository.TblAudienceClientRepository;
import br.com.positivo.schoolar.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static br.com.positivo.schoolar.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TblAudienceClientResource REST controller.
 *
 * @see TblAudienceClientResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblAudienceClientResourceIntTest {

    private static final String DEFAULT_STR_BASE_64_SECRET = "AAAAAAAAAA";
    private static final String UPDATED_STR_BASE_64_SECRET = "BBBBBBBBBB";

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_INT_DAYS_ACCESS_TOKEN_EXPIRE = 1L;
    private static final Long UPDATED_INT_DAYS_ACCESS_TOKEN_EXPIRE = 2L;

    private static final Long DEFAULT_INT_DAYS_REFRESH_TOKEN_EXPIRE = 1L;
    private static final Long UPDATED_INT_DAYS_REFRESH_TOKEN_EXPIRE = 2L;

    @Autowired
    private TblAudienceClientRepository tblAudienceClientRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblAudienceClientMockMvc;

    private TblAudienceClient tblAudienceClient;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblAudienceClientResource tblAudienceClientResource = new TblAudienceClientResource(tblAudienceClientRepository);
        this.restTblAudienceClientMockMvc = MockMvcBuilders.standaloneSetup(tblAudienceClientResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TblAudienceClient createEntity(EntityManager em) {
        TblAudienceClient tblAudienceClient = new TblAudienceClient()
            .strBase64Secret(DEFAULT_STR_BASE_64_SECRET)
            .strName(DEFAULT_STR_NAME)
            .intDaysAccessTokenExpire(DEFAULT_INT_DAYS_ACCESS_TOKEN_EXPIRE)
            .intDaysRefreshTokenExpire(DEFAULT_INT_DAYS_REFRESH_TOKEN_EXPIRE);
        return tblAudienceClient;
    }

    @Before
    public void initTest() {
        tblAudienceClient = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblAudienceClient() throws Exception {
        int databaseSizeBeforeCreate = tblAudienceClientRepository.findAll().size();

        // Create the TblAudienceClient
        restTblAudienceClientMockMvc.perform(post("/api/tbl-audience-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAudienceClient)))
            .andExpect(status().isCreated());

        // Validate the TblAudienceClient in the database
        List<TblAudienceClient> tblAudienceClientList = tblAudienceClientRepository.findAll();
        assertThat(tblAudienceClientList).hasSize(databaseSizeBeforeCreate + 1);
        TblAudienceClient testTblAudienceClient = tblAudienceClientList.get(tblAudienceClientList.size() - 1);
        assertThat(testTblAudienceClient.getStrBase64Secret()).isEqualTo(DEFAULT_STR_BASE_64_SECRET);
        assertThat(testTblAudienceClient.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblAudienceClient.getIntDaysAccessTokenExpire()).isEqualTo(DEFAULT_INT_DAYS_ACCESS_TOKEN_EXPIRE);
        assertThat(testTblAudienceClient.getIntDaysRefreshTokenExpire()).isEqualTo(DEFAULT_INT_DAYS_REFRESH_TOKEN_EXPIRE);
    }

    @Test
    @Transactional
    public void createTblAudienceClientWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblAudienceClientRepository.findAll().size();

        // Create the TblAudienceClient with an existing ID
        tblAudienceClient.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblAudienceClientMockMvc.perform(post("/api/tbl-audience-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAudienceClient)))
            .andExpect(status().isBadRequest());

        // Validate the TblAudienceClient in the database
        List<TblAudienceClient> tblAudienceClientList = tblAudienceClientRepository.findAll();
        assertThat(tblAudienceClientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrBase64SecretIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAudienceClientRepository.findAll().size();
        // set the field null
        tblAudienceClient.setStrBase64Secret(null);

        // Create the TblAudienceClient, which fails.

        restTblAudienceClientMockMvc.perform(post("/api/tbl-audience-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAudienceClient)))
            .andExpect(status().isBadRequest());

        List<TblAudienceClient> tblAudienceClientList = tblAudienceClientRepository.findAll();
        assertThat(tblAudienceClientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntDaysAccessTokenExpireIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAudienceClientRepository.findAll().size();
        // set the field null
        tblAudienceClient.setIntDaysAccessTokenExpire(null);

        // Create the TblAudienceClient, which fails.

        restTblAudienceClientMockMvc.perform(post("/api/tbl-audience-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAudienceClient)))
            .andExpect(status().isBadRequest());

        List<TblAudienceClient> tblAudienceClientList = tblAudienceClientRepository.findAll();
        assertThat(tblAudienceClientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntDaysRefreshTokenExpireIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAudienceClientRepository.findAll().size();
        // set the field null
        tblAudienceClient.setIntDaysRefreshTokenExpire(null);

        // Create the TblAudienceClient, which fails.

        restTblAudienceClientMockMvc.perform(post("/api/tbl-audience-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAudienceClient)))
            .andExpect(status().isBadRequest());

        List<TblAudienceClient> tblAudienceClientList = tblAudienceClientRepository.findAll();
        assertThat(tblAudienceClientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblAudienceClients() throws Exception {
        // Initialize the database
        tblAudienceClientRepository.saveAndFlush(tblAudienceClient);

        // Get all the tblAudienceClientList
        restTblAudienceClientMockMvc.perform(get("/api/tbl-audience-clients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblAudienceClient.getId().intValue())))
            .andExpect(jsonPath("$.[*].strBase64Secret").value(hasItem(DEFAULT_STR_BASE_64_SECRET.toString())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].intDaysAccessTokenExpire").value(hasItem(DEFAULT_INT_DAYS_ACCESS_TOKEN_EXPIRE.intValue())))
            .andExpect(jsonPath("$.[*].intDaysRefreshTokenExpire").value(hasItem(DEFAULT_INT_DAYS_REFRESH_TOKEN_EXPIRE.intValue())));
    }

    @Test
    @Transactional
    public void getTblAudienceClient() throws Exception {
        // Initialize the database
        tblAudienceClientRepository.saveAndFlush(tblAudienceClient);

        // Get the tblAudienceClient
        restTblAudienceClientMockMvc.perform(get("/api/tbl-audience-clients/{id}", tblAudienceClient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblAudienceClient.getId().intValue()))
            .andExpect(jsonPath("$.strBase64Secret").value(DEFAULT_STR_BASE_64_SECRET.toString()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.intDaysAccessTokenExpire").value(DEFAULT_INT_DAYS_ACCESS_TOKEN_EXPIRE.intValue()))
            .andExpect(jsonPath("$.intDaysRefreshTokenExpire").value(DEFAULT_INT_DAYS_REFRESH_TOKEN_EXPIRE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTblAudienceClient() throws Exception {
        // Get the tblAudienceClient
        restTblAudienceClientMockMvc.perform(get("/api/tbl-audience-clients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblAudienceClient() throws Exception {
        // Initialize the database
        tblAudienceClientRepository.saveAndFlush(tblAudienceClient);
        int databaseSizeBeforeUpdate = tblAudienceClientRepository.findAll().size();

        // Update the tblAudienceClient
        TblAudienceClient updatedTblAudienceClient = tblAudienceClientRepository.findOne(tblAudienceClient.getId());
        // Disconnect from session so that the updates on updatedTblAudienceClient are not directly saved in db
        em.detach(updatedTblAudienceClient);
        updatedTblAudienceClient
            .strBase64Secret(UPDATED_STR_BASE_64_SECRET)
            .strName(UPDATED_STR_NAME)
            .intDaysAccessTokenExpire(UPDATED_INT_DAYS_ACCESS_TOKEN_EXPIRE)
            .intDaysRefreshTokenExpire(UPDATED_INT_DAYS_REFRESH_TOKEN_EXPIRE);

        restTblAudienceClientMockMvc.perform(put("/api/tbl-audience-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblAudienceClient)))
            .andExpect(status().isOk());

        // Validate the TblAudienceClient in the database
        List<TblAudienceClient> tblAudienceClientList = tblAudienceClientRepository.findAll();
        assertThat(tblAudienceClientList).hasSize(databaseSizeBeforeUpdate);
        TblAudienceClient testTblAudienceClient = tblAudienceClientList.get(tblAudienceClientList.size() - 1);
        assertThat(testTblAudienceClient.getStrBase64Secret()).isEqualTo(UPDATED_STR_BASE_64_SECRET);
        assertThat(testTblAudienceClient.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblAudienceClient.getIntDaysAccessTokenExpire()).isEqualTo(UPDATED_INT_DAYS_ACCESS_TOKEN_EXPIRE);
        assertThat(testTblAudienceClient.getIntDaysRefreshTokenExpire()).isEqualTo(UPDATED_INT_DAYS_REFRESH_TOKEN_EXPIRE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblAudienceClient() throws Exception {
        int databaseSizeBeforeUpdate = tblAudienceClientRepository.findAll().size();

        // Create the TblAudienceClient

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblAudienceClientMockMvc.perform(put("/api/tbl-audience-clients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAudienceClient)))
            .andExpect(status().isCreated());

        // Validate the TblAudienceClient in the database
        List<TblAudienceClient> tblAudienceClientList = tblAudienceClientRepository.findAll();
        assertThat(tblAudienceClientList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblAudienceClient() throws Exception {
        // Initialize the database
        tblAudienceClientRepository.saveAndFlush(tblAudienceClient);
        int databaseSizeBeforeDelete = tblAudienceClientRepository.findAll().size();

        // Get the tblAudienceClient
        restTblAudienceClientMockMvc.perform(delete("/api/tbl-audience-clients/{id}", tblAudienceClient.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblAudienceClient> tblAudienceClientList = tblAudienceClientRepository.findAll();
        assertThat(tblAudienceClientList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblAudienceClient.class);
        TblAudienceClient tblAudienceClient1 = new TblAudienceClient();
        tblAudienceClient1.setId(1L);
        TblAudienceClient tblAudienceClient2 = new TblAudienceClient();
        tblAudienceClient2.setId(tblAudienceClient1.getId());
        assertThat(tblAudienceClient1).isEqualTo(tblAudienceClient2);
        tblAudienceClient2.setId(2L);
        assertThat(tblAudienceClient1).isNotEqualTo(tblAudienceClient2);
        tblAudienceClient1.setId(null);
        assertThat(tblAudienceClient1).isNotEqualTo(tblAudienceClient2);
    }
}
