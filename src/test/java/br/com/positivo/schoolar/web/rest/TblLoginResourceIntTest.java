package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblLogin;
import br.com.positivo.schoolar.repository.TblLoginRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static br.com.positivo.schoolar.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TblLoginResource REST controller.
 *
 * @see TblLoginResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblLoginResourceIntTest {

    private static final String DEFAULT_STR_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_STR_PASSWORD = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblLoginRepository tblLoginRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblLoginMockMvc;

    private TblLogin tblLogin;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblLoginResource tblLoginResource = new TblLoginResource(tblLoginRepository);
        this.restTblLoginMockMvc = MockMvcBuilders.standaloneSetup(tblLoginResource)
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
    public static TblLogin createEntity(EntityManager em) {
        TblLogin tblLogin = new TblLogin()
            .strUserName(DEFAULT_STR_USER_NAME)
            .strPassword(DEFAULT_STR_PASSWORD)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblLogin;
    }

    @Before
    public void initTest() {
        tblLogin = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblLogin() throws Exception {
        int databaseSizeBeforeCreate = tblLoginRepository.findAll().size();

        // Create the TblLogin
        restTblLoginMockMvc.perform(post("/api/tbl-logins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblLogin)))
            .andExpect(status().isCreated());

        // Validate the TblLogin in the database
        List<TblLogin> tblLoginList = tblLoginRepository.findAll();
        assertThat(tblLoginList).hasSize(databaseSizeBeforeCreate + 1);
        TblLogin testTblLogin = tblLoginList.get(tblLoginList.size() - 1);
        assertThat(testTblLogin.getStrUserName()).isEqualTo(DEFAULT_STR_USER_NAME);
        assertThat(testTblLogin.getStrPassword()).isEqualTo(DEFAULT_STR_PASSWORD);
        assertThat(testTblLogin.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblLoginWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblLoginRepository.findAll().size();

        // Create the TblLogin with an existing ID
        tblLogin.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblLoginMockMvc.perform(post("/api/tbl-logins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblLogin)))
            .andExpect(status().isBadRequest());

        // Validate the TblLogin in the database
        List<TblLogin> tblLoginList = tblLoginRepository.findAll();
        assertThat(tblLoginList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrUserNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblLoginRepository.findAll().size();
        // set the field null
        tblLogin.setStrUserName(null);

        // Create the TblLogin, which fails.

        restTblLoginMockMvc.perform(post("/api/tbl-logins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblLogin)))
            .andExpect(status().isBadRequest());

        List<TblLogin> tblLoginList = tblLoginRepository.findAll();
        assertThat(tblLoginList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblLoginRepository.findAll().size();
        // set the field null
        tblLogin.setStrPassword(null);

        // Create the TblLogin, which fails.

        restTblLoginMockMvc.perform(post("/api/tbl-logins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblLogin)))
            .andExpect(status().isBadRequest());

        List<TblLogin> tblLoginList = tblLoginRepository.findAll();
        assertThat(tblLoginList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblLogins() throws Exception {
        // Initialize the database
        tblLoginRepository.saveAndFlush(tblLogin);

        // Get all the tblLoginList
        restTblLoginMockMvc.perform(get("/api/tbl-logins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblLogin.getId().intValue())))
            .andExpect(jsonPath("$.[*].strUserName").value(hasItem(DEFAULT_STR_USER_NAME.toString())))
            .andExpect(jsonPath("$.[*].strPassword").value(hasItem(DEFAULT_STR_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblLogin() throws Exception {
        // Initialize the database
        tblLoginRepository.saveAndFlush(tblLogin);

        // Get the tblLogin
        restTblLoginMockMvc.perform(get("/api/tbl-logins/{id}", tblLogin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblLogin.getId().intValue()))
            .andExpect(jsonPath("$.strUserName").value(DEFAULT_STR_USER_NAME.toString()))
            .andExpect(jsonPath("$.strPassword").value(DEFAULT_STR_PASSWORD.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblLogin() throws Exception {
        // Get the tblLogin
        restTblLoginMockMvc.perform(get("/api/tbl-logins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblLogin() throws Exception {
        // Initialize the database
        tblLoginRepository.saveAndFlush(tblLogin);
        int databaseSizeBeforeUpdate = tblLoginRepository.findAll().size();

        // Update the tblLogin
        TblLogin updatedTblLogin = tblLoginRepository.findOne(tblLogin.getId());
        // Disconnect from session so that the updates on updatedTblLogin are not directly saved in db
        em.detach(updatedTblLogin);
        updatedTblLogin
            .strUserName(UPDATED_STR_USER_NAME)
            .strPassword(UPDATED_STR_PASSWORD)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblLoginMockMvc.perform(put("/api/tbl-logins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblLogin)))
            .andExpect(status().isOk());

        // Validate the TblLogin in the database
        List<TblLogin> tblLoginList = tblLoginRepository.findAll();
        assertThat(tblLoginList).hasSize(databaseSizeBeforeUpdate);
        TblLogin testTblLogin = tblLoginList.get(tblLoginList.size() - 1);
        assertThat(testTblLogin.getStrUserName()).isEqualTo(UPDATED_STR_USER_NAME);
        assertThat(testTblLogin.getStrPassword()).isEqualTo(UPDATED_STR_PASSWORD);
        assertThat(testTblLogin.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblLogin() throws Exception {
        int databaseSizeBeforeUpdate = tblLoginRepository.findAll().size();

        // Create the TblLogin

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblLoginMockMvc.perform(put("/api/tbl-logins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblLogin)))
            .andExpect(status().isCreated());

        // Validate the TblLogin in the database
        List<TblLogin> tblLoginList = tblLoginRepository.findAll();
        assertThat(tblLoginList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblLogin() throws Exception {
        // Initialize the database
        tblLoginRepository.saveAndFlush(tblLogin);
        int databaseSizeBeforeDelete = tblLoginRepository.findAll().size();

        // Get the tblLogin
        restTblLoginMockMvc.perform(delete("/api/tbl-logins/{id}", tblLogin.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblLogin> tblLoginList = tblLoginRepository.findAll();
        assertThat(tblLoginList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblLogin.class);
        TblLogin tblLogin1 = new TblLogin();
        tblLogin1.setId(1L);
        TblLogin tblLogin2 = new TblLogin();
        tblLogin2.setId(tblLogin1.getId());
        assertThat(tblLogin1).isEqualTo(tblLogin2);
        tblLogin2.setId(2L);
        assertThat(tblLogin1).isNotEqualTo(tblLogin2);
        tblLogin1.setId(null);
        assertThat(tblLogin1).isNotEqualTo(tblLogin2);
    }
}
