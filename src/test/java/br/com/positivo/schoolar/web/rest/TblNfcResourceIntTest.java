package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblNfc;
import br.com.positivo.schoolar.repository.TblNfcRepository;
import br.com.positivo.schoolar.repository.TblUserRepository;
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
 * Test class for the TblNfcResource REST controller.
 *
 * @see TblNfcResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblNfcResourceIntTest {

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblNfcRepository tblNfcRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblNfcMockMvc;

    private TblNfc tblNfc;

    private TblUserRepository tblUserRepository;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblNfcResource tblNfcResource = new TblNfcResource(tblNfcRepository, tblUserRepository);
        this.restTblNfcMockMvc = MockMvcBuilders.standaloneSetup(tblNfcResource)
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
    public static TblNfc createEntity(EntityManager em) {
        TblNfc tblNfc = new TblNfc()
            .strName(DEFAULT_STR_NAME)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblNfc;
    }

    @Before
    public void initTest() {
        tblNfc = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblNfc() throws Exception {
        int databaseSizeBeforeCreate = tblNfcRepository.findAll().size();

        // Create the TblNfc
        restTblNfcMockMvc.perform(post("/api/tbl-nfcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblNfc)))
            .andExpect(status().isCreated());

        // Validate the TblNfc in the database
        List<TblNfc> tblNfcList = tblNfcRepository.findAll();
        assertThat(tblNfcList).hasSize(databaseSizeBeforeCreate + 1);
        TblNfc testTblNfc = tblNfcList.get(tblNfcList.size() - 1);
        assertThat(testTblNfc.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblNfc.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblNfcWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblNfcRepository.findAll().size();

        // Create the TblNfc with an existing ID
        tblNfc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblNfcMockMvc.perform(post("/api/tbl-nfcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblNfc)))
            .andExpect(status().isBadRequest());

        // Validate the TblNfc in the database
        List<TblNfc> tblNfcList = tblNfcRepository.findAll();
        assertThat(tblNfcList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblNfcRepository.findAll().size();
        // set the field null
        tblNfc.setStrName(null);

        // Create the TblNfc, which fails.

        restTblNfcMockMvc.perform(post("/api/tbl-nfcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblNfc)))
            .andExpect(status().isBadRequest());

        List<TblNfc> tblNfcList = tblNfcRepository.findAll();
        assertThat(tblNfcList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblNfcs() throws Exception {
        // Initialize the database
        tblNfcRepository.saveAndFlush(tblNfc);

        // Get all the tblNfcList
        restTblNfcMockMvc.perform(get("/api/tbl-nfcs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblNfc.getId().intValue())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblNfc() throws Exception {
        // Initialize the database
        tblNfcRepository.saveAndFlush(tblNfc);

        // Get the tblNfc
        restTblNfcMockMvc.perform(get("/api/tbl-nfcs/{id}", tblNfc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblNfc.getId().intValue()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblNfc() throws Exception {
        // Get the tblNfc
        restTblNfcMockMvc.perform(get("/api/tbl-nfcs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblNfc() throws Exception {
        // Initialize the database
        tblNfcRepository.saveAndFlush(tblNfc);
        int databaseSizeBeforeUpdate = tblNfcRepository.findAll().size();

        // Update the tblNfc
        TblNfc updatedTblNfc = tblNfcRepository.findOne(tblNfc.getId());
        // Disconnect from session so that the updates on updatedTblNfc are not directly saved in db
        em.detach(updatedTblNfc);
        updatedTblNfc
            .strName(UPDATED_STR_NAME)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblNfcMockMvc.perform(put("/api/tbl-nfcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblNfc)))
            .andExpect(status().isOk());

        // Validate the TblNfc in the database
        List<TblNfc> tblNfcList = tblNfcRepository.findAll();
        assertThat(tblNfcList).hasSize(databaseSizeBeforeUpdate);
        TblNfc testTblNfc = tblNfcList.get(tblNfcList.size() - 1);
        assertThat(testTblNfc.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblNfc.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblNfc() throws Exception {
        int databaseSizeBeforeUpdate = tblNfcRepository.findAll().size();

        // Create the TblNfc

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblNfcMockMvc.perform(put("/api/tbl-nfcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblNfc)))
            .andExpect(status().isCreated());

        // Validate the TblNfc in the database
        List<TblNfc> tblNfcList = tblNfcRepository.findAll();
        assertThat(tblNfcList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblNfc() throws Exception {
        // Initialize the database
        tblNfcRepository.saveAndFlush(tblNfc);
        int databaseSizeBeforeDelete = tblNfcRepository.findAll().size();

        // Get the tblNfc
        restTblNfcMockMvc.perform(delete("/api/tbl-nfcs/{id}", tblNfc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblNfc> tblNfcList = tblNfcRepository.findAll();
        assertThat(tblNfcList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblNfc.class);
        TblNfc tblNfc1 = new TblNfc();
        tblNfc1.setId(1L);
        TblNfc tblNfc2 = new TblNfc();
        tblNfc2.setId(tblNfc1.getId());
        assertThat(tblNfc1).isEqualTo(tblNfc2);
        tblNfc2.setId(2L);
        assertThat(tblNfc1).isNotEqualTo(tblNfc2);
        tblNfc1.setId(null);
        assertThat(tblNfc1).isNotEqualTo(tblNfc2);
    }
}
