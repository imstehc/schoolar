package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblGrade;
import br.com.positivo.schoolar.repository.TblGradeRepository;
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
 * Test class for the TblGradeResource REST controller.
 *
 * @see TblGradeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblGradeResourceIntTest {

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_INT_NUMBER = 1;
    private static final Integer UPDATED_INT_NUMBER = 2;

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    private static final String DEFAULT_STR_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_STR_LABEL = "BBBBBBBBBB";

    @Autowired
    private TblGradeRepository tblGradeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblGradeMockMvc;

    private TblGrade tblGrade;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblGradeResource tblGradeResource = new TblGradeResource(tblGradeRepository);
        this.restTblGradeMockMvc = MockMvcBuilders.standaloneSetup(tblGradeResource)
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
    public static TblGrade createEntity(EntityManager em) {
        TblGrade tblGrade = new TblGrade()
            .strName(DEFAULT_STR_NAME)
            .intNumber(DEFAULT_INT_NUMBER)
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED)
            .strLabel(DEFAULT_STR_LABEL);
        return tblGrade;
    }

    @Before
    public void initTest() {
        tblGrade = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblGrade() throws Exception {
        int databaseSizeBeforeCreate = tblGradeRepository.findAll().size();

        // Create the TblGrade
        restTblGradeMockMvc.perform(post("/api/tbl-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGrade)))
            .andExpect(status().isCreated());

        // Validate the TblGrade in the database
        List<TblGrade> tblGradeList = tblGradeRepository.findAll();
        assertThat(tblGradeList).hasSize(databaseSizeBeforeCreate + 1);
        TblGrade testTblGrade = tblGradeList.get(tblGradeList.size() - 1);
        assertThat(testTblGrade.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblGrade.getIntNumber()).isEqualTo(DEFAULT_INT_NUMBER);
        assertThat(testTblGrade.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblGrade.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblGrade.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
        assertThat(testTblGrade.getStrLabel()).isEqualTo(DEFAULT_STR_LABEL);
    }

    @Test
    @Transactional
    public void createTblGradeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblGradeRepository.findAll().size();

        // Create the TblGrade with an existing ID
        tblGrade.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblGradeMockMvc.perform(post("/api/tbl-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGrade)))
            .andExpect(status().isBadRequest());

        // Validate the TblGrade in the database
        List<TblGrade> tblGradeList = tblGradeRepository.findAll();
        assertThat(tblGradeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblGrades() throws Exception {
        // Initialize the database
        tblGradeRepository.saveAndFlush(tblGrade);

        // Get all the tblGradeList
        restTblGradeMockMvc.perform(get("/api/tbl-grades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblGrade.getId().intValue())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].intNumber").value(hasItem(DEFAULT_INT_NUMBER)))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)))
            .andExpect(jsonPath("$.[*].strLabel").value(hasItem(DEFAULT_STR_LABEL.toString())));
    }

    @Test
    @Transactional
    public void getTblGrade() throws Exception {
        // Initialize the database
        tblGradeRepository.saveAndFlush(tblGrade);

        // Get the tblGrade
        restTblGradeMockMvc.perform(get("/api/tbl-grades/{id}", tblGrade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblGrade.getId().intValue()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.intNumber").value(DEFAULT_INT_NUMBER))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED))
            .andExpect(jsonPath("$.strLabel").value(DEFAULT_STR_LABEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblGrade() throws Exception {
        // Get the tblGrade
        restTblGradeMockMvc.perform(get("/api/tbl-grades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblGrade() throws Exception {
        // Initialize the database
        tblGradeRepository.saveAndFlush(tblGrade);
        int databaseSizeBeforeUpdate = tblGradeRepository.findAll().size();

        // Update the tblGrade
        TblGrade updatedTblGrade = tblGradeRepository.findOne(tblGrade.getId());
        // Disconnect from session so that the updates on updatedTblGrade are not directly saved in db
        em.detach(updatedTblGrade);
        updatedTblGrade
            .strName(UPDATED_STR_NAME)
            .intNumber(UPDATED_INT_NUMBER)
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED)
            .strLabel(UPDATED_STR_LABEL);

        restTblGradeMockMvc.perform(put("/api/tbl-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblGrade)))
            .andExpect(status().isOk());

        // Validate the TblGrade in the database
        List<TblGrade> tblGradeList = tblGradeRepository.findAll();
        assertThat(tblGradeList).hasSize(databaseSizeBeforeUpdate);
        TblGrade testTblGrade = tblGradeList.get(tblGradeList.size() - 1);
        assertThat(testTblGrade.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblGrade.getIntNumber()).isEqualTo(UPDATED_INT_NUMBER);
        assertThat(testTblGrade.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblGrade.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblGrade.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
        assertThat(testTblGrade.getStrLabel()).isEqualTo(UPDATED_STR_LABEL);
    }

    @Test
    @Transactional
    public void updateNonExistingTblGrade() throws Exception {
        int databaseSizeBeforeUpdate = tblGradeRepository.findAll().size();

        // Create the TblGrade

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblGradeMockMvc.perform(put("/api/tbl-grades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGrade)))
            .andExpect(status().isCreated());

        // Validate the TblGrade in the database
        List<TblGrade> tblGradeList = tblGradeRepository.findAll();
        assertThat(tblGradeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblGrade() throws Exception {
        // Initialize the database
        tblGradeRepository.saveAndFlush(tblGrade);
        int databaseSizeBeforeDelete = tblGradeRepository.findAll().size();

        // Get the tblGrade
        restTblGradeMockMvc.perform(delete("/api/tbl-grades/{id}", tblGrade.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblGrade> tblGradeList = tblGradeRepository.findAll();
        assertThat(tblGradeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblGrade.class);
        TblGrade tblGrade1 = new TblGrade();
        tblGrade1.setId(1L);
        TblGrade tblGrade2 = new TblGrade();
        tblGrade2.setId(tblGrade1.getId());
        assertThat(tblGrade1).isEqualTo(tblGrade2);
        tblGrade2.setId(2L);
        assertThat(tblGrade1).isNotEqualTo(tblGrade2);
        tblGrade1.setId(null);
        assertThat(tblGrade1).isNotEqualTo(tblGrade2);
    }
}
