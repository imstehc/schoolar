package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblAuthenticate;
import br.com.positivo.schoolar.repository.TblAuthenticateRepository;
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
 * Test class for the TblAuthenticateResource REST controller.
 *
 * @see TblAuthenticateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblAuthenticateResourceIntTest {

    private static final Instant DEFAULT_DTM_TIME_STAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_TIME_STAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblAuthenticateRepository tblAuthenticateRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblAuthenticateMockMvc;

    private TblAuthenticate tblAuthenticate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblAuthenticateResource tblAuthenticateResource = new TblAuthenticateResource(tblAuthenticateRepository);
        this.restTblAuthenticateMockMvc = MockMvcBuilders.standaloneSetup(tblAuthenticateResource)
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
    public static TblAuthenticate createEntity(EntityManager em) {
        TblAuthenticate tblAuthenticate = new TblAuthenticate()
            .dtmTimeStamp(DEFAULT_DTM_TIME_STAMP);
        return tblAuthenticate;
    }

    @Before
    public void initTest() {
        tblAuthenticate = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblAuthenticate() throws Exception {
        int databaseSizeBeforeCreate = tblAuthenticateRepository.findAll().size();

        // Create the TblAuthenticate
        restTblAuthenticateMockMvc.perform(post("/api/tbl-authenticates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAuthenticate)))
            .andExpect(status().isCreated());

        // Validate the TblAuthenticate in the database
        List<TblAuthenticate> tblAuthenticateList = tblAuthenticateRepository.findAll();
        assertThat(tblAuthenticateList).hasSize(databaseSizeBeforeCreate + 1);
        TblAuthenticate testTblAuthenticate = tblAuthenticateList.get(tblAuthenticateList.size() - 1);
        assertThat(testTblAuthenticate.getDtmTimeStamp()).isEqualTo(DEFAULT_DTM_TIME_STAMP);
    }

    @Test
    @Transactional
    public void createTblAuthenticateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblAuthenticateRepository.findAll().size();

        // Create the TblAuthenticate with an existing ID
        tblAuthenticate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblAuthenticateMockMvc.perform(post("/api/tbl-authenticates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAuthenticate)))
            .andExpect(status().isBadRequest());

        // Validate the TblAuthenticate in the database
        List<TblAuthenticate> tblAuthenticateList = tblAuthenticateRepository.findAll();
        assertThat(tblAuthenticateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTblAuthenticates() throws Exception {
        // Initialize the database
        tblAuthenticateRepository.saveAndFlush(tblAuthenticate);

        // Get all the tblAuthenticateList
        restTblAuthenticateMockMvc.perform(get("/api/tbl-authenticates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblAuthenticate.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmTimeStamp").value(hasItem(DEFAULT_DTM_TIME_STAMP.toString())));
    }

    @Test
    @Transactional
    public void getTblAuthenticate() throws Exception {
        // Initialize the database
        tblAuthenticateRepository.saveAndFlush(tblAuthenticate);

        // Get the tblAuthenticate
        restTblAuthenticateMockMvc.perform(get("/api/tbl-authenticates/{id}", tblAuthenticate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblAuthenticate.getId().intValue()))
            .andExpect(jsonPath("$.dtmTimeStamp").value(DEFAULT_DTM_TIME_STAMP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblAuthenticate() throws Exception {
        // Get the tblAuthenticate
        restTblAuthenticateMockMvc.perform(get("/api/tbl-authenticates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblAuthenticate() throws Exception {
        // Initialize the database
        tblAuthenticateRepository.saveAndFlush(tblAuthenticate);
        int databaseSizeBeforeUpdate = tblAuthenticateRepository.findAll().size();

        // Update the tblAuthenticate
        TblAuthenticate updatedTblAuthenticate = tblAuthenticateRepository.findOne(tblAuthenticate.getId());
        // Disconnect from session so that the updates on updatedTblAuthenticate are not directly saved in db
        em.detach(updatedTblAuthenticate);
        updatedTblAuthenticate
            .dtmTimeStamp(UPDATED_DTM_TIME_STAMP);

        restTblAuthenticateMockMvc.perform(put("/api/tbl-authenticates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblAuthenticate)))
            .andExpect(status().isOk());

        // Validate the TblAuthenticate in the database
        List<TblAuthenticate> tblAuthenticateList = tblAuthenticateRepository.findAll();
        assertThat(tblAuthenticateList).hasSize(databaseSizeBeforeUpdate);
        TblAuthenticate testTblAuthenticate = tblAuthenticateList.get(tblAuthenticateList.size() - 1);
        assertThat(testTblAuthenticate.getDtmTimeStamp()).isEqualTo(UPDATED_DTM_TIME_STAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingTblAuthenticate() throws Exception {
        int databaseSizeBeforeUpdate = tblAuthenticateRepository.findAll().size();

        // Create the TblAuthenticate

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblAuthenticateMockMvc.perform(put("/api/tbl-authenticates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblAuthenticate)))
            .andExpect(status().isCreated());

        // Validate the TblAuthenticate in the database
        List<TblAuthenticate> tblAuthenticateList = tblAuthenticateRepository.findAll();
        assertThat(tblAuthenticateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblAuthenticate() throws Exception {
        // Initialize the database
        tblAuthenticateRepository.saveAndFlush(tblAuthenticate);
        int databaseSizeBeforeDelete = tblAuthenticateRepository.findAll().size();

        // Get the tblAuthenticate
        restTblAuthenticateMockMvc.perform(delete("/api/tbl-authenticates/{id}", tblAuthenticate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblAuthenticate> tblAuthenticateList = tblAuthenticateRepository.findAll();
        assertThat(tblAuthenticateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblAuthenticate.class);
        TblAuthenticate tblAuthenticate1 = new TblAuthenticate();
        tblAuthenticate1.setId(1L);
        TblAuthenticate tblAuthenticate2 = new TblAuthenticate();
        tblAuthenticate2.setId(tblAuthenticate1.getId());
        assertThat(tblAuthenticate1).isEqualTo(tblAuthenticate2);
        tblAuthenticate2.setId(2L);
        assertThat(tblAuthenticate1).isNotEqualTo(tblAuthenticate2);
        tblAuthenticate1.setId(null);
        assertThat(tblAuthenticate1).isNotEqualTo(tblAuthenticate2);
    }
}
