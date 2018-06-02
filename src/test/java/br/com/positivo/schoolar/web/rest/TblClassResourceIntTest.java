package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblClass;
import br.com.positivo.schoolar.repository.TblClassRepository;
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
 * Test class for the TblClassResource REST controller.
 *
 * @see TblClassResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblClassResourceIntTest {

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_INT_YEAR = 1;
    private static final Integer UPDATED_INT_YEAR = 2;

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblClassRepository tblClassRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblClassMockMvc;

    private TblClass tblClass;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblClassResource tblClassResource = new TblClassResource(tblClassRepository);
        this.restTblClassMockMvc = MockMvcBuilders.standaloneSetup(tblClassResource)
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
    public static TblClass createEntity(EntityManager em) {
        TblClass tblClass = new TblClass()
            .strName(DEFAULT_STR_NAME)
            .intYear(DEFAULT_INT_YEAR)
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblClass;
    }

    @Before
    public void initTest() {
        tblClass = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblClass() throws Exception {
        int databaseSizeBeforeCreate = tblClassRepository.findAll().size();

        // Create the TblClass
        restTblClassMockMvc.perform(post("/api/tbl-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClass)))
            .andExpect(status().isCreated());

        // Validate the TblClass in the database
        List<TblClass> tblClassList = tblClassRepository.findAll();
        assertThat(tblClassList).hasSize(databaseSizeBeforeCreate + 1);
        TblClass testTblClass = tblClassList.get(tblClassList.size() - 1);
        assertThat(testTblClass.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblClass.getIntYear()).isEqualTo(DEFAULT_INT_YEAR);
        assertThat(testTblClass.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblClass.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblClass.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblClassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblClassRepository.findAll().size();

        // Create the TblClass with an existing ID
        tblClass.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblClassMockMvc.perform(post("/api/tbl-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClass)))
            .andExpect(status().isBadRequest());

        // Validate the TblClass in the database
        List<TblClass> tblClassList = tblClassRepository.findAll();
        assertThat(tblClassList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblClasses() throws Exception {
        // Initialize the database
        tblClassRepository.saveAndFlush(tblClass);

        // Get all the tblClassList
        restTblClassMockMvc.perform(get("/api/tbl-classes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblClass.getId().intValue())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].intYear").value(hasItem(DEFAULT_INT_YEAR)))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblClass() throws Exception {
        // Initialize the database
        tblClassRepository.saveAndFlush(tblClass);

        // Get the tblClass
        restTblClassMockMvc.perform(get("/api/tbl-classes/{id}", tblClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblClass.getId().intValue()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.intYear").value(DEFAULT_INT_YEAR))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblClass() throws Exception {
        // Get the tblClass
        restTblClassMockMvc.perform(get("/api/tbl-classes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblClass() throws Exception {
        // Initialize the database
        tblClassRepository.saveAndFlush(tblClass);
        int databaseSizeBeforeUpdate = tblClassRepository.findAll().size();

        // Update the tblClass
        TblClass updatedTblClass = tblClassRepository.findOne(tblClass.getId());
        // Disconnect from session so that the updates on updatedTblClass are not directly saved in db
        em.detach(updatedTblClass);
        updatedTblClass
            .strName(UPDATED_STR_NAME)
            .intYear(UPDATED_INT_YEAR)
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblClassMockMvc.perform(put("/api/tbl-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblClass)))
            .andExpect(status().isOk());

        // Validate the TblClass in the database
        List<TblClass> tblClassList = tblClassRepository.findAll();
        assertThat(tblClassList).hasSize(databaseSizeBeforeUpdate);
        TblClass testTblClass = tblClassList.get(tblClassList.size() - 1);
        assertThat(testTblClass.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblClass.getIntYear()).isEqualTo(UPDATED_INT_YEAR);
        assertThat(testTblClass.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblClass.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblClass.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblClass() throws Exception {
        int databaseSizeBeforeUpdate = tblClassRepository.findAll().size();

        // Create the TblClass

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblClassMockMvc.perform(put("/api/tbl-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblClass)))
            .andExpect(status().isCreated());

        // Validate the TblClass in the database
        List<TblClass> tblClassList = tblClassRepository.findAll();
        assertThat(tblClassList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblClass() throws Exception {
        // Initialize the database
        tblClassRepository.saveAndFlush(tblClass);
        int databaseSizeBeforeDelete = tblClassRepository.findAll().size();

        // Get the tblClass
        restTblClassMockMvc.perform(delete("/api/tbl-classes/{id}", tblClass.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblClass> tblClassList = tblClassRepository.findAll();
        assertThat(tblClassList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblClass.class);
        TblClass tblClass1 = new TblClass();
        tblClass1.setId(1L);
        TblClass tblClass2 = new TblClass();
        tblClass2.setId(tblClass1.getId());
        assertThat(tblClass1).isEqualTo(tblClass2);
        tblClass2.setId(2L);
        assertThat(tblClass1).isNotEqualTo(tblClass2);
        tblClass1.setId(null);
        assertThat(tblClass1).isNotEqualTo(tblClass2);
    }
}
