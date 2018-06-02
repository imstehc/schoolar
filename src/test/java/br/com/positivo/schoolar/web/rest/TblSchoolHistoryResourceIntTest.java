package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblSchoolHistory;
import br.com.positivo.schoolar.repository.TblSchoolHistoryRepository;
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
 * Test class for the TblSchoolHistoryResource REST controller.
 *
 * @see TblSchoolHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblSchoolHistoryResourceIntTest {

    private static final String DEFAULT_STR_CODE = "AAAAAAAAAA";
    private static final String UPDATED_STR_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_LEGAL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_LEGAL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_STR_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_STR_PHOTO = "AAAAAAAAAA";
    private static final String UPDATED_STR_PHOTO = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_SCHOOL_TYPE = 1;
    private static final Integer UPDATED_ID_SCHOOL_TYPE = 2;

    private static final String DEFAULT_STR_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_STR_CNPJ = "BBBBBBBBBB";

    private static final String DEFAULT_STR_NEP = "AAAAAAAAAA";
    private static final String UPDATED_STR_NEP = "BBBBBBBBBB";

    private static final String DEFAULT_STR_NEP_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NEP_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    private static final Instant DEFAULT_DTM_CHANGED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CHANGED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblSchoolHistoryRepository tblSchoolHistoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblSchoolHistoryMockMvc;

    private TblSchoolHistory tblSchoolHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblSchoolHistoryResource tblSchoolHistoryResource = new TblSchoolHistoryResource(tblSchoolHistoryRepository);
        this.restTblSchoolHistoryMockMvc = MockMvcBuilders.standaloneSetup(tblSchoolHistoryResource)
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
    public static TblSchoolHistory createEntity(EntityManager em) {
        TblSchoolHistory tblSchoolHistory = new TblSchoolHistory()
            .strCode(DEFAULT_STR_CODE)
            .strName(DEFAULT_STR_NAME)
            .strLegalName(DEFAULT_STR_LEGAL_NAME)
            .strEmail(DEFAULT_STR_EMAIL)
            .strPhoto(DEFAULT_STR_PHOTO)
            .idSchoolType(DEFAULT_ID_SCHOOL_TYPE)
            .strCNPJ(DEFAULT_STR_CNPJ)
            .strNEP(DEFAULT_STR_NEP)
            .strNEPName(DEFAULT_STR_NEP_NAME)
            .intExcluded(DEFAULT_INT_EXCLUDED)
            .dtmChanged(DEFAULT_DTM_CHANGED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblSchoolHistory;
    }

    @Before
    public void initTest() {
        tblSchoolHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblSchoolHistory() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolHistoryRepository.findAll().size();

        // Create the TblSchoolHistory
        restTblSchoolHistoryMockMvc.perform(post("/api/tbl-school-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolHistory)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolHistory in the database
        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        TblSchoolHistory testTblSchoolHistory = tblSchoolHistoryList.get(tblSchoolHistoryList.size() - 1);
        assertThat(testTblSchoolHistory.getStrCode()).isEqualTo(DEFAULT_STR_CODE);
        assertThat(testTblSchoolHistory.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblSchoolHistory.getStrLegalName()).isEqualTo(DEFAULT_STR_LEGAL_NAME);
        assertThat(testTblSchoolHistory.getStrEmail()).isEqualTo(DEFAULT_STR_EMAIL);
        assertThat(testTblSchoolHistory.getStrPhoto()).isEqualTo(DEFAULT_STR_PHOTO);
        assertThat(testTblSchoolHistory.getIdSchoolType()).isEqualTo(DEFAULT_ID_SCHOOL_TYPE);
        assertThat(testTblSchoolHistory.getStrCNPJ()).isEqualTo(DEFAULT_STR_CNPJ);
        assertThat(testTblSchoolHistory.getStrNEP()).isEqualTo(DEFAULT_STR_NEP);
        assertThat(testTblSchoolHistory.getStrNEPName()).isEqualTo(DEFAULT_STR_NEP_NAME);
        assertThat(testTblSchoolHistory.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
        assertThat(testTblSchoolHistory.getDtmChanged()).isEqualTo(DEFAULT_DTM_CHANGED);
        assertThat(testTblSchoolHistory.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblSchoolHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolHistoryRepository.findAll().size();

        // Create the TblSchoolHistory with an existing ID
        tblSchoolHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblSchoolHistoryMockMvc.perform(post("/api/tbl-school-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolHistory)))
            .andExpect(status().isBadRequest());

        // Validate the TblSchoolHistory in the database
        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolHistoryRepository.findAll().size();
        // set the field null
        tblSchoolHistory.setStrCode(null);

        // Create the TblSchoolHistory, which fails.

        restTblSchoolHistoryMockMvc.perform(post("/api/tbl-school-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolHistory)))
            .andExpect(status().isBadRequest());

        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolHistoryRepository.findAll().size();
        // set the field null
        tblSchoolHistory.setStrName(null);

        // Create the TblSchoolHistory, which fails.

        restTblSchoolHistoryMockMvc.perform(post("/api/tbl-school-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolHistory)))
            .andExpect(status().isBadRequest());

        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrLegalNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolHistoryRepository.findAll().size();
        // set the field null
        tblSchoolHistory.setStrLegalName(null);

        // Create the TblSchoolHistory, which fails.

        restTblSchoolHistoryMockMvc.perform(post("/api/tbl-school-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolHistory)))
            .andExpect(status().isBadRequest());

        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrCNPJIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolHistoryRepository.findAll().size();
        // set the field null
        tblSchoolHistory.setStrCNPJ(null);

        // Create the TblSchoolHistory, which fails.

        restTblSchoolHistoryMockMvc.perform(post("/api/tbl-school-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolHistory)))
            .andExpect(status().isBadRequest());

        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolHistoryRepository.findAll().size();
        // set the field null
        tblSchoolHistory.setIntExcluded(null);

        // Create the TblSchoolHistory, which fails.

        restTblSchoolHistoryMockMvc.perform(post("/api/tbl-school-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolHistory)))
            .andExpect(status().isBadRequest());

        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDtmChangedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolHistoryRepository.findAll().size();
        // set the field null
        tblSchoolHistory.setDtmChanged(null);

        // Create the TblSchoolHistory, which fails.

        restTblSchoolHistoryMockMvc.perform(post("/api/tbl-school-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolHistory)))
            .andExpect(status().isBadRequest());

        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblSchoolHistories() throws Exception {
        // Initialize the database
        tblSchoolHistoryRepository.saveAndFlush(tblSchoolHistory);

        // Get all the tblSchoolHistoryList
        restTblSchoolHistoryMockMvc.perform(get("/api/tbl-school-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblSchoolHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].strCode").value(hasItem(DEFAULT_STR_CODE.toString())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].strLegalName").value(hasItem(DEFAULT_STR_LEGAL_NAME.toString())))
            .andExpect(jsonPath("$.[*].strEmail").value(hasItem(DEFAULT_STR_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].strPhoto").value(hasItem(DEFAULT_STR_PHOTO.toString())))
            .andExpect(jsonPath("$.[*].idSchoolType").value(hasItem(DEFAULT_ID_SCHOOL_TYPE)))
            .andExpect(jsonPath("$.[*].strCNPJ").value(hasItem(DEFAULT_STR_CNPJ.toString())))
            .andExpect(jsonPath("$.[*].strNEP").value(hasItem(DEFAULT_STR_NEP.toString())))
            .andExpect(jsonPath("$.[*].strNEPName").value(hasItem(DEFAULT_STR_NEP_NAME.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)))
            .andExpect(jsonPath("$.[*].dtmChanged").value(hasItem(DEFAULT_DTM_CHANGED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblSchoolHistory() throws Exception {
        // Initialize the database
        tblSchoolHistoryRepository.saveAndFlush(tblSchoolHistory);

        // Get the tblSchoolHistory
        restTblSchoolHistoryMockMvc.perform(get("/api/tbl-school-histories/{id}", tblSchoolHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblSchoolHistory.getId().intValue()))
            .andExpect(jsonPath("$.strCode").value(DEFAULT_STR_CODE.toString()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.strLegalName").value(DEFAULT_STR_LEGAL_NAME.toString()))
            .andExpect(jsonPath("$.strEmail").value(DEFAULT_STR_EMAIL.toString()))
            .andExpect(jsonPath("$.strPhoto").value(DEFAULT_STR_PHOTO.toString()))
            .andExpect(jsonPath("$.idSchoolType").value(DEFAULT_ID_SCHOOL_TYPE))
            .andExpect(jsonPath("$.strCNPJ").value(DEFAULT_STR_CNPJ.toString()))
            .andExpect(jsonPath("$.strNEP").value(DEFAULT_STR_NEP.toString()))
            .andExpect(jsonPath("$.strNEPName").value(DEFAULT_STR_NEP_NAME.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED))
            .andExpect(jsonPath("$.dtmChanged").value(DEFAULT_DTM_CHANGED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblSchoolHistory() throws Exception {
        // Get the tblSchoolHistory
        restTblSchoolHistoryMockMvc.perform(get("/api/tbl-school-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblSchoolHistory() throws Exception {
        // Initialize the database
        tblSchoolHistoryRepository.saveAndFlush(tblSchoolHistory);
        int databaseSizeBeforeUpdate = tblSchoolHistoryRepository.findAll().size();

        // Update the tblSchoolHistory
        TblSchoolHistory updatedTblSchoolHistory = tblSchoolHistoryRepository.findOne(tblSchoolHistory.getId());
        // Disconnect from session so that the updates on updatedTblSchoolHistory are not directly saved in db
        em.detach(updatedTblSchoolHistory);
        updatedTblSchoolHistory
            .strCode(UPDATED_STR_CODE)
            .strName(UPDATED_STR_NAME)
            .strLegalName(UPDATED_STR_LEGAL_NAME)
            .strEmail(UPDATED_STR_EMAIL)
            .strPhoto(UPDATED_STR_PHOTO)
            .idSchoolType(UPDATED_ID_SCHOOL_TYPE)
            .strCNPJ(UPDATED_STR_CNPJ)
            .strNEP(UPDATED_STR_NEP)
            .strNEPName(UPDATED_STR_NEP_NAME)
            .intExcluded(UPDATED_INT_EXCLUDED)
            .dtmChanged(UPDATED_DTM_CHANGED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblSchoolHistoryMockMvc.perform(put("/api/tbl-school-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblSchoolHistory)))
            .andExpect(status().isOk());

        // Validate the TblSchoolHistory in the database
        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeUpdate);
        TblSchoolHistory testTblSchoolHistory = tblSchoolHistoryList.get(tblSchoolHistoryList.size() - 1);
        assertThat(testTblSchoolHistory.getStrCode()).isEqualTo(UPDATED_STR_CODE);
        assertThat(testTblSchoolHistory.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblSchoolHistory.getStrLegalName()).isEqualTo(UPDATED_STR_LEGAL_NAME);
        assertThat(testTblSchoolHistory.getStrEmail()).isEqualTo(UPDATED_STR_EMAIL);
        assertThat(testTblSchoolHistory.getStrPhoto()).isEqualTo(UPDATED_STR_PHOTO);
        assertThat(testTblSchoolHistory.getIdSchoolType()).isEqualTo(UPDATED_ID_SCHOOL_TYPE);
        assertThat(testTblSchoolHistory.getStrCNPJ()).isEqualTo(UPDATED_STR_CNPJ);
        assertThat(testTblSchoolHistory.getStrNEP()).isEqualTo(UPDATED_STR_NEP);
        assertThat(testTblSchoolHistory.getStrNEPName()).isEqualTo(UPDATED_STR_NEP_NAME);
        assertThat(testTblSchoolHistory.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
        assertThat(testTblSchoolHistory.getDtmChanged()).isEqualTo(UPDATED_DTM_CHANGED);
        assertThat(testTblSchoolHistory.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblSchoolHistory() throws Exception {
        int databaseSizeBeforeUpdate = tblSchoolHistoryRepository.findAll().size();

        // Create the TblSchoolHistory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblSchoolHistoryMockMvc.perform(put("/api/tbl-school-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolHistory)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolHistory in the database
        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblSchoolHistory() throws Exception {
        // Initialize the database
        tblSchoolHistoryRepository.saveAndFlush(tblSchoolHistory);
        int databaseSizeBeforeDelete = tblSchoolHistoryRepository.findAll().size();

        // Get the tblSchoolHistory
        restTblSchoolHistoryMockMvc.perform(delete("/api/tbl-school-histories/{id}", tblSchoolHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblSchoolHistory> tblSchoolHistoryList = tblSchoolHistoryRepository.findAll();
        assertThat(tblSchoolHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblSchoolHistory.class);
        TblSchoolHistory tblSchoolHistory1 = new TblSchoolHistory();
        tblSchoolHistory1.setId(1L);
        TblSchoolHistory tblSchoolHistory2 = new TblSchoolHistory();
        tblSchoolHistory2.setId(tblSchoolHistory1.getId());
        assertThat(tblSchoolHistory1).isEqualTo(tblSchoolHistory2);
        tblSchoolHistory2.setId(2L);
        assertThat(tblSchoolHistory1).isNotEqualTo(tblSchoolHistory2);
        tblSchoolHistory1.setId(null);
        assertThat(tblSchoolHistory1).isNotEqualTo(tblSchoolHistory2);
    }
}
