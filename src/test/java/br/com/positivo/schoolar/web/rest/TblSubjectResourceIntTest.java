package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblSubject;
import br.com.positivo.schoolar.repository.TblSubjectRepository;
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
 * Test class for the TblSubjectResource REST controller.
 *
 * @see TblSubjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblSubjectResourceIntTest {

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_ABBREVIATION = "AAAAAAAAAA";
    private static final String UPDATED_STR_ABBREVIATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_INT_ORDER = 1;
    private static final Integer UPDATED_INT_ORDER = 2;

    private static final String DEFAULT_STR_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_STR_LABEL = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblSubjectRepository tblSubjectRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblSubjectMockMvc;

    private TblSubject tblSubject;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblSubjectResource tblSubjectResource = new TblSubjectResource(tblSubjectRepository);
        this.restTblSubjectMockMvc = MockMvcBuilders.standaloneSetup(tblSubjectResource)
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
    public static TblSubject createEntity(EntityManager em) {
        TblSubject tblSubject = new TblSubject()
            .strName(DEFAULT_STR_NAME)
            .strAbbreviation(DEFAULT_STR_ABBREVIATION)
            .intOrder(DEFAULT_INT_ORDER)
            .strLabel(DEFAULT_STR_LABEL)
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblSubject;
    }

    @Before
    public void initTest() {
        tblSubject = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblSubject() throws Exception {
        int databaseSizeBeforeCreate = tblSubjectRepository.findAll().size();

        // Create the TblSubject
        restTblSubjectMockMvc.perform(post("/api/tbl-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSubject)))
            .andExpect(status().isCreated());

        // Validate the TblSubject in the database
        List<TblSubject> tblSubjectList = tblSubjectRepository.findAll();
        assertThat(tblSubjectList).hasSize(databaseSizeBeforeCreate + 1);
        TblSubject testTblSubject = tblSubjectList.get(tblSubjectList.size() - 1);
        assertThat(testTblSubject.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblSubject.getStrAbbreviation()).isEqualTo(DEFAULT_STR_ABBREVIATION);
        assertThat(testTblSubject.getIntOrder()).isEqualTo(DEFAULT_INT_ORDER);
        assertThat(testTblSubject.getStrLabel()).isEqualTo(DEFAULT_STR_LABEL);
        assertThat(testTblSubject.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblSubject.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblSubject.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblSubjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblSubjectRepository.findAll().size();

        // Create the TblSubject with an existing ID
        tblSubject.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblSubjectMockMvc.perform(post("/api/tbl-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSubject)))
            .andExpect(status().isBadRequest());

        // Validate the TblSubject in the database
        List<TblSubject> tblSubjectList = tblSubjectRepository.findAll();
        assertThat(tblSubjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblSubjects() throws Exception {
        // Initialize the database
        tblSubjectRepository.saveAndFlush(tblSubject);

        // Get all the tblSubjectList
        restTblSubjectMockMvc.perform(get("/api/tbl-subjects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblSubject.getId().intValue())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].strAbbreviation").value(hasItem(DEFAULT_STR_ABBREVIATION.toString())))
            .andExpect(jsonPath("$.[*].intOrder").value(hasItem(DEFAULT_INT_ORDER)))
            .andExpect(jsonPath("$.[*].strLabel").value(hasItem(DEFAULT_STR_LABEL.toString())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblSubject() throws Exception {
        // Initialize the database
        tblSubjectRepository.saveAndFlush(tblSubject);

        // Get the tblSubject
        restTblSubjectMockMvc.perform(get("/api/tbl-subjects/{id}", tblSubject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblSubject.getId().intValue()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.strAbbreviation").value(DEFAULT_STR_ABBREVIATION.toString()))
            .andExpect(jsonPath("$.intOrder").value(DEFAULT_INT_ORDER))
            .andExpect(jsonPath("$.strLabel").value(DEFAULT_STR_LABEL.toString()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblSubject() throws Exception {
        // Get the tblSubject
        restTblSubjectMockMvc.perform(get("/api/tbl-subjects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblSubject() throws Exception {
        // Initialize the database
        tblSubjectRepository.saveAndFlush(tblSubject);
        int databaseSizeBeforeUpdate = tblSubjectRepository.findAll().size();

        // Update the tblSubject
        TblSubject updatedTblSubject = tblSubjectRepository.findOne(tblSubject.getId());
        // Disconnect from session so that the updates on updatedTblSubject are not directly saved in db
        em.detach(updatedTblSubject);
        updatedTblSubject
            .strName(UPDATED_STR_NAME)
            .strAbbreviation(UPDATED_STR_ABBREVIATION)
            .intOrder(UPDATED_INT_ORDER)
            .strLabel(UPDATED_STR_LABEL)
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblSubjectMockMvc.perform(put("/api/tbl-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblSubject)))
            .andExpect(status().isOk());

        // Validate the TblSubject in the database
        List<TblSubject> tblSubjectList = tblSubjectRepository.findAll();
        assertThat(tblSubjectList).hasSize(databaseSizeBeforeUpdate);
        TblSubject testTblSubject = tblSubjectList.get(tblSubjectList.size() - 1);
        assertThat(testTblSubject.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblSubject.getStrAbbreviation()).isEqualTo(UPDATED_STR_ABBREVIATION);
        assertThat(testTblSubject.getIntOrder()).isEqualTo(UPDATED_INT_ORDER);
        assertThat(testTblSubject.getStrLabel()).isEqualTo(UPDATED_STR_LABEL);
        assertThat(testTblSubject.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblSubject.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblSubject.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblSubject() throws Exception {
        int databaseSizeBeforeUpdate = tblSubjectRepository.findAll().size();

        // Create the TblSubject

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblSubjectMockMvc.perform(put("/api/tbl-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSubject)))
            .andExpect(status().isCreated());

        // Validate the TblSubject in the database
        List<TblSubject> tblSubjectList = tblSubjectRepository.findAll();
        assertThat(tblSubjectList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblSubject() throws Exception {
        // Initialize the database
        tblSubjectRepository.saveAndFlush(tblSubject);
        int databaseSizeBeforeDelete = tblSubjectRepository.findAll().size();

        // Get the tblSubject
        restTblSubjectMockMvc.perform(delete("/api/tbl-subjects/{id}", tblSubject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblSubject> tblSubjectList = tblSubjectRepository.findAll();
        assertThat(tblSubjectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblSubject.class);
        TblSubject tblSubject1 = new TblSubject();
        tblSubject1.setId(1L);
        TblSubject tblSubject2 = new TblSubject();
        tblSubject2.setId(tblSubject1.getId());
        assertThat(tblSubject1).isEqualTo(tblSubject2);
        tblSubject2.setId(2L);
        assertThat(tblSubject1).isNotEqualTo(tblSubject2);
        tblSubject1.setId(null);
        assertThat(tblSubject1).isNotEqualTo(tblSubject2);
    }
}
