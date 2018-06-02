package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblSchoolNetworkSchool;
import br.com.positivo.schoolar.repository.TblSchoolNetworkSchoolRepository;
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
 * Test class for the TblSchoolNetworkSchoolResource REST controller.
 *
 * @see TblSchoolNetworkSchoolResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblSchoolNetworkSchoolResourceIntTest {

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblSchoolNetworkSchoolRepository tblSchoolNetworkSchoolRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblSchoolNetworkSchoolMockMvc;

    private TblSchoolNetworkSchool tblSchoolNetworkSchool;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        final TblSchoolNetworkSchoolResource tblSchoolNetworkSchoolResource = new TblSchoolNetworkSchoolResource();
        this.restTblSchoolNetworkSchoolMockMvc = MockMvcBuilders.standaloneSetup(tblSchoolNetworkSchoolResource)
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
    public static TblSchoolNetworkSchool createEntity(EntityManager em) {
        TblSchoolNetworkSchool tblSchoolNetworkSchool = new TblSchoolNetworkSchool()
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblSchoolNetworkSchool;
    }

    @Before
    public void initTest() {
        tblSchoolNetworkSchool = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblSchoolNetworkSchool() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolNetworkSchoolRepository.findAll().size();

        // Create the TblSchoolNetworkSchool
        restTblSchoolNetworkSchoolMockMvc.perform(post("/api/tbl-school-network-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetworkSchool)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolNetworkSchool in the database
        List<TblSchoolNetworkSchool> tblSchoolNetworkSchoolList = tblSchoolNetworkSchoolRepository.findAll();
        assertThat(tblSchoolNetworkSchoolList).hasSize(databaseSizeBeforeCreate + 1);
        TblSchoolNetworkSchool testTblSchoolNetworkSchool = tblSchoolNetworkSchoolList.get(tblSchoolNetworkSchoolList.size() - 1);
        assertThat(testTblSchoolNetworkSchool.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblSchoolNetworkSchool.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblSchoolNetworkSchool.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblSchoolNetworkSchoolWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolNetworkSchoolRepository.findAll().size();

        // Create the TblSchoolNetworkSchool with an existing ID
        tblSchoolNetworkSchool.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblSchoolNetworkSchoolMockMvc.perform(post("/api/tbl-school-network-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetworkSchool)))
            .andExpect(status().isBadRequest());

        // Validate the TblSchoolNetworkSchool in the database
        List<TblSchoolNetworkSchool> tblSchoolNetworkSchoolList = tblSchoolNetworkSchoolRepository.findAll();
        assertThat(tblSchoolNetworkSchoolList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDtmCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolNetworkSchoolRepository.findAll().size();
        // set the field null
        tblSchoolNetworkSchool.setDtmCreated(null);

        // Create the TblSchoolNetworkSchool, which fails.

        restTblSchoolNetworkSchoolMockMvc.perform(post("/api/tbl-school-network-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetworkSchool)))
            .andExpect(status().isBadRequest());

        List<TblSchoolNetworkSchool> tblSchoolNetworkSchoolList = tblSchoolNetworkSchoolRepository.findAll();
        assertThat(tblSchoolNetworkSchoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolNetworkSchoolRepository.findAll().size();
        // set the field null
        tblSchoolNetworkSchool.setIntExcluded(null);

        // Create the TblSchoolNetworkSchool, which fails.

        restTblSchoolNetworkSchoolMockMvc.perform(post("/api/tbl-school-network-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetworkSchool)))
            .andExpect(status().isBadRequest());

        List<TblSchoolNetworkSchool> tblSchoolNetworkSchoolList = tblSchoolNetworkSchoolRepository.findAll();
        assertThat(tblSchoolNetworkSchoolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblSchoolNetworkSchools() throws Exception {
        // Initialize the database
        tblSchoolNetworkSchoolRepository.saveAndFlush(tblSchoolNetworkSchool);

        // Get all the tblSchoolNetworkSchoolList
        restTblSchoolNetworkSchoolMockMvc.perform(get("/api/tbl-school-network-schools?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblSchoolNetworkSchool.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblSchoolNetworkSchool() throws Exception {
        // Initialize the database
        tblSchoolNetworkSchoolRepository.saveAndFlush(tblSchoolNetworkSchool);

        // Get the tblSchoolNetworkSchool
        restTblSchoolNetworkSchoolMockMvc.perform(get("/api/tbl-school-network-schools/{id}", tblSchoolNetworkSchool.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblSchoolNetworkSchool.getId().intValue()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblSchoolNetworkSchool() throws Exception {
        // Get the tblSchoolNetworkSchool
        restTblSchoolNetworkSchoolMockMvc.perform(get("/api/tbl-school-network-schools/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblSchoolNetworkSchool() throws Exception {
        // Initialize the database
        tblSchoolNetworkSchoolRepository.saveAndFlush(tblSchoolNetworkSchool);
        int databaseSizeBeforeUpdate = tblSchoolNetworkSchoolRepository.findAll().size();

        // Update the tblSchoolNetworkSchool
        TblSchoolNetworkSchool updatedTblSchoolNetworkSchool = tblSchoolNetworkSchoolRepository.findOne(tblSchoolNetworkSchool.getId());
        // Disconnect from session so that the updates on updatedTblSchoolNetworkSchool are not directly saved in db
        em.detach(updatedTblSchoolNetworkSchool);
        updatedTblSchoolNetworkSchool
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblSchoolNetworkSchoolMockMvc.perform(put("/api/tbl-school-network-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblSchoolNetworkSchool)))
            .andExpect(status().isOk());

        // Validate the TblSchoolNetworkSchool in the database
        List<TblSchoolNetworkSchool> tblSchoolNetworkSchoolList = tblSchoolNetworkSchoolRepository.findAll();
        assertThat(tblSchoolNetworkSchoolList).hasSize(databaseSizeBeforeUpdate);
        TblSchoolNetworkSchool testTblSchoolNetworkSchool = tblSchoolNetworkSchoolList.get(tblSchoolNetworkSchoolList.size() - 1);
        assertThat(testTblSchoolNetworkSchool.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblSchoolNetworkSchool.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblSchoolNetworkSchool.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblSchoolNetworkSchool() throws Exception {
        int databaseSizeBeforeUpdate = tblSchoolNetworkSchoolRepository.findAll().size();

        // Create the TblSchoolNetworkSchool

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblSchoolNetworkSchoolMockMvc.perform(put("/api/tbl-school-network-schools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolNetworkSchool)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolNetworkSchool in the database
        List<TblSchoolNetworkSchool> tblSchoolNetworkSchoolList = tblSchoolNetworkSchoolRepository.findAll();
        assertThat(tblSchoolNetworkSchoolList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblSchoolNetworkSchool() throws Exception {
        // Initialize the database
        tblSchoolNetworkSchoolRepository.saveAndFlush(tblSchoolNetworkSchool);
        int databaseSizeBeforeDelete = tblSchoolNetworkSchoolRepository.findAll().size();

        // Get the tblSchoolNetworkSchool
        restTblSchoolNetworkSchoolMockMvc.perform(delete("/api/tbl-school-network-schools/{id}", tblSchoolNetworkSchool.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblSchoolNetworkSchool> tblSchoolNetworkSchoolList = tblSchoolNetworkSchoolRepository.findAll();
        assertThat(tblSchoolNetworkSchoolList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblSchoolNetworkSchool.class);
        TblSchoolNetworkSchool tblSchoolNetworkSchool1 = new TblSchoolNetworkSchool();
        tblSchoolNetworkSchool1.setId(1L);
        TblSchoolNetworkSchool tblSchoolNetworkSchool2 = new TblSchoolNetworkSchool();
        tblSchoolNetworkSchool2.setId(tblSchoolNetworkSchool1.getId());
        assertThat(tblSchoolNetworkSchool1).isEqualTo(tblSchoolNetworkSchool2);
        tblSchoolNetworkSchool2.setId(2L);
        assertThat(tblSchoolNetworkSchool1).isNotEqualTo(tblSchoolNetworkSchool2);
        tblSchoolNetworkSchool1.setId(null);
        assertThat(tblSchoolNetworkSchool1).isNotEqualTo(tblSchoolNetworkSchool2);
    }
}
