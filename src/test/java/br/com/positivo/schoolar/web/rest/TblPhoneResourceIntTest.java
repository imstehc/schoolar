package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblPhone;
import br.com.positivo.schoolar.repository.TblPhoneRepository;
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
 * Test class for the TblPhoneResource REST controller.
 *
 * @see TblPhoneResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblPhoneResourceIntTest {

    private static final String DEFAULT_STR_PREFIX = "AAA";
    private static final String UPDATED_STR_PREFIX = "BBB";

    private static final String DEFAULT_STR_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_STR_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_STR_PHONE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_STR_PHONE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_STR_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_STR_LABEL = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblPhoneRepository tblPhoneRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblPhoneMockMvc;

    private TblPhone tblPhone;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblPhoneResource tblPhoneResource = new TblPhoneResource(tblPhoneRepository);
        this.restTblPhoneMockMvc = MockMvcBuilders.standaloneSetup(tblPhoneResource)
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
    public static TblPhone createEntity(EntityManager em) {
        TblPhone tblPhone = new TblPhone()
            .strPrefix(DEFAULT_STR_PREFIX)
            .strNumber(DEFAULT_STR_NUMBER)
            .strPhoneType(DEFAULT_STR_PHONE_TYPE)
            .strLabel(DEFAULT_STR_LABEL)
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblPhone;
    }

    @Before
    public void initTest() {
        tblPhone = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblPhone() throws Exception {
        int databaseSizeBeforeCreate = tblPhoneRepository.findAll().size();

        // Create the TblPhone
        restTblPhoneMockMvc.perform(post("/api/tbl-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblPhone)))
            .andExpect(status().isCreated());

        // Validate the TblPhone in the database
        List<TblPhone> tblPhoneList = tblPhoneRepository.findAll();
        assertThat(tblPhoneList).hasSize(databaseSizeBeforeCreate + 1);
        TblPhone testTblPhone = tblPhoneList.get(tblPhoneList.size() - 1);
        assertThat(testTblPhone.getStrPrefix()).isEqualTo(DEFAULT_STR_PREFIX);
        assertThat(testTblPhone.getStrNumber()).isEqualTo(DEFAULT_STR_NUMBER);
        assertThat(testTblPhone.getStrPhoneType()).isEqualTo(DEFAULT_STR_PHONE_TYPE);
        assertThat(testTblPhone.getStrLabel()).isEqualTo(DEFAULT_STR_LABEL);
        assertThat(testTblPhone.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblPhone.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblPhone.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblPhoneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblPhoneRepository.findAll().size();

        // Create the TblPhone with an existing ID
        tblPhone.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblPhoneMockMvc.perform(post("/api/tbl-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblPhone)))
            .andExpect(status().isBadRequest());

        // Validate the TblPhone in the database
        List<TblPhone> tblPhoneList = tblPhoneRepository.findAll();
        assertThat(tblPhoneList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblPhoneRepository.findAll().size();
        // set the field null
        tblPhone.setStrNumber(null);

        // Create the TblPhone, which fails.

        restTblPhoneMockMvc.perform(post("/api/tbl-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblPhone)))
            .andExpect(status().isBadRequest());

        List<TblPhone> tblPhoneList = tblPhoneRepository.findAll();
        assertThat(tblPhoneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblPhoneRepository.findAll().size();
        // set the field null
        tblPhone.setStrLabel(null);

        // Create the TblPhone, which fails.

        restTblPhoneMockMvc.perform(post("/api/tbl-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblPhone)))
            .andExpect(status().isBadRequest());

        List<TblPhone> tblPhoneList = tblPhoneRepository.findAll();
        assertThat(tblPhoneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDtmCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblPhoneRepository.findAll().size();
        // set the field null
        tblPhone.setDtmCreated(null);

        // Create the TblPhone, which fails.

        restTblPhoneMockMvc.perform(post("/api/tbl-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblPhone)))
            .andExpect(status().isBadRequest());

        List<TblPhone> tblPhoneList = tblPhoneRepository.findAll();
        assertThat(tblPhoneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblPhoneRepository.findAll().size();
        // set the field null
        tblPhone.setIntExcluded(null);

        // Create the TblPhone, which fails.

        restTblPhoneMockMvc.perform(post("/api/tbl-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblPhone)))
            .andExpect(status().isBadRequest());

        List<TblPhone> tblPhoneList = tblPhoneRepository.findAll();
        assertThat(tblPhoneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblPhones() throws Exception {
        // Initialize the database
        tblPhoneRepository.saveAndFlush(tblPhone);

        // Get all the tblPhoneList
        restTblPhoneMockMvc.perform(get("/api/tbl-phones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblPhone.getId().intValue())))
            .andExpect(jsonPath("$.[*].strPrefix").value(hasItem(DEFAULT_STR_PREFIX.toString())))
            .andExpect(jsonPath("$.[*].strNumber").value(hasItem(DEFAULT_STR_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].strPhoneType").value(hasItem(DEFAULT_STR_PHONE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].strLabel").value(hasItem(DEFAULT_STR_LABEL.toString())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblPhone() throws Exception {
        // Initialize the database
        tblPhoneRepository.saveAndFlush(tblPhone);

        // Get the tblPhone
        restTblPhoneMockMvc.perform(get("/api/tbl-phones/{id}", tblPhone.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblPhone.getId().intValue()))
            .andExpect(jsonPath("$.strPrefix").value(DEFAULT_STR_PREFIX.toString()))
            .andExpect(jsonPath("$.strNumber").value(DEFAULT_STR_NUMBER.toString()))
            .andExpect(jsonPath("$.strPhoneType").value(DEFAULT_STR_PHONE_TYPE.toString()))
            .andExpect(jsonPath("$.strLabel").value(DEFAULT_STR_LABEL.toString()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblPhone() throws Exception {
        // Get the tblPhone
        restTblPhoneMockMvc.perform(get("/api/tbl-phones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblPhone() throws Exception {
        // Initialize the database
        tblPhoneRepository.saveAndFlush(tblPhone);
        int databaseSizeBeforeUpdate = tblPhoneRepository.findAll().size();

        // Update the tblPhone
        TblPhone updatedTblPhone = tblPhoneRepository.findOne(tblPhone.getId());
        // Disconnect from session so that the updates on updatedTblPhone are not directly saved in db
        em.detach(updatedTblPhone);
        updatedTblPhone
            .strPrefix(UPDATED_STR_PREFIX)
            .strNumber(UPDATED_STR_NUMBER)
            .strPhoneType(UPDATED_STR_PHONE_TYPE)
            .strLabel(UPDATED_STR_LABEL)
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblPhoneMockMvc.perform(put("/api/tbl-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblPhone)))
            .andExpect(status().isOk());

        // Validate the TblPhone in the database
        List<TblPhone> tblPhoneList = tblPhoneRepository.findAll();
        assertThat(tblPhoneList).hasSize(databaseSizeBeforeUpdate);
        TblPhone testTblPhone = tblPhoneList.get(tblPhoneList.size() - 1);
        assertThat(testTblPhone.getStrPrefix()).isEqualTo(UPDATED_STR_PREFIX);
        assertThat(testTblPhone.getStrNumber()).isEqualTo(UPDATED_STR_NUMBER);
        assertThat(testTblPhone.getStrPhoneType()).isEqualTo(UPDATED_STR_PHONE_TYPE);
        assertThat(testTblPhone.getStrLabel()).isEqualTo(UPDATED_STR_LABEL);
        assertThat(testTblPhone.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblPhone.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblPhone.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblPhone() throws Exception {
        int databaseSizeBeforeUpdate = tblPhoneRepository.findAll().size();

        // Create the TblPhone

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblPhoneMockMvc.perform(put("/api/tbl-phones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblPhone)))
            .andExpect(status().isCreated());

        // Validate the TblPhone in the database
        List<TblPhone> tblPhoneList = tblPhoneRepository.findAll();
        assertThat(tblPhoneList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblPhone() throws Exception {
        // Initialize the database
        tblPhoneRepository.saveAndFlush(tblPhone);
        int databaseSizeBeforeDelete = tblPhoneRepository.findAll().size();

        // Get the tblPhone
        restTblPhoneMockMvc.perform(delete("/api/tbl-phones/{id}", tblPhone.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblPhone> tblPhoneList = tblPhoneRepository.findAll();
        assertThat(tblPhoneList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblPhone.class);
        TblPhone tblPhone1 = new TblPhone();
        tblPhone1.setId(1L);
        TblPhone tblPhone2 = new TblPhone();
        tblPhone2.setId(tblPhone1.getId());
        assertThat(tblPhone1).isEqualTo(tblPhone2);
        tblPhone2.setId(2L);
        assertThat(tblPhone1).isNotEqualTo(tblPhone2);
        tblPhone1.setId(null);
        assertThat(tblPhone1).isNotEqualTo(tblPhone2);
    }
}
