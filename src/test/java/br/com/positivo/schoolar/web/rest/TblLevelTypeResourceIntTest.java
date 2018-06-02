package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblLevelType;
import br.com.positivo.schoolar.repository.TblLevelTypeRepository;
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
 * Test class for the TblLevelTypeResource REST controller.
 *
 * @see TblLevelTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblLevelTypeResourceIntTest {

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_ABBREVIATION = "AAAAAAAAAA";
    private static final String UPDATED_STR_ABBREVIATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_INT_ORDER = 1;
    private static final Integer UPDATED_INT_ORDER = 2;

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblLevelTypeRepository tblLevelTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblLevelTypeMockMvc;

    private TblLevelType tblLevelType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblLevelTypeResource tblLevelTypeResource = new TblLevelTypeResource(tblLevelTypeRepository);
        this.restTblLevelTypeMockMvc = MockMvcBuilders.standaloneSetup(tblLevelTypeResource)
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
    public static TblLevelType createEntity(EntityManager em) {
        TblLevelType tblLevelType = new TblLevelType()
            .strName(DEFAULT_STR_NAME)
            .strAbbreviation(DEFAULT_STR_ABBREVIATION)
            .intOrder(DEFAULT_INT_ORDER)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblLevelType;
    }

    @Before
    public void initTest() {
        tblLevelType = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblLevelType() throws Exception {
        int databaseSizeBeforeCreate = tblLevelTypeRepository.findAll().size();

        // Create the TblLevelType
        restTblLevelTypeMockMvc.perform(post("/api/tbl-level-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblLevelType)))
            .andExpect(status().isCreated());

        // Validate the TblLevelType in the database
        List<TblLevelType> tblLevelTypeList = tblLevelTypeRepository.findAll();
        assertThat(tblLevelTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TblLevelType testTblLevelType = tblLevelTypeList.get(tblLevelTypeList.size() - 1);
        assertThat(testTblLevelType.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblLevelType.getStrAbbreviation()).isEqualTo(DEFAULT_STR_ABBREVIATION);
        assertThat(testTblLevelType.getIntOrder()).isEqualTo(DEFAULT_INT_ORDER);
        assertThat(testTblLevelType.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblLevelTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblLevelTypeRepository.findAll().size();

        // Create the TblLevelType with an existing ID
        tblLevelType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblLevelTypeMockMvc.perform(post("/api/tbl-level-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblLevelType)))
            .andExpect(status().isBadRequest());

        // Validate the TblLevelType in the database
        List<TblLevelType> tblLevelTypeList = tblLevelTypeRepository.findAll();
        assertThat(tblLevelTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblLevelTypes() throws Exception {
        // Initialize the database
        tblLevelTypeRepository.saveAndFlush(tblLevelType);

        // Get all the tblLevelTypeList
        restTblLevelTypeMockMvc.perform(get("/api/tbl-level-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblLevelType.getId().intValue())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].strAbbreviation").value(hasItem(DEFAULT_STR_ABBREVIATION.toString())))
            .andExpect(jsonPath("$.[*].intOrder").value(hasItem(DEFAULT_INT_ORDER)))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblLevelType() throws Exception {
        // Initialize the database
        tblLevelTypeRepository.saveAndFlush(tblLevelType);

        // Get the tblLevelType
        restTblLevelTypeMockMvc.perform(get("/api/tbl-level-types/{id}", tblLevelType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblLevelType.getId().intValue()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.strAbbreviation").value(DEFAULT_STR_ABBREVIATION.toString()))
            .andExpect(jsonPath("$.intOrder").value(DEFAULT_INT_ORDER))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblLevelType() throws Exception {
        // Get the tblLevelType
        restTblLevelTypeMockMvc.perform(get("/api/tbl-level-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblLevelType() throws Exception {
        // Initialize the database
        tblLevelTypeRepository.saveAndFlush(tblLevelType);
        int databaseSizeBeforeUpdate = tblLevelTypeRepository.findAll().size();

        // Update the tblLevelType
        TblLevelType updatedTblLevelType = tblLevelTypeRepository.findOne(tblLevelType.getId());
        // Disconnect from session so that the updates on updatedTblLevelType are not directly saved in db
        em.detach(updatedTblLevelType);
        updatedTblLevelType
            .strName(UPDATED_STR_NAME)
            .strAbbreviation(UPDATED_STR_ABBREVIATION)
            .intOrder(UPDATED_INT_ORDER)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblLevelTypeMockMvc.perform(put("/api/tbl-level-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblLevelType)))
            .andExpect(status().isOk());

        // Validate the TblLevelType in the database
        List<TblLevelType> tblLevelTypeList = tblLevelTypeRepository.findAll();
        assertThat(tblLevelTypeList).hasSize(databaseSizeBeforeUpdate);
        TblLevelType testTblLevelType = tblLevelTypeList.get(tblLevelTypeList.size() - 1);
        assertThat(testTblLevelType.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblLevelType.getStrAbbreviation()).isEqualTo(UPDATED_STR_ABBREVIATION);
        assertThat(testTblLevelType.getIntOrder()).isEqualTo(UPDATED_INT_ORDER);
        assertThat(testTblLevelType.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblLevelType() throws Exception {
        int databaseSizeBeforeUpdate = tblLevelTypeRepository.findAll().size();

        // Create the TblLevelType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblLevelTypeMockMvc.perform(put("/api/tbl-level-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblLevelType)))
            .andExpect(status().isCreated());

        // Validate the TblLevelType in the database
        List<TblLevelType> tblLevelTypeList = tblLevelTypeRepository.findAll();
        assertThat(tblLevelTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblLevelType() throws Exception {
        // Initialize the database
        tblLevelTypeRepository.saveAndFlush(tblLevelType);
        int databaseSizeBeforeDelete = tblLevelTypeRepository.findAll().size();

        // Get the tblLevelType
        restTblLevelTypeMockMvc.perform(delete("/api/tbl-level-types/{id}", tblLevelType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblLevelType> tblLevelTypeList = tblLevelTypeRepository.findAll();
        assertThat(tblLevelTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblLevelType.class);
        TblLevelType tblLevelType1 = new TblLevelType();
        tblLevelType1.setId(1L);
        TblLevelType tblLevelType2 = new TblLevelType();
        tblLevelType2.setId(tblLevelType1.getId());
        assertThat(tblLevelType1).isEqualTo(tblLevelType2);
        tblLevelType2.setId(2L);
        assertThat(tblLevelType1).isNotEqualTo(tblLevelType2);
        tblLevelType1.setId(null);
        assertThat(tblLevelType1).isNotEqualTo(tblLevelType2);
    }
}
