package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblSchoolSetting;
import br.com.positivo.schoolar.repository.TblSchoolSettingRepository;
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
 * Test class for the TblSchoolSettingResource REST controller.
 *
 * @see TblSchoolSettingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblSchoolSettingResourceIntTest {

    private static final Integer DEFAULT_INT_YEAR = 1;
    private static final Integer UPDATED_INT_YEAR = 2;

    private static final Integer DEFAULT_INT_ENABLED = 1;
    private static final Integer UPDATED_INT_ENABLED = 2;

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblSchoolSettingRepository tblSchoolSettingRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblSchoolSettingMockMvc;

    private TblSchoolSetting tblSchoolSetting;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblSchoolSettingResource tblSchoolSettingResource = new TblSchoolSettingResource(tblSchoolSettingRepository);
        this.restTblSchoolSettingMockMvc = MockMvcBuilders.standaloneSetup(tblSchoolSettingResource)
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
    public static TblSchoolSetting createEntity(EntityManager em) {
        TblSchoolSetting tblSchoolSetting = new TblSchoolSetting()
            .intYear(DEFAULT_INT_YEAR)
            .intEnabled(DEFAULT_INT_ENABLED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblSchoolSetting;
    }

    @Before
    public void initTest() {
        tblSchoolSetting = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblSchoolSetting() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolSettingRepository.findAll().size();

        // Create the TblSchoolSetting
        restTblSchoolSettingMockMvc.perform(post("/api/tbl-school-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolSetting)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolSetting in the database
        List<TblSchoolSetting> tblSchoolSettingList = tblSchoolSettingRepository.findAll();
        assertThat(tblSchoolSettingList).hasSize(databaseSizeBeforeCreate + 1);
        TblSchoolSetting testTblSchoolSetting = tblSchoolSettingList.get(tblSchoolSettingList.size() - 1);
        assertThat(testTblSchoolSetting.getIntYear()).isEqualTo(DEFAULT_INT_YEAR);
        assertThat(testTblSchoolSetting.getIntEnabled()).isEqualTo(DEFAULT_INT_ENABLED);
        assertThat(testTblSchoolSetting.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblSchoolSettingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolSettingRepository.findAll().size();

        // Create the TblSchoolSetting with an existing ID
        tblSchoolSetting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblSchoolSettingMockMvc.perform(post("/api/tbl-school-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolSetting)))
            .andExpect(status().isBadRequest());

        // Validate the TblSchoolSetting in the database
        List<TblSchoolSetting> tblSchoolSettingList = tblSchoolSettingRepository.findAll();
        assertThat(tblSchoolSettingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblSchoolSettings() throws Exception {
        // Initialize the database
        tblSchoolSettingRepository.saveAndFlush(tblSchoolSetting);

        // Get all the tblSchoolSettingList
        restTblSchoolSettingMockMvc.perform(get("/api/tbl-school-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblSchoolSetting.getId().intValue())))
            .andExpect(jsonPath("$.[*].intYear").value(hasItem(DEFAULT_INT_YEAR)))
            .andExpect(jsonPath("$.[*].intEnabled").value(hasItem(DEFAULT_INT_ENABLED)))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblSchoolSetting() throws Exception {
        // Initialize the database
        tblSchoolSettingRepository.saveAndFlush(tblSchoolSetting);

        // Get the tblSchoolSetting
        restTblSchoolSettingMockMvc.perform(get("/api/tbl-school-settings/{id}", tblSchoolSetting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblSchoolSetting.getId().intValue()))
            .andExpect(jsonPath("$.intYear").value(DEFAULT_INT_YEAR))
            .andExpect(jsonPath("$.intEnabled").value(DEFAULT_INT_ENABLED))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblSchoolSetting() throws Exception {
        // Get the tblSchoolSetting
        restTblSchoolSettingMockMvc.perform(get("/api/tbl-school-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblSchoolSetting() throws Exception {
        // Initialize the database
        tblSchoolSettingRepository.saveAndFlush(tblSchoolSetting);
        int databaseSizeBeforeUpdate = tblSchoolSettingRepository.findAll().size();

        // Update the tblSchoolSetting
        TblSchoolSetting updatedTblSchoolSetting = tblSchoolSettingRepository.findOne(tblSchoolSetting.getId());
        // Disconnect from session so that the updates on updatedTblSchoolSetting are not directly saved in db
        em.detach(updatedTblSchoolSetting);
        updatedTblSchoolSetting
            .intYear(UPDATED_INT_YEAR)
            .intEnabled(UPDATED_INT_ENABLED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblSchoolSettingMockMvc.perform(put("/api/tbl-school-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblSchoolSetting)))
            .andExpect(status().isOk());

        // Validate the TblSchoolSetting in the database
        List<TblSchoolSetting> tblSchoolSettingList = tblSchoolSettingRepository.findAll();
        assertThat(tblSchoolSettingList).hasSize(databaseSizeBeforeUpdate);
        TblSchoolSetting testTblSchoolSetting = tblSchoolSettingList.get(tblSchoolSettingList.size() - 1);
        assertThat(testTblSchoolSetting.getIntYear()).isEqualTo(UPDATED_INT_YEAR);
        assertThat(testTblSchoolSetting.getIntEnabled()).isEqualTo(UPDATED_INT_ENABLED);
        assertThat(testTblSchoolSetting.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblSchoolSetting() throws Exception {
        int databaseSizeBeforeUpdate = tblSchoolSettingRepository.findAll().size();

        // Create the TblSchoolSetting

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblSchoolSettingMockMvc.perform(put("/api/tbl-school-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolSetting)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolSetting in the database
        List<TblSchoolSetting> tblSchoolSettingList = tblSchoolSettingRepository.findAll();
        assertThat(tblSchoolSettingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblSchoolSetting() throws Exception {
        // Initialize the database
        tblSchoolSettingRepository.saveAndFlush(tblSchoolSetting);
        int databaseSizeBeforeDelete = tblSchoolSettingRepository.findAll().size();

        // Get the tblSchoolSetting
        restTblSchoolSettingMockMvc.perform(delete("/api/tbl-school-settings/{id}", tblSchoolSetting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblSchoolSetting> tblSchoolSettingList = tblSchoolSettingRepository.findAll();
        assertThat(tblSchoolSettingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblSchoolSetting.class);
        TblSchoolSetting tblSchoolSetting1 = new TblSchoolSetting();
        tblSchoolSetting1.setId(1L);
        TblSchoolSetting tblSchoolSetting2 = new TblSchoolSetting();
        tblSchoolSetting2.setId(tblSchoolSetting1.getId());
        assertThat(tblSchoolSetting1).isEqualTo(tblSchoolSetting2);
        tblSchoolSetting2.setId(2L);
        assertThat(tblSchoolSetting1).isNotEqualTo(tblSchoolSetting2);
        tblSchoolSetting1.setId(null);
        assertThat(tblSchoolSetting1).isNotEqualTo(tblSchoolSetting2);
    }
}
