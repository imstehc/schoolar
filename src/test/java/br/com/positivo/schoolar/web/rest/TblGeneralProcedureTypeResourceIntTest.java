package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblGeneralProcedureType;
import br.com.positivo.schoolar.repository.TblGeneralProcedureTypeRepository;
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
 * Test class for the TblGeneralProcedureTypeResource REST controller.
 *
 * @see TblGeneralProcedureTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblGeneralProcedureTypeResourceIntTest {

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblGeneralProcedureTypeRepository tblGeneralProcedureTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblGeneralProcedureTypeMockMvc;

    private TblGeneralProcedureType tblGeneralProcedureType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblGeneralProcedureTypeResource tblGeneralProcedureTypeResource = new TblGeneralProcedureTypeResource(tblGeneralProcedureTypeRepository);
        this.restTblGeneralProcedureTypeMockMvc = MockMvcBuilders.standaloneSetup(tblGeneralProcedureTypeResource)
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
    public static TblGeneralProcedureType createEntity(EntityManager em) {
        TblGeneralProcedureType tblGeneralProcedureType = new TblGeneralProcedureType()
            .strName(DEFAULT_STR_NAME)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblGeneralProcedureType;
    }

    @Before
    public void initTest() {
        tblGeneralProcedureType = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblGeneralProcedureType() throws Exception {
        int databaseSizeBeforeCreate = tblGeneralProcedureTypeRepository.findAll().size();

        // Create the TblGeneralProcedureType
        restTblGeneralProcedureTypeMockMvc.perform(post("/api/tbl-general-procedure-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGeneralProcedureType)))
            .andExpect(status().isCreated());

        // Validate the TblGeneralProcedureType in the database
        List<TblGeneralProcedureType> tblGeneralProcedureTypeList = tblGeneralProcedureTypeRepository.findAll();
        assertThat(tblGeneralProcedureTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TblGeneralProcedureType testTblGeneralProcedureType = tblGeneralProcedureTypeList.get(tblGeneralProcedureTypeList.size() - 1);
        assertThat(testTblGeneralProcedureType.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblGeneralProcedureType.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblGeneralProcedureTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblGeneralProcedureTypeRepository.findAll().size();

        // Create the TblGeneralProcedureType with an existing ID
        tblGeneralProcedureType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblGeneralProcedureTypeMockMvc.perform(post("/api/tbl-general-procedure-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGeneralProcedureType)))
            .andExpect(status().isBadRequest());

        // Validate the TblGeneralProcedureType in the database
        List<TblGeneralProcedureType> tblGeneralProcedureTypeList = tblGeneralProcedureTypeRepository.findAll();
        assertThat(tblGeneralProcedureTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblGeneralProcedureTypeRepository.findAll().size();
        // set the field null
        tblGeneralProcedureType.setStrName(null);

        // Create the TblGeneralProcedureType, which fails.

        restTblGeneralProcedureTypeMockMvc.perform(post("/api/tbl-general-procedure-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGeneralProcedureType)))
            .andExpect(status().isBadRequest());

        List<TblGeneralProcedureType> tblGeneralProcedureTypeList = tblGeneralProcedureTypeRepository.findAll();
        assertThat(tblGeneralProcedureTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblGeneralProcedureTypes() throws Exception {
        // Initialize the database
        tblGeneralProcedureTypeRepository.saveAndFlush(tblGeneralProcedureType);

        // Get all the tblGeneralProcedureTypeList
        restTblGeneralProcedureTypeMockMvc.perform(get("/api/tbl-general-procedure-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblGeneralProcedureType.getId().intValue())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblGeneralProcedureType() throws Exception {
        // Initialize the database
        tblGeneralProcedureTypeRepository.saveAndFlush(tblGeneralProcedureType);

        // Get the tblGeneralProcedureType
        restTblGeneralProcedureTypeMockMvc.perform(get("/api/tbl-general-procedure-types/{id}", tblGeneralProcedureType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblGeneralProcedureType.getId().intValue()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblGeneralProcedureType() throws Exception {
        // Get the tblGeneralProcedureType
        restTblGeneralProcedureTypeMockMvc.perform(get("/api/tbl-general-procedure-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblGeneralProcedureType() throws Exception {
        // Initialize the database
        tblGeneralProcedureTypeRepository.saveAndFlush(tblGeneralProcedureType);
        int databaseSizeBeforeUpdate = tblGeneralProcedureTypeRepository.findAll().size();

        // Update the tblGeneralProcedureType
        TblGeneralProcedureType updatedTblGeneralProcedureType = tblGeneralProcedureTypeRepository.findOne(tblGeneralProcedureType.getId());
        // Disconnect from session so that the updates on updatedTblGeneralProcedureType are not directly saved in db
        em.detach(updatedTblGeneralProcedureType);
        updatedTblGeneralProcedureType
            .strName(UPDATED_STR_NAME)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblGeneralProcedureTypeMockMvc.perform(put("/api/tbl-general-procedure-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblGeneralProcedureType)))
            .andExpect(status().isOk());

        // Validate the TblGeneralProcedureType in the database
        List<TblGeneralProcedureType> tblGeneralProcedureTypeList = tblGeneralProcedureTypeRepository.findAll();
        assertThat(tblGeneralProcedureTypeList).hasSize(databaseSizeBeforeUpdate);
        TblGeneralProcedureType testTblGeneralProcedureType = tblGeneralProcedureTypeList.get(tblGeneralProcedureTypeList.size() - 1);
        assertThat(testTblGeneralProcedureType.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblGeneralProcedureType.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblGeneralProcedureType() throws Exception {
        int databaseSizeBeforeUpdate = tblGeneralProcedureTypeRepository.findAll().size();

        // Create the TblGeneralProcedureType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblGeneralProcedureTypeMockMvc.perform(put("/api/tbl-general-procedure-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGeneralProcedureType)))
            .andExpect(status().isCreated());

        // Validate the TblGeneralProcedureType in the database
        List<TblGeneralProcedureType> tblGeneralProcedureTypeList = tblGeneralProcedureTypeRepository.findAll();
        assertThat(tblGeneralProcedureTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblGeneralProcedureType() throws Exception {
        // Initialize the database
        tblGeneralProcedureTypeRepository.saveAndFlush(tblGeneralProcedureType);
        int databaseSizeBeforeDelete = tblGeneralProcedureTypeRepository.findAll().size();

        // Get the tblGeneralProcedureType
        restTblGeneralProcedureTypeMockMvc.perform(delete("/api/tbl-general-procedure-types/{id}", tblGeneralProcedureType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblGeneralProcedureType> tblGeneralProcedureTypeList = tblGeneralProcedureTypeRepository.findAll();
        assertThat(tblGeneralProcedureTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblGeneralProcedureType.class);
        TblGeneralProcedureType tblGeneralProcedureType1 = new TblGeneralProcedureType();
        tblGeneralProcedureType1.setId(1L);
        TblGeneralProcedureType tblGeneralProcedureType2 = new TblGeneralProcedureType();
        tblGeneralProcedureType2.setId(tblGeneralProcedureType1.getId());
        assertThat(tblGeneralProcedureType1).isEqualTo(tblGeneralProcedureType2);
        tblGeneralProcedureType2.setId(2L);
        assertThat(tblGeneralProcedureType1).isNotEqualTo(tblGeneralProcedureType2);
        tblGeneralProcedureType1.setId(null);
        assertThat(tblGeneralProcedureType1).isNotEqualTo(tblGeneralProcedureType2);
    }
}
