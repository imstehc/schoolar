package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblSchoolNetwork;
import br.com.positivo.schoolar.repository.TblSchoolNetworkRepository;
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
 * Test class for the TblSchoolNetworkResource REST controller.
 *
 * @see TblSchoolNetworkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblSchoolNetworkResourceIntTest {

    private static final String DEFAULT_STR_CODE = "AAAAAAAAAA";
    private static final String UPDATED_STR_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_LEGAL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_LEGAL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_STR_CNPJ = "BBBBBBBBBB";

    private static final String DEFAULT_STR_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_STR_EMAIL = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblSchoolNetworkRepository tblSchoolNetworkRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblSchoolNetworkMockMvc;

    private TblSchoolNetwork tblSchoolNetwork;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblSchoolNetworkResource tblSchoolNetworkResource = new TblSchoolNetworkResource(tblSchoolNetworkRepository);
        this.restTblSchoolNetworkMockMvc = MockMvcBuilders.standaloneSetup(tblSchoolNetworkResource)
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
    public static TblSchoolNetwork createEntity(EntityManager em) {
        TblSchoolNetwork tblSchoolNetwork = new TblSchoolNetwork()
            .strCode(DEFAULT_STR_CODE)
            .strName(DEFAULT_STR_NAME)
            .strLegalName(DEFAULT_STR_LEGAL_NAME)
            .strCNPJ(DEFAULT_STR_CNPJ)
            .strEmail(DEFAULT_STR_EMAIL)
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblSchoolNetwork;
    }

    @Before
    public void initTest() {
        tblSchoolNetwork = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblSchoolNetwork() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolNetworkRepository.findAll().size();

        // Create the TblSchoolNetwork
        restTblSchoolNetworkMockMvc.perform(post("/api/tbl-school-networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetwork)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolNetwork in the database
        List<TblSchoolNetwork> tblSchoolNetworkList = tblSchoolNetworkRepository.findAll();
        assertThat(tblSchoolNetworkList).hasSize(databaseSizeBeforeCreate + 1);
        TblSchoolNetwork testTblSchoolNetwork = tblSchoolNetworkList.get(tblSchoolNetworkList.size() - 1);
        assertThat(testTblSchoolNetwork.getStrCode()).isEqualTo(DEFAULT_STR_CODE);
        assertThat(testTblSchoolNetwork.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblSchoolNetwork.getStrLegalName()).isEqualTo(DEFAULT_STR_LEGAL_NAME);
        assertThat(testTblSchoolNetwork.getStrCNPJ()).isEqualTo(DEFAULT_STR_CNPJ);
        assertThat(testTblSchoolNetwork.getStrEmail()).isEqualTo(DEFAULT_STR_EMAIL);
        assertThat(testTblSchoolNetwork.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblSchoolNetwork.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblSchoolNetwork.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblSchoolNetworkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolNetworkRepository.findAll().size();

        // Create the TblSchoolNetwork with an existing ID
        tblSchoolNetwork.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblSchoolNetworkMockMvc.perform(post("/api/tbl-school-networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetwork)))
            .andExpect(status().isBadRequest());

        // Validate the TblSchoolNetwork in the database
        List<TblSchoolNetwork> tblSchoolNetworkList = tblSchoolNetworkRepository.findAll();
        assertThat(tblSchoolNetworkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolNetworkRepository.findAll().size();
        // set the field null
        tblSchoolNetwork.setStrCode(null);

        // Create the TblSchoolNetwork, which fails.

        restTblSchoolNetworkMockMvc.perform(post("/api/tbl-school-networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetwork)))
            .andExpect(status().isBadRequest());

        List<TblSchoolNetwork> tblSchoolNetworkList = tblSchoolNetworkRepository.findAll();
        assertThat(tblSchoolNetworkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolNetworkRepository.findAll().size();
        // set the field null
        tblSchoolNetwork.setStrName(null);

        // Create the TblSchoolNetwork, which fails.

        restTblSchoolNetworkMockMvc.perform(post("/api/tbl-school-networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetwork)))
            .andExpect(status().isBadRequest());

        List<TblSchoolNetwork> tblSchoolNetworkList = tblSchoolNetworkRepository.findAll();
        assertThat(tblSchoolNetworkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDtmCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolNetworkRepository.findAll().size();
        // set the field null
        tblSchoolNetwork.setDtmCreated(null);

        // Create the TblSchoolNetwork, which fails.

        restTblSchoolNetworkMockMvc.perform(post("/api/tbl-school-networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetwork)))
            .andExpect(status().isBadRequest());

        List<TblSchoolNetwork> tblSchoolNetworkList = tblSchoolNetworkRepository.findAll();
        assertThat(tblSchoolNetworkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolNetworkRepository.findAll().size();
        // set the field null
        tblSchoolNetwork.setIntExcluded(null);

        // Create the TblSchoolNetwork, which fails.

        restTblSchoolNetworkMockMvc.perform(post("/api/tbl-school-networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetwork)))
            .andExpect(status().isBadRequest());

        List<TblSchoolNetwork> tblSchoolNetworkList = tblSchoolNetworkRepository.findAll();
        assertThat(tblSchoolNetworkList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblSchoolNetworks() throws Exception {
        // Initialize the database
        tblSchoolNetworkRepository.saveAndFlush(tblSchoolNetwork);

        // Get all the tblSchoolNetworkList
        restTblSchoolNetworkMockMvc.perform(get("/api/tbl-school-networks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblSchoolNetwork.getId().intValue())))
            .andExpect(jsonPath("$.[*].strCode").value(hasItem(DEFAULT_STR_CODE.toString())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].strLegalName").value(hasItem(DEFAULT_STR_LEGAL_NAME.toString())))
            .andExpect(jsonPath("$.[*].strCNPJ").value(hasItem(DEFAULT_STR_CNPJ.toString())))
            .andExpect(jsonPath("$.[*].strEmail").value(hasItem(DEFAULT_STR_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblSchoolNetwork() throws Exception {
        // Initialize the database
        tblSchoolNetworkRepository.saveAndFlush(tblSchoolNetwork);

        // Get the tblSchoolNetwork
        restTblSchoolNetworkMockMvc.perform(get("/api/tbl-school-networks/{id}", tblSchoolNetwork.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblSchoolNetwork.getId().intValue()))
            .andExpect(jsonPath("$.strCode").value(DEFAULT_STR_CODE.toString()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.strLegalName").value(DEFAULT_STR_LEGAL_NAME.toString()))
            .andExpect(jsonPath("$.strCNPJ").value(DEFAULT_STR_CNPJ.toString()))
            .andExpect(jsonPath("$.strEmail").value(DEFAULT_STR_EMAIL.toString()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblSchoolNetwork() throws Exception {
        // Get the tblSchoolNetwork
        restTblSchoolNetworkMockMvc.perform(get("/api/tbl-school-networks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblSchoolNetwork() throws Exception {
        // Initialize the database
        tblSchoolNetworkRepository.saveAndFlush(tblSchoolNetwork);
        int databaseSizeBeforeUpdate = tblSchoolNetworkRepository.findAll().size();

        // Update the tblSchoolNetwork
        TblSchoolNetwork updatedTblSchoolNetwork = tblSchoolNetworkRepository.findOne(tblSchoolNetwork.getId());
        // Disconnect from session so that the updates on updatedTblSchoolNetwork are not directly saved in db
        em.detach(updatedTblSchoolNetwork);
        updatedTblSchoolNetwork
            .strCode(UPDATED_STR_CODE)
            .strName(UPDATED_STR_NAME)
            .strLegalName(UPDATED_STR_LEGAL_NAME)
            .strCNPJ(UPDATED_STR_CNPJ)
            .strEmail(UPDATED_STR_EMAIL)
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblSchoolNetworkMockMvc.perform(put("/api/tbl-school-networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblSchoolNetwork)))
            .andExpect(status().isOk());

        // Validate the TblSchoolNetwork in the database
        List<TblSchoolNetwork> tblSchoolNetworkList = tblSchoolNetworkRepository.findAll();
        assertThat(tblSchoolNetworkList).hasSize(databaseSizeBeforeUpdate);
        TblSchoolNetwork testTblSchoolNetwork = tblSchoolNetworkList.get(tblSchoolNetworkList.size() - 1);
        assertThat(testTblSchoolNetwork.getStrCode()).isEqualTo(UPDATED_STR_CODE);
        assertThat(testTblSchoolNetwork.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblSchoolNetwork.getStrLegalName()).isEqualTo(UPDATED_STR_LEGAL_NAME);
        assertThat(testTblSchoolNetwork.getStrCNPJ()).isEqualTo(UPDATED_STR_CNPJ);
        assertThat(testTblSchoolNetwork.getStrEmail()).isEqualTo(UPDATED_STR_EMAIL);
        assertThat(testTblSchoolNetwork.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblSchoolNetwork.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblSchoolNetwork.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblSchoolNetwork() throws Exception {
        int databaseSizeBeforeUpdate = tblSchoolNetworkRepository.findAll().size();

        // Create the TblSchoolNetwork

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblSchoolNetworkMockMvc.perform(put("/api/tbl-school-networks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetwork)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolNetwork in the database
        List<TblSchoolNetwork> tblSchoolNetworkList = tblSchoolNetworkRepository.findAll();
        assertThat(tblSchoolNetworkList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblSchoolNetwork() throws Exception {
        // Initialize the database
        tblSchoolNetworkRepository.saveAndFlush(tblSchoolNetwork);
        int databaseSizeBeforeDelete = tblSchoolNetworkRepository.findAll().size();

        // Get the tblSchoolNetwork
        restTblSchoolNetworkMockMvc.perform(delete("/api/tbl-school-networks/{id}", tblSchoolNetwork.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblSchoolNetwork> tblSchoolNetworkList = tblSchoolNetworkRepository.findAll();
        assertThat(tblSchoolNetworkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblSchoolNetwork.class);
        TblSchoolNetwork tblSchoolNetwork1 = new TblSchoolNetwork();
        tblSchoolNetwork1.setId(1L);
        TblSchoolNetwork tblSchoolNetwork2 = new TblSchoolNetwork();
        tblSchoolNetwork2.setId(tblSchoolNetwork1.getId());
        assertThat(tblSchoolNetwork1).isEqualTo(tblSchoolNetwork2);
        tblSchoolNetwork2.setId(2L);
        assertThat(tblSchoolNetwork1).isNotEqualTo(tblSchoolNetwork2);
        tblSchoolNetwork1.setId(null);
        assertThat(tblSchoolNetwork1).isNotEqualTo(tblSchoolNetwork2);
    }
}
