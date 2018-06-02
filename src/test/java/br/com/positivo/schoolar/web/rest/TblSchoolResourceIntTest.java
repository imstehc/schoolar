package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblSchool;
import br.com.positivo.schoolar.repository.TblSchoolRepository;
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
 * Test class for the TblSchoolResource REST controller.
 *
 * @see TblSchoolResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblSchoolResourceIntTest {

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

    private static final String DEFAULT_STR_INEP = "AAAAAAAAAA";
    private static final String UPDATED_STR_INEP = "BBBBBBBBBB";

    private static final String DEFAULT_STR_INEP_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_INEP_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblSchoolRepository tblSchoolRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblSchoolMockMvc;

    private TblSchool tblSchool;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblSchoolResource tblSchoolResource = new TblSchoolResource(tblSchoolRepository);
        this.restTblSchoolMockMvc = MockMvcBuilders.standaloneSetup(tblSchoolResource)
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
    public static TblSchool createEntity(EntityManager em) {
        TblSchool tblSchool = new TblSchool()
            .strCode(DEFAULT_STR_CODE)
            .strName(DEFAULT_STR_NAME)
            .strLegalName(DEFAULT_STR_LEGAL_NAME)
            .strEmail(DEFAULT_STR_EMAIL)
            .strPhoto(DEFAULT_STR_PHOTO)
            .strCNPJ(DEFAULT_STR_CNPJ)
            .strINEP(DEFAULT_STR_INEP)
            .strINEPName(DEFAULT_STR_INEP_NAME)
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblSchool;
    }

    @Before
    public void initTest() {
        tblSchool = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblSchool() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolRepository.findAll().size();

        // Create the TblSchool
        restTblSchoolMockMvc.perform(post("/api/tbl-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchool)))
            .andExpect(status().isCreated());

        // Validate the TblSchool in the database
        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeCreate + 1);
        TblSchool testTblSchool = tblSchoolList.get(tblSchoolList.size() - 1);
        assertThat(testTblSchool.getStrCode()).isEqualTo(DEFAULT_STR_CODE);
        assertThat(testTblSchool.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblSchool.getStrLegalName()).isEqualTo(DEFAULT_STR_LEGAL_NAME);
        assertThat(testTblSchool.getStrEmail()).isEqualTo(DEFAULT_STR_EMAIL);
        assertThat(testTblSchool.getStrPhoto()).isEqualTo(DEFAULT_STR_PHOTO);
        assertThat(testTblSchool.getSchoolType()).isEqualTo(DEFAULT_ID_SCHOOL_TYPE);
        assertThat(testTblSchool.getStrCNPJ()).isEqualTo(DEFAULT_STR_CNPJ);
        assertThat(testTblSchool.getStrINEP()).isEqualTo(DEFAULT_STR_INEP);
        assertThat(testTblSchool.getStrINEPName()).isEqualTo(DEFAULT_STR_INEP_NAME);
        assertThat(testTblSchool.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblSchool.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblSchool.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblSchoolWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolRepository.findAll().size();

        // Create the TblSchool with an existing ID
        tblSchool.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblSchoolMockMvc.perform(post("/api/tbl-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchool)))
            .andExpect(status().isBadRequest());

        // Validate the TblSchool in the database
        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolRepository.findAll().size();
        // set the field null
        tblSchool.setStrCode(null);

        // Create the TblSchool, which fails.

        restTblSchoolMockMvc.perform(post("/api/tbl-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchool)))
            .andExpect(status().isBadRequest());

        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolRepository.findAll().size();
        // set the field null
        tblSchool.setStrName(null);

        // Create the TblSchool, which fails.

        restTblSchoolMockMvc.perform(post("/api/tbl-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchool)))
            .andExpect(status().isBadRequest());

        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrLegalNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolRepository.findAll().size();
        // set the field null
        tblSchool.setStrLegalName(null);

        // Create the TblSchool, which fails.

        restTblSchoolMockMvc.perform(post("/api/tbl-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchool)))
            .andExpect(status().isBadRequest());

        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrCNPJIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolRepository.findAll().size();
        // set the field null
        tblSchool.setStrCNPJ(null);

        // Create the TblSchool, which fails.

        restTblSchoolMockMvc.perform(post("/api/tbl-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchool)))
            .andExpect(status().isBadRequest());

        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDtmCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolRepository.findAll().size();
        // set the field null
        tblSchool.setDtmCreated(null);

        // Create the TblSchool, which fails.

        restTblSchoolMockMvc.perform(post("/api/tbl-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchool)))
            .andExpect(status().isBadRequest());

        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolRepository.findAll().size();
        // set the field null
        tblSchool.setIntExcluded(null);

        // Create the TblSchool, which fails.

        restTblSchoolMockMvc.perform(post("/api/tbl-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchool)))
            .andExpect(status().isBadRequest());

        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblSchools() throws Exception {
        // Initialize the database
        tblSchoolRepository.saveAndFlush(tblSchool);

        // Get all the tblSchoolList
        restTblSchoolMockMvc.perform(get("/api/tbl-schools?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblSchool.getId().intValue())))
            .andExpect(jsonPath("$.[*].strCode").value(hasItem(DEFAULT_STR_CODE.toString())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].strLegalName").value(hasItem(DEFAULT_STR_LEGAL_NAME.toString())))
            .andExpect(jsonPath("$.[*].strEmail").value(hasItem(DEFAULT_STR_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].strPhoto").value(hasItem(DEFAULT_STR_PHOTO.toString())))
            .andExpect(jsonPath("$.[*].idSchoolType").value(hasItem(DEFAULT_ID_SCHOOL_TYPE)))
            .andExpect(jsonPath("$.[*].strCNPJ").value(hasItem(DEFAULT_STR_CNPJ.toString())))
            .andExpect(jsonPath("$.[*].strINEP").value(hasItem(DEFAULT_STR_INEP.toString())))
            .andExpect(jsonPath("$.[*].strINEPName").value(hasItem(DEFAULT_STR_INEP_NAME.toString())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblSchool() throws Exception {
        // Initialize the database
        tblSchoolRepository.saveAndFlush(tblSchool);

        // Get the tblSchool
        restTblSchoolMockMvc.perform(get("/api/tbl-schools/{id}", tblSchool.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblSchool.getId().intValue()))
            .andExpect(jsonPath("$.strCode").value(DEFAULT_STR_CODE.toString()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.strLegalName").value(DEFAULT_STR_LEGAL_NAME.toString()))
            .andExpect(jsonPath("$.strEmail").value(DEFAULT_STR_EMAIL.toString()))
            .andExpect(jsonPath("$.strPhoto").value(DEFAULT_STR_PHOTO.toString()))
            .andExpect(jsonPath("$.idSchoolType").value(DEFAULT_ID_SCHOOL_TYPE))
            .andExpect(jsonPath("$.strCNPJ").value(DEFAULT_STR_CNPJ.toString()))
            .andExpect(jsonPath("$.strINEP").value(DEFAULT_STR_INEP.toString()))
            .andExpect(jsonPath("$.strINEPName").value(DEFAULT_STR_INEP_NAME.toString()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblSchool() throws Exception {
        // Get the tblSchool
        restTblSchoolMockMvc.perform(get("/api/tbl-schools/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblSchool() throws Exception {
        // Initialize the database
        tblSchoolRepository.saveAndFlush(tblSchool);
        int databaseSizeBeforeUpdate = tblSchoolRepository.findAll().size();

        // Update the tblSchool
        TblSchool updatedTblSchool = tblSchoolRepository.findOne(tblSchool.getId());
        // Disconnect from session so that the updates on updatedTblSchool are not directly saved in db
        em.detach(updatedTblSchool);
        updatedTblSchool
            .strCode(UPDATED_STR_CODE)
            .strName(UPDATED_STR_NAME)
            .strLegalName(UPDATED_STR_LEGAL_NAME)
            .strEmail(UPDATED_STR_EMAIL)
            .strPhoto(UPDATED_STR_PHOTO)
            .strCNPJ(UPDATED_STR_CNPJ)
            .strINEP(UPDATED_STR_INEP)
            .strINEPName(UPDATED_STR_INEP_NAME)
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblSchoolMockMvc.perform(put("/api/tbl-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblSchool)))
            .andExpect(status().isOk());

        // Validate the TblSchool in the database
        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeUpdate);
        TblSchool testTblSchool = tblSchoolList.get(tblSchoolList.size() - 1);
        assertThat(testTblSchool.getStrCode()).isEqualTo(UPDATED_STR_CODE);
        assertThat(testTblSchool.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblSchool.getStrLegalName()).isEqualTo(UPDATED_STR_LEGAL_NAME);
        assertThat(testTblSchool.getStrEmail()).isEqualTo(UPDATED_STR_EMAIL);
        assertThat(testTblSchool.getStrPhoto()).isEqualTo(UPDATED_STR_PHOTO);
        assertThat(testTblSchool.getSchoolType()).isEqualTo(UPDATED_ID_SCHOOL_TYPE);
        assertThat(testTblSchool.getStrCNPJ()).isEqualTo(UPDATED_STR_CNPJ);
        assertThat(testTblSchool.getStrINEP()).isEqualTo(UPDATED_STR_INEP);
        assertThat(testTblSchool.getStrINEPName()).isEqualTo(UPDATED_STR_INEP_NAME);
        assertThat(testTblSchool.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblSchool.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblSchool.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblSchool() throws Exception {
        int databaseSizeBeforeUpdate = tblSchoolRepository.findAll().size();

        // Create the TblSchool

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblSchoolMockMvc.perform(put("/api/tbl-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchool)))
            .andExpect(status().isCreated());

        // Validate the TblSchool in the database
        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblSchool() throws Exception {
        // Initialize the database
        tblSchoolRepository.saveAndFlush(tblSchool);
        int databaseSizeBeforeDelete = tblSchoolRepository.findAll().size();

        // Get the tblSchool
        restTblSchoolMockMvc.perform(delete("/api/tbl-schools/{id}", tblSchool.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblSchool> tblSchoolList = tblSchoolRepository.findAll();
        assertThat(tblSchoolList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblSchool.class);
        TblSchool tblSchool1 = new TblSchool();
        tblSchool1.setId(1L);
        TblSchool tblSchool2 = new TblSchool();
        tblSchool2.setId(tblSchool1.getId());
        assertThat(tblSchool1).isEqualTo(tblSchool2);
        tblSchool2.setId(2L);
        assertThat(tblSchool1).isNotEqualTo(tblSchool2);
        tblSchool1.setId(null);
        assertThat(tblSchool1).isNotEqualTo(tblSchool2);
    }
}
