package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblSchoolSubject;
import br.com.positivo.schoolar.repository.TblSchoolSubjectRepository;
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
 * Test class for the TblSchoolSubjectResource REST controller.
 *
 * @see TblSchoolSubjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblSchoolSubjectResourceIntTest {

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDADE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDADE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblSchoolSubjectRepository tblSchoolSubjectRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblSchoolSubjectMockMvc;

    private TblSchoolSubject tblSchoolSubject;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblSchoolSubjectResource tblSchoolSubjectResource = new TblSchoolSubjectResource(tblSchoolSubjectRepository);
        this.restTblSchoolSubjectMockMvc = MockMvcBuilders.standaloneSetup(tblSchoolSubjectResource)
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
    public static TblSchoolSubject createEntity(EntityManager em) {
        TblSchoolSubject tblSchoolSubject = new TblSchoolSubject()
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDADE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblSchoolSubject;
    }

    @Before
    public void initTest() {
        tblSchoolSubject = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblSchoolSubject() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolSubjectRepository.findAll().size();

        // Create the TblSchoolSubject
        restTblSchoolSubjectMockMvc.perform(post("/api/tbl-school-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolSubject)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolSubject in the database
        List<TblSchoolSubject> tblSchoolSubjectList = tblSchoolSubjectRepository.findAll();
        assertThat(tblSchoolSubjectList).hasSize(databaseSizeBeforeCreate + 1);
        TblSchoolSubject testTblSchoolSubject = tblSchoolSubjectList.get(tblSchoolSubjectList.size() - 1);
        assertThat(testTblSchoolSubject.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblSchoolSubject.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDADE);
        assertThat(testTblSchoolSubject.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblSchoolSubjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolSubjectRepository.findAll().size();

        // Create the TblSchoolSubject with an existing ID
        tblSchoolSubject.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblSchoolSubjectMockMvc.perform(post("/api/tbl-school-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolSubject)))
            .andExpect(status().isBadRequest());

        // Validate the TblSchoolSubject in the database
        List<TblSchoolSubject> tblSchoolSubjectList = tblSchoolSubjectRepository.findAll();
        assertThat(tblSchoolSubjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblSchoolSubjects() throws Exception {
        // Initialize the database
        tblSchoolSubjectRepository.saveAndFlush(tblSchoolSubject);

        // Get all the tblSchoolSubjectList
        restTblSchoolSubjectMockMvc.perform(get("/api/tbl-school-subjects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblSchoolSubject.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdade").value(hasItem(DEFAULT_DTM_LAST_UPDADE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblSchoolSubject() throws Exception {
        // Initialize the database
        tblSchoolSubjectRepository.saveAndFlush(tblSchoolSubject);

        // Get the tblSchoolSubject
        restTblSchoolSubjectMockMvc.perform(get("/api/tbl-school-subjects/{id}", tblSchoolSubject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblSchoolSubject.getId().intValue()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdade").value(DEFAULT_DTM_LAST_UPDADE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblSchoolSubject() throws Exception {
        // Get the tblSchoolSubject
        restTblSchoolSubjectMockMvc.perform(get("/api/tbl-school-subjects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblSchoolSubject() throws Exception {
        // Initialize the database
        tblSchoolSubjectRepository.saveAndFlush(tblSchoolSubject);
        int databaseSizeBeforeUpdate = tblSchoolSubjectRepository.findAll().size();

        // Update the tblSchoolSubject
        TblSchoolSubject updatedTblSchoolSubject = tblSchoolSubjectRepository.findOne(tblSchoolSubject.getId());
        // Disconnect from session so that the updates on updatedTblSchoolSubject are not directly saved in db
        em.detach(updatedTblSchoolSubject);
        updatedTblSchoolSubject
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDADE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblSchoolSubjectMockMvc.perform(put("/api/tbl-school-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblSchoolSubject)))
            .andExpect(status().isOk());

        // Validate the TblSchoolSubject in the database
        List<TblSchoolSubject> tblSchoolSubjectList = tblSchoolSubjectRepository.findAll();
        assertThat(tblSchoolSubjectList).hasSize(databaseSizeBeforeUpdate);
        TblSchoolSubject testTblSchoolSubject = tblSchoolSubjectList.get(tblSchoolSubjectList.size() - 1);
        assertThat(testTblSchoolSubject.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblSchoolSubject.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDADE);
        assertThat(testTblSchoolSubject.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblSchoolSubject() throws Exception {
        int databaseSizeBeforeUpdate = tblSchoolSubjectRepository.findAll().size();

        // Create the TblSchoolSubject

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblSchoolSubjectMockMvc.perform(put("/api/tbl-school-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolSubject)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolSubject in the database
        List<TblSchoolSubject> tblSchoolSubjectList = tblSchoolSubjectRepository.findAll();
        assertThat(tblSchoolSubjectList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblSchoolSubject() throws Exception {
        // Initialize the database
        tblSchoolSubjectRepository.saveAndFlush(tblSchoolSubject);
        int databaseSizeBeforeDelete = tblSchoolSubjectRepository.findAll().size();

        // Get the tblSchoolSubject
        restTblSchoolSubjectMockMvc.perform(delete("/api/tbl-school-subjects/{id}", tblSchoolSubject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblSchoolSubject> tblSchoolSubjectList = tblSchoolSubjectRepository.findAll();
        assertThat(tblSchoolSubjectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblSchoolSubject.class);
        TblSchoolSubject tblSchoolSubject1 = new TblSchoolSubject();
        tblSchoolSubject1.setId(1L);
        TblSchoolSubject tblSchoolSubject2 = new TblSchoolSubject();
        tblSchoolSubject2.setId(tblSchoolSubject1.getId());
        assertThat(tblSchoolSubject1).isEqualTo(tblSchoolSubject2);
        tblSchoolSubject2.setId(2L);
        assertThat(tblSchoolSubject1).isNotEqualTo(tblSchoolSubject2);
        tblSchoolSubject1.setId(null);
        assertThat(tblSchoolSubject1).isNotEqualTo(tblSchoolSubject2);
    }
}
