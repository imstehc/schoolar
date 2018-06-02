package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblAuthentication;
import br.com.positivo.schoolar.repository.TblAuthenticationRepository;
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
 * Test class for the TblAuthenticationResource REST controller.
 *
 * @see TblAuthenticationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblAuthenticationResourceIntTest {

    private static final Long DEFAULT_ID_AUTHENTICATION = 1L;
    private static final Long UPDATED_ID_AUTHENTICATION = 2L;

    private static final String DEFAULT_STR_CPF = "AAAAAAAAAA";
    private static final String UPDATED_STR_CPF = "BBBBBBBBBB";

    private static final String DEFAULT_STR_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_STR_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_STR_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_STR_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private TblAuthenticationRepository tblAuthenticationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblAuthenticationMockMvc;

    private TblAuthentication tblAuthentication;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblAuthenticationResource tblAuthenticationResource = new TblAuthenticationResource(tblAuthenticationRepository);
        this.restTblAuthenticationMockMvc = MockMvcBuilders.standaloneSetup(tblAuthenticationResource)
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
    public static TblAuthentication createEntity(EntityManager em) {
        TblAuthentication tblAuthentication = new TblAuthentication()
            .idAuthentication(DEFAULT_ID_AUTHENTICATION)
            .strCPF(DEFAULT_STR_CPF)
            .strUserName(DEFAULT_STR_USER_NAME)
            .strEmail(DEFAULT_STR_EMAIL)
            .strPassword(DEFAULT_STR_PASSWORD);
        return tblAuthentication;
    }

    @Before
    public void initTest() {
        tblAuthentication = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblAuthentication() throws Exception {
        int databaseSizeBeforeCreate = tblAuthenticationRepository.findAll().size();

        // Create the TblAuthentication
        restTblAuthenticationMockMvc.perform(post("/api/tbl-authentications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAuthentication)))
            .andExpect(status().isCreated());

        // Validate the TblAuthentication in the database
        List<TblAuthentication> tblAuthenticationList = tblAuthenticationRepository.findAll();
        assertThat(tblAuthenticationList).hasSize(databaseSizeBeforeCreate + 1);
        TblAuthentication testTblAuthentication = tblAuthenticationList.get(tblAuthenticationList.size() - 1);
        assertThat(testTblAuthentication.getIdAuthentication()).isEqualTo(DEFAULT_ID_AUTHENTICATION);
        assertThat(testTblAuthentication.getStrCPF()).isEqualTo(DEFAULT_STR_CPF);
        assertThat(testTblAuthentication.getStrUserName()).isEqualTo(DEFAULT_STR_USER_NAME);
        assertThat(testTblAuthentication.getStrEmail()).isEqualTo(DEFAULT_STR_EMAIL);
        assertThat(testTblAuthentication.getStrPassword()).isEqualTo(DEFAULT_STR_PASSWORD);
    }

    @Test
    @Transactional
    public void createTblAuthenticationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblAuthenticationRepository.findAll().size();

        // Create the TblAuthentication with an existing ID
        tblAuthentication.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblAuthenticationMockMvc.perform(post("/api/tbl-authentications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAuthentication)))
            .andExpect(status().isBadRequest());

        // Validate the TblAuthentication in the database
        List<TblAuthentication> tblAuthenticationList = tblAuthenticationRepository.findAll();
        assertThat(tblAuthenticationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkIdAuthenticationIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAuthenticationRepository.findAll().size();
        // set the field null
        tblAuthentication.setIdAuthentication(null);

        // Create the TblAuthentication, which fails.

        restTblAuthenticationMockMvc.perform(post("/api/tbl-authentications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAuthentication)))
            .andExpect(status().isBadRequest());

        List<TblAuthentication> tblAuthenticationList = tblAuthenticationRepository.findAll();
        assertThat(tblAuthenticationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrUserNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAuthenticationRepository.findAll().size();
        // set the field null
        tblAuthentication.setStrUserName(null);

        // Create the TblAuthentication, which fails.

        restTblAuthenticationMockMvc.perform(post("/api/tbl-authentications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAuthentication)))
            .andExpect(status().isBadRequest());

        List<TblAuthentication> tblAuthenticationList = tblAuthenticationRepository.findAll();
        assertThat(tblAuthenticationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblAuthenticationRepository.findAll().size();
        // set the field null
        tblAuthentication.setStrEmail(null);

        // Create the TblAuthentication, which fails.

        restTblAuthenticationMockMvc.perform(post("/api/tbl-authentications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAuthentication)))
            .andExpect(status().isBadRequest());

        List<TblAuthentication> tblAuthenticationList = tblAuthenticationRepository.findAll();
        assertThat(tblAuthenticationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblAuthentications() throws Exception {
        // Initialize the database
        tblAuthenticationRepository.saveAndFlush(tblAuthentication);

        // Get all the tblAuthenticationList
        restTblAuthenticationMockMvc.perform(get("/api/tbl-authentications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblAuthentication.getId().intValue())))
            .andExpect(jsonPath("$.[*].idAuthentication").value(hasItem(DEFAULT_ID_AUTHENTICATION.intValue())))
            .andExpect(jsonPath("$.[*].strCPF").value(hasItem(DEFAULT_STR_CPF.toString())))
            .andExpect(jsonPath("$.[*].strUserName").value(hasItem(DEFAULT_STR_USER_NAME.toString())))
            .andExpect(jsonPath("$.[*].strEmail").value(hasItem(DEFAULT_STR_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].strPassword").value(hasItem(DEFAULT_STR_PASSWORD.toString())));
    }

    @Test
    @Transactional
    public void getTblAuthentication() throws Exception {
        // Initialize the database
        tblAuthenticationRepository.saveAndFlush(tblAuthentication);

        // Get the tblAuthentication
        restTblAuthenticationMockMvc.perform(get("/api/tbl-authentications/{id}", tblAuthentication.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblAuthentication.getId().intValue()))
            .andExpect(jsonPath("$.idAuthentication").value(DEFAULT_ID_AUTHENTICATION.intValue()))
            .andExpect(jsonPath("$.strCPF").value(DEFAULT_STR_CPF.toString()))
            .andExpect(jsonPath("$.strUserName").value(DEFAULT_STR_USER_NAME.toString()))
            .andExpect(jsonPath("$.strEmail").value(DEFAULT_STR_EMAIL.toString()))
            .andExpect(jsonPath("$.strPassword").value(DEFAULT_STR_PASSWORD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblAuthentication() throws Exception {
        // Get the tblAuthentication
        restTblAuthenticationMockMvc.perform(get("/api/tbl-authentications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblAuthentication() throws Exception {
        // Initialize the database
        tblAuthenticationRepository.saveAndFlush(tblAuthentication);
        int databaseSizeBeforeUpdate = tblAuthenticationRepository.findAll().size();

        // Update the tblAuthentication
        TblAuthentication updatedTblAuthentication = tblAuthenticationRepository.findOne(tblAuthentication.getId());
        // Disconnect from session so that the updates on updatedTblAuthentication are not directly saved in db
        em.detach(updatedTblAuthentication);
        updatedTblAuthentication
            .idAuthentication(UPDATED_ID_AUTHENTICATION)
            .strCPF(UPDATED_STR_CPF)
            .strUserName(UPDATED_STR_USER_NAME)
            .strEmail(UPDATED_STR_EMAIL)
            .strPassword(UPDATED_STR_PASSWORD);

        restTblAuthenticationMockMvc.perform(put("/api/tbl-authentications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblAuthentication)))
            .andExpect(status().isOk());

        // Validate the TblAuthentication in the database
        List<TblAuthentication> tblAuthenticationList = tblAuthenticationRepository.findAll();
        assertThat(tblAuthenticationList).hasSize(databaseSizeBeforeUpdate);
        TblAuthentication testTblAuthentication = tblAuthenticationList.get(tblAuthenticationList.size() - 1);
        assertThat(testTblAuthentication.getIdAuthentication()).isEqualTo(UPDATED_ID_AUTHENTICATION);
        assertThat(testTblAuthentication.getStrCPF()).isEqualTo(UPDATED_STR_CPF);
        assertThat(testTblAuthentication.getStrUserName()).isEqualTo(UPDATED_STR_USER_NAME);
        assertThat(testTblAuthentication.getStrEmail()).isEqualTo(UPDATED_STR_EMAIL);
        assertThat(testTblAuthentication.getStrPassword()).isEqualTo(UPDATED_STR_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingTblAuthentication() throws Exception {
        int databaseSizeBeforeUpdate = tblAuthenticationRepository.findAll().size();

        // Create the TblAuthentication

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblAuthenticationMockMvc.perform(put("/api/tbl-authentications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAuthentication)))
            .andExpect(status().isCreated());

        // Validate the TblAuthentication in the database
        List<TblAuthentication> tblAuthenticationList = tblAuthenticationRepository.findAll();
        assertThat(tblAuthenticationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblAuthentication() throws Exception {
        // Initialize the database
        tblAuthenticationRepository.saveAndFlush(tblAuthentication);
        int databaseSizeBeforeDelete = tblAuthenticationRepository.findAll().size();

        // Get the tblAuthentication
        restTblAuthenticationMockMvc.perform(delete("/api/tbl-authentications/{id}", tblAuthentication.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblAuthentication> tblAuthenticationList = tblAuthenticationRepository.findAll();
        assertThat(tblAuthenticationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblAuthentication.class);
        TblAuthentication tblAuthentication1 = new TblAuthentication();
        tblAuthentication1.setId(1L);
        TblAuthentication tblAuthentication2 = new TblAuthentication();
        tblAuthentication2.setId(tblAuthentication1.getId());
        assertThat(tblAuthentication1).isEqualTo(tblAuthentication2);
        tblAuthentication2.setId(2L);
        assertThat(tblAuthentication1).isNotEqualTo(tblAuthentication2);
        tblAuthentication1.setId(null);
        assertThat(tblAuthentication1).isNotEqualTo(tblAuthentication2);
    }
}
