package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblDefaultSchoolSetting;
import br.com.positivo.schoolar.repository.TblDefaultSchoolSettingRepository;
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
 * Test class for the TblDefaultSchoolSettingResource REST controller.
 *
 * @see TblDefaultSchoolSettingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblDefaultSchoolSettingResourceIntTest {

    private static final Integer DEFAULT_INT_YEAR = 1;
    private static final Integer UPDATED_INT_YEAR = 2;

    private static final Integer DEFAULT_INT_ENABLED = 1;
    private static final Integer UPDATED_INT_ENABLED = 2;

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblDefaultSchoolSettingRepository tblDefaultSchoolSettingRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblDefaultSchoolSettingMockMvc;

    private TblDefaultSchoolSetting tblDefaultSchoolSetting;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblDefaultSchoolSettingResource tblDefaultSchoolSettingResource = new TblDefaultSchoolSettingResource(tblDefaultSchoolSettingRepository);
        this.restTblDefaultSchoolSettingMockMvc = MockMvcBuilders.standaloneSetup(tblDefaultSchoolSettingResource)
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
    public static TblDefaultSchoolSetting createEntity(EntityManager em) {
        TblDefaultSchoolSetting tblDefaultSchoolSetting = new TblDefaultSchoolSetting()
            .intYear(DEFAULT_INT_YEAR)
            .intEnabled(DEFAULT_INT_ENABLED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblDefaultSchoolSetting;
    }

    @Before
    public void initTest() {
        tblDefaultSchoolSetting = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblDefaultSchoolSetting() throws Exception {
        int databaseSizeBeforeCreate = tblDefaultSchoolSettingRepository.findAll().size();

        // Create the TblDefaultSchoolSetting
        restTblDefaultSchoolSettingMockMvc.perform(post("/api/tbl-default-school-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblDefaultSchoolSetting)))
            .andExpect(status().isCreated());

        // Validate the TblDefaultSchoolSetting in the database
        List<TblDefaultSchoolSetting> tblDefaultSchoolSettingList = tblDefaultSchoolSettingRepository.findAll();
        assertThat(tblDefaultSchoolSettingList).hasSize(databaseSizeBeforeCreate + 1);
        TblDefaultSchoolSetting testTblDefaultSchoolSetting = tblDefaultSchoolSettingList.get(tblDefaultSchoolSettingList.size() - 1);
        assertThat(testTblDefaultSchoolSetting.getIntYear()).isEqualTo(DEFAULT_INT_YEAR);
        assertThat(testTblDefaultSchoolSetting.getIntEnabled()).isEqualTo(DEFAULT_INT_ENABLED);
        assertThat(testTblDefaultSchoolSetting.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblDefaultSchoolSettingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblDefaultSchoolSettingRepository.findAll().size();

        // Create the TblDefaultSchoolSetting with an existing ID
        tblDefaultSchoolSetting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblDefaultSchoolSettingMockMvc.perform(post("/api/tbl-default-school-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblDefaultSchoolSetting)))
            .andExpect(status().isBadRequest());

        // Validate the TblDefaultSchoolSetting in the database
        List<TblDefaultSchoolSetting> tblDefaultSchoolSettingList = tblDefaultSchoolSettingRepository.findAll();
        assertThat(tblDefaultSchoolSettingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblDefaultSchoolSettings() throws Exception {
        // Initialize the database
        tblDefaultSchoolSettingRepository.saveAndFlush(tblDefaultSchoolSetting);

        // Get all the tblDefaultSchoolSettingList
        restTblDefaultSchoolSettingMockMvc.perform(get("/api/tbl-default-school-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblDefaultSchoolSetting.getId().intValue())))
            .andExpect(jsonPath("$.[*].intYear").value(hasItem(DEFAULT_INT_YEAR)))
            .andExpect(jsonPath("$.[*].intEnabled").value(hasItem(DEFAULT_INT_ENABLED)))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblDefaultSchoolSetting() throws Exception {
        // Initialize the database
        tblDefaultSchoolSettingRepository.saveAndFlush(tblDefaultSchoolSetting);

        // Get the tblDefaultSchoolSetting
        restTblDefaultSchoolSettingMockMvc.perform(get("/api/tbl-default-school-settings/{id}", tblDefaultSchoolSetting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblDefaultSchoolSetting.getId().intValue()))
            .andExpect(jsonPath("$.intYear").value(DEFAULT_INT_YEAR))
            .andExpect(jsonPath("$.intEnabled").value(DEFAULT_INT_ENABLED))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblDefaultSchoolSetting() throws Exception {
        // Get the tblDefaultSchoolSetting
        restTblDefaultSchoolSettingMockMvc.perform(get("/api/tbl-default-school-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblDefaultSchoolSetting() throws Exception {
        // Initialize the database
        tblDefaultSchoolSettingRepository.saveAndFlush(tblDefaultSchoolSetting);
        int databaseSizeBeforeUpdate = tblDefaultSchoolSettingRepository.findAll().size();

        // Update the tblDefaultSchoolSetting
        TblDefaultSchoolSetting updatedTblDefaultSchoolSetting = tblDefaultSchoolSettingRepository.findOne(tblDefaultSchoolSetting.getId());
        // Disconnect from session so that the updates on updatedTblDefaultSchoolSetting are not directly saved in db
        em.detach(updatedTblDefaultSchoolSetting);
        updatedTblDefaultSchoolSetting
            .intYear(UPDATED_INT_YEAR)
            .intEnabled(UPDATED_INT_ENABLED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblDefaultSchoolSettingMockMvc.perform(put("/api/tbl-default-school-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblDefaultSchoolSetting)))
            .andExpect(status().isOk());

        // Validate the TblDefaultSchoolSetting in the database
        List<TblDefaultSchoolSetting> tblDefaultSchoolSettingList = tblDefaultSchoolSettingRepository.findAll();
        assertThat(tblDefaultSchoolSettingList).hasSize(databaseSizeBeforeUpdate);
        TblDefaultSchoolSetting testTblDefaultSchoolSetting = tblDefaultSchoolSettingList.get(tblDefaultSchoolSettingList.size() - 1);
        assertThat(testTblDefaultSchoolSetting.getIntYear()).isEqualTo(UPDATED_INT_YEAR);
        assertThat(testTblDefaultSchoolSetting.getIntEnabled()).isEqualTo(UPDATED_INT_ENABLED);
        assertThat(testTblDefaultSchoolSetting.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblDefaultSchoolSetting() throws Exception {
        int databaseSizeBeforeUpdate = tblDefaultSchoolSettingRepository.findAll().size();

        // Create the TblDefaultSchoolSetting

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblDefaultSchoolSettingMockMvc.perform(put("/api/tbl-default-school-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblDefaultSchoolSetting)))
            .andExpect(status().isCreated());

        // Validate the TblDefaultSchoolSetting in the database
        List<TblDefaultSchoolSetting> tblDefaultSchoolSettingList = tblDefaultSchoolSettingRepository.findAll();
        assertThat(tblDefaultSchoolSettingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblDefaultSchoolSetting() throws Exception {
        // Initialize the database
        tblDefaultSchoolSettingRepository.saveAndFlush(tblDefaultSchoolSetting);
        int databaseSizeBeforeDelete = tblDefaultSchoolSettingRepository.findAll().size();

        // Get the tblDefaultSchoolSetting
        restTblDefaultSchoolSettingMockMvc.perform(delete("/api/tbl-default-school-settings/{id}", tblDefaultSchoolSetting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblDefaultSchoolSetting> tblDefaultSchoolSettingList = tblDefaultSchoolSettingRepository.findAll();
        assertThat(tblDefaultSchoolSettingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblDefaultSchoolSetting.class);
        TblDefaultSchoolSetting tblDefaultSchoolSetting1 = new TblDefaultSchoolSetting();
        tblDefaultSchoolSetting1.setId(1L);
        TblDefaultSchoolSetting tblDefaultSchoolSetting2 = new TblDefaultSchoolSetting();
        tblDefaultSchoolSetting2.setId(tblDefaultSchoolSetting1.getId());
        assertThat(tblDefaultSchoolSetting1).isEqualTo(tblDefaultSchoolSetting2);
        tblDefaultSchoolSetting2.setId(2L);
        assertThat(tblDefaultSchoolSetting1).isNotEqualTo(tblDefaultSchoolSetting2);
        tblDefaultSchoolSetting1.setId(null);
        assertThat(tblDefaultSchoolSetting1).isNotEqualTo(tblDefaultSchoolSetting2);
    }
}
