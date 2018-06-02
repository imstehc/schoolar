package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblShiftType;
import br.com.positivo.schoolar.repository.TblShiftTypeRepository;
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
 * Test class for the TblShiftTypeResource REST controller.
 *
 * @see TblShiftTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblShiftTypeResourceIntTest {

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblShiftTypeRepository tblShiftTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblShiftTypeMockMvc;

    private TblShiftType tblShiftType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblShiftTypeResource tblShiftTypeResource = new TblShiftTypeResource(tblShiftTypeRepository);
        this.restTblShiftTypeMockMvc = MockMvcBuilders.standaloneSetup(tblShiftTypeResource)
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
    public static TblShiftType createEntity(EntityManager em) {
        TblShiftType tblShiftType = new TblShiftType()
            .strName(DEFAULT_STR_NAME)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblShiftType;
    }

    @Before
    public void initTest() {
        tblShiftType = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblShiftType() throws Exception {
        int databaseSizeBeforeCreate = tblShiftTypeRepository.findAll().size();

        // Create the TblShiftType
        restTblShiftTypeMockMvc.perform(post("/api/tbl-shift-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblShiftType)))
            .andExpect(status().isCreated());

        // Validate the TblShiftType in the database
        List<TblShiftType> tblShiftTypeList = tblShiftTypeRepository.findAll();
        assertThat(tblShiftTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TblShiftType testTblShiftType = tblShiftTypeList.get(tblShiftTypeList.size() - 1);
        assertThat(testTblShiftType.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblShiftType.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblShiftTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblShiftTypeRepository.findAll().size();

        // Create the TblShiftType with an existing ID
        tblShiftType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblShiftTypeMockMvc.perform(post("/api/tbl-shift-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblShiftType)))
            .andExpect(status().isBadRequest());

        // Validate the TblShiftType in the database
        List<TblShiftType> tblShiftTypeList = tblShiftTypeRepository.findAll();
        assertThat(tblShiftTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblShiftTypes() throws Exception {
        // Initialize the database
        tblShiftTypeRepository.saveAndFlush(tblShiftType);

        // Get all the tblShiftTypeList
        restTblShiftTypeMockMvc.perform(get("/api/tbl-shift-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblShiftType.getId().intValue())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblShiftType() throws Exception {
        // Initialize the database
        tblShiftTypeRepository.saveAndFlush(tblShiftType);

        // Get the tblShiftType
        restTblShiftTypeMockMvc.perform(get("/api/tbl-shift-types/{id}", tblShiftType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblShiftType.getId().intValue()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblShiftType() throws Exception {
        // Get the tblShiftType
        restTblShiftTypeMockMvc.perform(get("/api/tbl-shift-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblShiftType() throws Exception {
        // Initialize the database
        tblShiftTypeRepository.saveAndFlush(tblShiftType);
        int databaseSizeBeforeUpdate = tblShiftTypeRepository.findAll().size();

        // Update the tblShiftType
        TblShiftType updatedTblShiftType = tblShiftTypeRepository.findOne(tblShiftType.getId());
        // Disconnect from session so that the updates on updatedTblShiftType are not directly saved in db
        em.detach(updatedTblShiftType);
        updatedTblShiftType
            .strName(UPDATED_STR_NAME)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblShiftTypeMockMvc.perform(put("/api/tbl-shift-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblShiftType)))
            .andExpect(status().isOk());

        // Validate the TblShiftType in the database
        List<TblShiftType> tblShiftTypeList = tblShiftTypeRepository.findAll();
        assertThat(tblShiftTypeList).hasSize(databaseSizeBeforeUpdate);
        TblShiftType testTblShiftType = tblShiftTypeList.get(tblShiftTypeList.size() - 1);
        assertThat(testTblShiftType.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblShiftType.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblShiftType() throws Exception {
        int databaseSizeBeforeUpdate = tblShiftTypeRepository.findAll().size();

        // Create the TblShiftType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblShiftTypeMockMvc.perform(put("/api/tbl-shift-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblShiftType)))
            .andExpect(status().isCreated());

        // Validate the TblShiftType in the database
        List<TblShiftType> tblShiftTypeList = tblShiftTypeRepository.findAll();
        assertThat(tblShiftTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblShiftType() throws Exception {
        // Initialize the database
        tblShiftTypeRepository.saveAndFlush(tblShiftType);
        int databaseSizeBeforeDelete = tblShiftTypeRepository.findAll().size();

        // Get the tblShiftType
        restTblShiftTypeMockMvc.perform(delete("/api/tbl-shift-types/{id}", tblShiftType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblShiftType> tblShiftTypeList = tblShiftTypeRepository.findAll();
        assertThat(tblShiftTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblShiftType.class);
        TblShiftType tblShiftType1 = new TblShiftType();
        tblShiftType1.setId(1L);
        TblShiftType tblShiftType2 = new TblShiftType();
        tblShiftType2.setId(tblShiftType1.getId());
        assertThat(tblShiftType1).isEqualTo(tblShiftType2);
        tblShiftType2.setId(2L);
        assertThat(tblShiftType1).isNotEqualTo(tblShiftType2);
        tblShiftType1.setId(null);
        assertThat(tblShiftType1).isNotEqualTo(tblShiftType2);
    }
}
