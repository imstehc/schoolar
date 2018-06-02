package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblGuardian;
import br.com.positivo.schoolar.repository.TblGuardianRepository;
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
 * Test class for the TblGuardianResource REST controller.
 *
 * @see TblGuardianResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblGuardianResourceIntTest {

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblGuardianRepository tblGuardianRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblGuardianMockMvc;

    private TblGuardian tblGuardian;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblGuardianResource tblGuardianResource = new TblGuardianResource(tblGuardianRepository);
        this.restTblGuardianMockMvc = MockMvcBuilders.standaloneSetup(tblGuardianResource)
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
    public static TblGuardian createEntity(EntityManager em) {
        TblGuardian tblGuardian = new TblGuardian()
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblGuardian;
    }

    @Before
    public void initTest() {
        tblGuardian = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblGuardian() throws Exception {
        int databaseSizeBeforeCreate = tblGuardianRepository.findAll().size();

        // Create the TblGuardian
        restTblGuardianMockMvc.perform(post("/api/tbl-guardians")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGuardian)))
            .andExpect(status().isCreated());

        // Validate the TblGuardian in the database
        List<TblGuardian> tblGuardianList = tblGuardianRepository.findAll();
        assertThat(tblGuardianList).hasSize(databaseSizeBeforeCreate + 1);
        TblGuardian testTblGuardian = tblGuardianList.get(tblGuardianList.size() - 1);
        assertThat(testTblGuardian.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblGuardianWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblGuardianRepository.findAll().size();

        // Create the TblGuardian with an existing ID


        // An entity with an existing ID cannot be created, so this API call must fail
        restTblGuardianMockMvc.perform(post("/api/tbl-guardians")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGuardian)))
            .andExpect(status().isBadRequest());

        // Validate the TblGuardian in the database
        List<TblGuardian> tblGuardianList = tblGuardianRepository.findAll();
        assertThat(tblGuardianList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblGuardians() throws Exception {
        // Initialize the database
        tblGuardianRepository.saveAndFlush(tblGuardian);

        // Get all the tblGuardianList
        restTblGuardianMockMvc.perform(get("/api/tbl-guardians?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblGuardian.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblGuardian() throws Exception {
        // Initialize the database
        tblGuardianRepository.saveAndFlush(tblGuardian);

        // Get the tblGuardian
        restTblGuardianMockMvc.perform(get("/api/tbl-guardians/{id}", tblGuardian.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblGuardian.getId().intValue()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblGuardian() throws Exception {
        // Get the tblGuardian
        restTblGuardianMockMvc.perform(get("/api/tbl-guardians/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblGuardian() throws Exception {
        // Initialize the database
        tblGuardianRepository.saveAndFlush(tblGuardian);
        int databaseSizeBeforeUpdate = tblGuardianRepository.findAll().size();

        // Update the tblGuardian
        TblGuardian updatedTblGuardian = tblGuardianRepository.findOne(tblGuardian.getId());
        // Disconnect from session so that the updates on updatedTblGuardian are not directly saved in db
        em.detach(updatedTblGuardian);
        updatedTblGuardian
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblGuardianMockMvc.perform(put("/api/tbl-guardians")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblGuardian)))
            .andExpect(status().isOk());

        // Validate the TblGuardian in the database
        List<TblGuardian> tblGuardianList = tblGuardianRepository.findAll();
        assertThat(tblGuardianList).hasSize(databaseSizeBeforeUpdate);
        TblGuardian testTblGuardian = tblGuardianList.get(tblGuardianList.size() - 1);
        assertThat(testTblGuardian.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblGuardian() throws Exception {
        int databaseSizeBeforeUpdate = tblGuardianRepository.findAll().size();

        // Create the TblGuardian

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblGuardianMockMvc.perform(put("/api/tbl-guardians")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblGuardian)))
            .andExpect(status().isCreated());

        // Validate the TblGuardian in the database
        List<TblGuardian> tblGuardianList = tblGuardianRepository.findAll();
        assertThat(tblGuardianList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblGuardian() throws Exception {
        // Initialize the database
        tblGuardianRepository.saveAndFlush(tblGuardian);
        int databaseSizeBeforeDelete = tblGuardianRepository.findAll().size();

        // Get the tblGuardian
        restTblGuardianMockMvc.perform(delete("/api/tbl-guardians/{id}", tblGuardian.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblGuardian> tblGuardianList = tblGuardianRepository.findAll();
        assertThat(tblGuardianList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblGuardian.class);
        TblGuardian tblGuardian1 = new TblGuardian();
        tblGuardian1.setId(1L);
        TblGuardian tblGuardian2 = new TblGuardian();
        tblGuardian2.setId(tblGuardian1.getId());
        assertThat(tblGuardian1).isEqualTo(tblGuardian2);
        tblGuardian2.setId(2L);
        assertThat(tblGuardian1).isNotEqualTo(tblGuardian2);
        tblGuardian1.setId(null);
        assertThat(tblGuardian1).isNotEqualTo(tblGuardian2);
    }
}
