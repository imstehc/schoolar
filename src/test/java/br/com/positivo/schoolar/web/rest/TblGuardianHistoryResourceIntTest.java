package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblGuardianHistory;
import br.com.positivo.schoolar.repository.TblGuardianHistoryRepository;
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
 * Test class for the TblGuardianHistoryResource REST controller.
 *
 * @see TblGuardianHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblGuardianHistoryResourceIntTest {

    private static final Instant DEFAULT_DTM_CHANGED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CHANGED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblGuardianHistoryRepository tblGuardianHistoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblGuardianHistoryMockMvc;

    private TblGuardianHistory tblGuardianHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblGuardianHistoryResource tblGuardianHistoryResource = new TblGuardianHistoryResource(tblGuardianHistoryRepository);
        this.restTblGuardianHistoryMockMvc = MockMvcBuilders.standaloneSetup(tblGuardianHistoryResource)
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
    public static TblGuardianHistory createEntity(EntityManager em) {
        TblGuardianHistory tblGuardianHistory = new TblGuardianHistory()
            .dtmChanged(DEFAULT_DTM_CHANGED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblGuardianHistory;
    }

    @Before
    public void initTest() {
        tblGuardianHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblGuardianHistory() throws Exception {
        int databaseSizeBeforeCreate = tblGuardianHistoryRepository.findAll().size();

        // Create the TblGuardianHistory
        restTblGuardianHistoryMockMvc.perform(post("/api/tbl-guardian-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGuardianHistory)))
            .andExpect(status().isCreated());

        // Validate the TblGuardianHistory in the database
        List<TblGuardianHistory> tblGuardianHistoryList = tblGuardianHistoryRepository.findAll();
        assertThat(tblGuardianHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        TblGuardianHistory testTblGuardianHistory = tblGuardianHistoryList.get(tblGuardianHistoryList.size() - 1);
        assertThat(testTblGuardianHistory.getDtmChanged()).isEqualTo(DEFAULT_DTM_CHANGED);
        assertThat(testTblGuardianHistory.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblGuardianHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblGuardianHistoryRepository.findAll().size();

        // Create the TblGuardianHistory with an existing ID
        tblGuardianHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblGuardianHistoryMockMvc.perform(post("/api/tbl-guardian-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGuardianHistory)))
            .andExpect(status().isBadRequest());

        // Validate the TblGuardianHistory in the database
        List<TblGuardianHistory> tblGuardianHistoryList = tblGuardianHistoryRepository.findAll();
        assertThat(tblGuardianHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDtmChangedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblGuardianHistoryRepository.findAll().size();
        // set the field null
        tblGuardianHistory.setDtmChanged(null);

        // Create the TblGuardianHistory, which fails.

        restTblGuardianHistoryMockMvc.perform(post("/api/tbl-guardian-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGuardianHistory)))
            .andExpect(status().isBadRequest());

        List<TblGuardianHistory> tblGuardianHistoryList = tblGuardianHistoryRepository.findAll();
        assertThat(tblGuardianHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblGuardianHistories() throws Exception {
        // Initialize the database
        tblGuardianHistoryRepository.saveAndFlush(tblGuardianHistory);

        // Get all the tblGuardianHistoryList
        restTblGuardianHistoryMockMvc.perform(get("/api/tbl-guardian-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblGuardianHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmChanged").value(hasItem(DEFAULT_DTM_CHANGED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblGuardianHistory() throws Exception {
        // Initialize the database
        tblGuardianHistoryRepository.saveAndFlush(tblGuardianHistory);

        // Get the tblGuardianHistory
        restTblGuardianHistoryMockMvc.perform(get("/api/tbl-guardian-histories/{id}", tblGuardianHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblGuardianHistory.getId().intValue()))
            .andExpect(jsonPath("$.dtmChanged").value(DEFAULT_DTM_CHANGED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblGuardianHistory() throws Exception {
        // Get the tblGuardianHistory
        restTblGuardianHistoryMockMvc.perform(get("/api/tbl-guardian-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblGuardianHistory() throws Exception {
        // Initialize the database
        tblGuardianHistoryRepository.saveAndFlush(tblGuardianHistory);
        int databaseSizeBeforeUpdate = tblGuardianHistoryRepository.findAll().size();

        // Update the tblGuardianHistory
        TblGuardianHistory updatedTblGuardianHistory = tblGuardianHistoryRepository.findOne(tblGuardianHistory.getId());
        // Disconnect from session so that the updates on updatedTblGuardianHistory are not directly saved in db
        em.detach(updatedTblGuardianHistory);
        updatedTblGuardianHistory
            .dtmChanged(UPDATED_DTM_CHANGED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblGuardianHistoryMockMvc.perform(put("/api/tbl-guardian-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblGuardianHistory)))
            .andExpect(status().isOk());

        // Validate the TblGuardianHistory in the database
        List<TblGuardianHistory> tblGuardianHistoryList = tblGuardianHistoryRepository.findAll();
        assertThat(tblGuardianHistoryList).hasSize(databaseSizeBeforeUpdate);
        TblGuardianHistory testTblGuardianHistory = tblGuardianHistoryList.get(tblGuardianHistoryList.size() - 1);
        assertThat(testTblGuardianHistory.getDtmChanged()).isEqualTo(UPDATED_DTM_CHANGED);
        assertThat(testTblGuardianHistory.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblGuardianHistory() throws Exception {
        int databaseSizeBeforeUpdate = tblGuardianHistoryRepository.findAll().size();

        // Create the TblGuardianHistory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblGuardianHistoryMockMvc.perform(put("/api/tbl-guardian-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGuardianHistory)))
            .andExpect(status().isCreated());

        // Validate the TblGuardianHistory in the database
        List<TblGuardianHistory> tblGuardianHistoryList = tblGuardianHistoryRepository.findAll();
        assertThat(tblGuardianHistoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblGuardianHistory() throws Exception {
        // Initialize the database
        tblGuardianHistoryRepository.saveAndFlush(tblGuardianHistory);
        int databaseSizeBeforeDelete = tblGuardianHistoryRepository.findAll().size();

        // Get the tblGuardianHistory
        restTblGuardianHistoryMockMvc.perform(delete("/api/tbl-guardian-histories/{id}", tblGuardianHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblGuardianHistory> tblGuardianHistoryList = tblGuardianHistoryRepository.findAll();
        assertThat(tblGuardianHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblGuardianHistory.class);
        TblGuardianHistory tblGuardianHistory1 = new TblGuardianHistory();
        tblGuardianHistory1.setId(1L);
        TblGuardianHistory tblGuardianHistory2 = new TblGuardianHistory();
        tblGuardianHistory2.setId(tblGuardianHistory1.getId());
        assertThat(tblGuardianHistory1).isEqualTo(tblGuardianHistory2);
        tblGuardianHistory2.setId(2L);
        assertThat(tblGuardianHistory1).isNotEqualTo(tblGuardianHistory2);
        tblGuardianHistory1.setId(null);
        assertThat(tblGuardianHistory1).isNotEqualTo(tblGuardianHistory2);
    }
}
