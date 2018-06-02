package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblGuardianType;
import br.com.positivo.schoolar.repository.TblGuardianTypeRepository;
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
 * Test class for the TblGuardianTypeResource REST controller.
 *
 * @see TblGuardianTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblGuardianTypeResourceIntTest {

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_STR_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblGuardianTypeRepository tblGuardianTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblGuardianTypeMockMvc;

    private TblGuardianType tblGuardianType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblGuardianTypeResource tblGuardianTypeResource = new TblGuardianTypeResource(tblGuardianTypeRepository);
        this.restTblGuardianTypeMockMvc = MockMvcBuilders.standaloneSetup(tblGuardianTypeResource)
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
    public static TblGuardianType createEntity(EntityManager em) {
        TblGuardianType tblGuardianType = new TblGuardianType()
            .strName(DEFAULT_STR_NAME)
            .strDescription(DEFAULT_STR_DESCRIPTION)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblGuardianType;
    }

    @Before
    public void initTest() {
        tblGuardianType = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblGuardianType() throws Exception {
        int databaseSizeBeforeCreate = tblGuardianTypeRepository.findAll().size();

        // Create the TblGuardianType
        restTblGuardianTypeMockMvc.perform(post("/api/tbl-guardian-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGuardianType)))
            .andExpect(status().isCreated());

        // Validate the TblGuardianType in the database
        List<TblGuardianType> tblGuardianTypeList = tblGuardianTypeRepository.findAll();
        assertThat(tblGuardianTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TblGuardianType testTblGuardianType = tblGuardianTypeList.get(tblGuardianTypeList.size() - 1);
        assertThat(testTblGuardianType.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblGuardianType.getStrDescription()).isEqualTo(DEFAULT_STR_DESCRIPTION);
        assertThat(testTblGuardianType.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblGuardianTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblGuardianTypeRepository.findAll().size();

        // Create the TblGuardianType with an existing ID
        tblGuardianType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblGuardianTypeMockMvc.perform(post("/api/tbl-guardian-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGuardianType)))
            .andExpect(status().isBadRequest());

        // Validate the TblGuardianType in the database
        List<TblGuardianType> tblGuardianTypeList = tblGuardianTypeRepository.findAll();
        assertThat(tblGuardianTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblGuardianTypes() throws Exception {
        // Initialize the database
        tblGuardianTypeRepository.saveAndFlush(tblGuardianType);

        // Get all the tblGuardianTypeList
        restTblGuardianTypeMockMvc.perform(get("/api/tbl-guardian-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblGuardianType.getId().intValue())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].strDescription").value(hasItem(DEFAULT_STR_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblGuardianType() throws Exception {
        // Initialize the database
        tblGuardianTypeRepository.saveAndFlush(tblGuardianType);

        // Get the tblGuardianType
        restTblGuardianTypeMockMvc.perform(get("/api/tbl-guardian-types/{id}", tblGuardianType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblGuardianType.getId().intValue()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.strDescription").value(DEFAULT_STR_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblGuardianType() throws Exception {
        // Get the tblGuardianType
        restTblGuardianTypeMockMvc.perform(get("/api/tbl-guardian-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblGuardianType() throws Exception {
        // Initialize the database
        tblGuardianTypeRepository.saveAndFlush(tblGuardianType);
        int databaseSizeBeforeUpdate = tblGuardianTypeRepository.findAll().size();

        // Update the tblGuardianType
        TblGuardianType updatedTblGuardianType = tblGuardianTypeRepository.findOne(tblGuardianType.getId());
        // Disconnect from session so that the updates on updatedTblGuardianType are not directly saved in db
        em.detach(updatedTblGuardianType);
        updatedTblGuardianType
            .strName(UPDATED_STR_NAME)
            .strDescription(UPDATED_STR_DESCRIPTION)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblGuardianTypeMockMvc.perform(put("/api/tbl-guardian-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblGuardianType)))
            .andExpect(status().isOk());

        // Validate the TblGuardianType in the database
        List<TblGuardianType> tblGuardianTypeList = tblGuardianTypeRepository.findAll();
        assertThat(tblGuardianTypeList).hasSize(databaseSizeBeforeUpdate);
        TblGuardianType testTblGuardianType = tblGuardianTypeList.get(tblGuardianTypeList.size() - 1);
        assertThat(testTblGuardianType.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblGuardianType.getStrDescription()).isEqualTo(UPDATED_STR_DESCRIPTION);
        assertThat(testTblGuardianType.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblGuardianType() throws Exception {
        int databaseSizeBeforeUpdate = tblGuardianTypeRepository.findAll().size();

        // Create the TblGuardianType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblGuardianTypeMockMvc.perform(put("/api/tbl-guardian-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGuardianType)))
            .andExpect(status().isCreated());

        // Validate the TblGuardianType in the database
        List<TblGuardianType> tblGuardianTypeList = tblGuardianTypeRepository.findAll();
        assertThat(tblGuardianTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblGuardianType() throws Exception {
        // Initialize the database
        tblGuardianTypeRepository.saveAndFlush(tblGuardianType);
        int databaseSizeBeforeDelete = tblGuardianTypeRepository.findAll().size();

        // Get the tblGuardianType
        restTblGuardianTypeMockMvc.perform(delete("/api/tbl-guardian-types/{id}", tblGuardianType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblGuardianType> tblGuardianTypeList = tblGuardianTypeRepository.findAll();
        assertThat(tblGuardianTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblGuardianType.class);
        TblGuardianType tblGuardianType1 = new TblGuardianType();
        tblGuardianType1.setId(1L);
        TblGuardianType tblGuardianType2 = new TblGuardianType();
        tblGuardianType2.setId(tblGuardianType1.getId());
        assertThat(tblGuardianType1).isEqualTo(tblGuardianType2);
        tblGuardianType2.setId(2L);
        assertThat(tblGuardianType1).isNotEqualTo(tblGuardianType2);
        tblGuardianType1.setId(null);
        assertThat(tblGuardianType1).isNotEqualTo(tblGuardianType2);
    }
}
