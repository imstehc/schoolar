package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblSchoolType;
import br.com.positivo.schoolar.repository.TblSchoolTypeRepository;
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
 * Test class for the TblSchoolTypeResource REST controller.
 *
 * @see TblSchoolTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblSchoolTypeResourceIntTest {

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblSchoolTypeRepository tblSchoolTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblSchoolTypeMockMvc;

    private TblSchoolType tblSchoolType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblSchoolTypeResource tblSchoolTypeResource = new TblSchoolTypeResource(tblSchoolTypeRepository);
        this.restTblSchoolTypeMockMvc = MockMvcBuilders.standaloneSetup(tblSchoolTypeResource)
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
    public static TblSchoolType createEntity(EntityManager em) {
        TblSchoolType tblSchoolType = new TblSchoolType()
            .strName(DEFAULT_STR_NAME)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblSchoolType;
    }

    @Before
    public void initTest() {
        tblSchoolType = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblSchoolType() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolTypeRepository.findAll().size();

        // Create the TblSchoolType
        restTblSchoolTypeMockMvc.perform(post("/api/tbl-school-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolType)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolType in the database
        List<TblSchoolType> tblSchoolTypeList = tblSchoolTypeRepository.findAll();
        assertThat(tblSchoolTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TblSchoolType testTblSchoolType = tblSchoolTypeList.get(tblSchoolTypeList.size() - 1);
        assertThat(testTblSchoolType.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblSchoolType.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblSchoolTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolTypeRepository.findAll().size();

        // Create the TblSchoolType with an existing ID
        tblSchoolType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblSchoolTypeMockMvc.perform(post("/api/tbl-school-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolType)))
            .andExpect(status().isBadRequest());

        // Validate the TblSchoolType in the database
        List<TblSchoolType> tblSchoolTypeList = tblSchoolTypeRepository.findAll();
        assertThat(tblSchoolTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolTypeRepository.findAll().size();
        // set the field null
        tblSchoolType.setStrName(null);

        // Create the TblSchoolType, which fails.

        restTblSchoolTypeMockMvc.perform(post("/api/tbl-school-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolType)))
            .andExpect(status().isBadRequest());

        List<TblSchoolType> tblSchoolTypeList = tblSchoolTypeRepository.findAll();
        assertThat(tblSchoolTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblSchoolTypes() throws Exception {
        // Initialize the database
        tblSchoolTypeRepository.saveAndFlush(tblSchoolType);

        // Get all the tblSchoolTypeList
        restTblSchoolTypeMockMvc.perform(get("/api/tbl-school-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblSchoolType.getId().intValue())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblSchoolType() throws Exception {
        // Initialize the database
        tblSchoolTypeRepository.saveAndFlush(tblSchoolType);

        // Get the tblSchoolType
        restTblSchoolTypeMockMvc.perform(get("/api/tbl-school-types/{id}", tblSchoolType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblSchoolType.getId().intValue()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblSchoolType() throws Exception {
        // Get the tblSchoolType
        restTblSchoolTypeMockMvc.perform(get("/api/tbl-school-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblSchoolType() throws Exception {
        // Initialize the database
        tblSchoolTypeRepository.saveAndFlush(tblSchoolType);
        int databaseSizeBeforeUpdate = tblSchoolTypeRepository.findAll().size();

        // Update the tblSchoolType
        TblSchoolType updatedTblSchoolType = tblSchoolTypeRepository.findOne(tblSchoolType.getId());
        // Disconnect from session so that the updates on updatedTblSchoolType are not directly saved in db
        em.detach(updatedTblSchoolType);
        updatedTblSchoolType
            .strName(UPDATED_STR_NAME)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblSchoolTypeMockMvc.perform(put("/api/tbl-school-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblSchoolType)))
            .andExpect(status().isOk());

        // Validate the TblSchoolType in the database
        List<TblSchoolType> tblSchoolTypeList = tblSchoolTypeRepository.findAll();
        assertThat(tblSchoolTypeList).hasSize(databaseSizeBeforeUpdate);
        TblSchoolType testTblSchoolType = tblSchoolTypeList.get(tblSchoolTypeList.size() - 1);
        assertThat(testTblSchoolType.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblSchoolType.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblSchoolType() throws Exception {
        int databaseSizeBeforeUpdate = tblSchoolTypeRepository.findAll().size();

        // Create the TblSchoolType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblSchoolTypeMockMvc.perform(put("/api/tbl-school-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolType)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolType in the database
        List<TblSchoolType> tblSchoolTypeList = tblSchoolTypeRepository.findAll();
        assertThat(tblSchoolTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblSchoolType() throws Exception {
        // Initialize the database
        tblSchoolTypeRepository.saveAndFlush(tblSchoolType);
        int databaseSizeBeforeDelete = tblSchoolTypeRepository.findAll().size();

        // Get the tblSchoolType
        restTblSchoolTypeMockMvc.perform(delete("/api/tbl-school-types/{id}", tblSchoolType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblSchoolType> tblSchoolTypeList = tblSchoolTypeRepository.findAll();
        assertThat(tblSchoolTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblSchoolType.class);
        TblSchoolType tblSchoolType1 = new TblSchoolType();
        tblSchoolType1.setId(1L);
        TblSchoolType tblSchoolType2 = new TblSchoolType();
        tblSchoolType2.setId(tblSchoolType1.getId());
        assertThat(tblSchoolType1).isEqualTo(tblSchoolType2);
        tblSchoolType2.setId(2L);
        assertThat(tblSchoolType1).isNotEqualTo(tblSchoolType2);
        tblSchoolType1.setId(null);
        assertThat(tblSchoolType1).isNotEqualTo(tblSchoolType2);
    }
}
