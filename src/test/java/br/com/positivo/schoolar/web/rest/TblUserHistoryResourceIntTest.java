package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblUserHistory;
import br.com.positivo.schoolar.repository.TblUserHistoryRepository;
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
 * Test class for the TblUserHistoryResource REST controller.
 *
 * @see TblUserHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblUserHistoryResourceIntTest {

    private static final String DEFAULT_STR_CPF = "AAAAAAAAAA";
    private static final String UPDATED_STR_CPF = "BBBBBBBBBB";

    private static final String DEFAULT_STR_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_NICK_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NICK_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_BIRTHDAY = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_BIRTHDAY = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_STR_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_STR_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_STR_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_STR_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_STR_PHOTO = "AAAAAAAAAA";
    private static final String UPDATED_STR_PHOTO = "BBBBBBBBBB";

    private static final String DEFAULT_STR_GENDER = "AAAAAAAAAA";
    private static final String UPDATED_STR_GENDER = "BBBBBBBBBB";

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    private static final Instant DEFAULT_DTM_CHANGED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CHANGED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TblUserHistoryRepository tblUserHistoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblUserHistoryMockMvc;

    private TblUserHistory tblUserHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblUserHistoryResource tblUserHistoryResource = new TblUserHistoryResource(tblUserHistoryRepository);
        this.restTblUserHistoryMockMvc = MockMvcBuilders.standaloneSetup(tblUserHistoryResource)
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
    public static TblUserHistory createEntity(EntityManager em) {
        TblUserHistory tblUserHistory = new TblUserHistory()
            .strCPF(DEFAULT_STR_CPF)
            .strFirstName(DEFAULT_STR_FIRST_NAME)
            .strLastName(DEFAULT_STR_LAST_NAME)
            .strNickName(DEFAULT_STR_NICK_NAME)
            .dtmBirthday(DEFAULT_DTM_BIRTHDAY)
            .strUserName(DEFAULT_STR_USER_NAME)
            .strEmail(DEFAULT_STR_EMAIL)
            .strPassword(DEFAULT_STR_PASSWORD)
            .strPhoto(DEFAULT_STR_PHOTO)
            .strGender(DEFAULT_STR_GENDER)
            .intExcluded(DEFAULT_INT_EXCLUDED)
            .dtmChanged(DEFAULT_DTM_CHANGED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE);
        return tblUserHistory;
    }

    @Before
    public void initTest() {
        tblUserHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblUserHistory() throws Exception {
        int databaseSizeBeforeCreate = tblUserHistoryRepository.findAll().size();

        // Create the TblUserHistory
        restTblUserHistoryMockMvc.perform(post("/api/tbl-user-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserHistory)))
            .andExpect(status().isCreated());

        // Validate the TblUserHistory in the database
        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        TblUserHistory testTblUserHistory = tblUserHistoryList.get(tblUserHistoryList.size() - 1);
        assertThat(testTblUserHistory.getStrCPF()).isEqualTo(DEFAULT_STR_CPF);
        assertThat(testTblUserHistory.getStrFirstName()).isEqualTo(DEFAULT_STR_FIRST_NAME);
        assertThat(testTblUserHistory.getStrLastName()).isEqualTo(DEFAULT_STR_LAST_NAME);
        assertThat(testTblUserHistory.getStrNickName()).isEqualTo(DEFAULT_STR_NICK_NAME);
        assertThat(testTblUserHistory.getDtmBirthday()).isEqualTo(DEFAULT_DTM_BIRTHDAY);
        assertThat(testTblUserHistory.getStrUserName()).isEqualTo(DEFAULT_STR_USER_NAME);
        assertThat(testTblUserHistory.getStrEmail()).isEqualTo(DEFAULT_STR_EMAIL);
        assertThat(testTblUserHistory.getStrPassword()).isEqualTo(DEFAULT_STR_PASSWORD);
        assertThat(testTblUserHistory.getStrPhoto()).isEqualTo(DEFAULT_STR_PHOTO);
        assertThat(testTblUserHistory.getStrGender()).isEqualTo(DEFAULT_STR_GENDER);
        assertThat(testTblUserHistory.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
        assertThat(testTblUserHistory.getDtmChanged()).isEqualTo(DEFAULT_DTM_CHANGED);
        assertThat(testTblUserHistory.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void createTblUserHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblUserHistoryRepository.findAll().size();

        // Create the TblUserHistory with an existing ID
        tblUserHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblUserHistoryMockMvc.perform(post("/api/tbl-user-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserHistory)))
            .andExpect(status().isBadRequest());

        // Validate the TblUserHistory in the database
        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserHistoryRepository.findAll().size();
        // set the field null
        tblUserHistory.setStrFirstName(null);

        // Create the TblUserHistory, which fails.

        restTblUserHistoryMockMvc.perform(post("/api/tbl-user-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserHistory)))
            .andExpect(status().isBadRequest());

        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrUserNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserHistoryRepository.findAll().size();
        // set the field null
        tblUserHistory.setStrUserName(null);

        // Create the TblUserHistory, which fails.

        restTblUserHistoryMockMvc.perform(post("/api/tbl-user-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserHistory)))
            .andExpect(status().isBadRequest());

        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserHistoryRepository.findAll().size();
        // set the field null
        tblUserHistory.setStrEmail(null);

        // Create the TblUserHistory, which fails.

        restTblUserHistoryMockMvc.perform(post("/api/tbl-user-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserHistory)))
            .andExpect(status().isBadRequest());

        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserHistoryRepository.findAll().size();
        // set the field null
        tblUserHistory.setStrPassword(null);

        // Create the TblUserHistory, which fails.

        restTblUserHistoryMockMvc.perform(post("/api/tbl-user-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserHistory)))
            .andExpect(status().isBadRequest());

        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserHistoryRepository.findAll().size();
        // set the field null
        tblUserHistory.setIntExcluded(null);

        // Create the TblUserHistory, which fails.

        restTblUserHistoryMockMvc.perform(post("/api/tbl-user-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserHistory)))
            .andExpect(status().isBadRequest());

        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDtmChangedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserHistoryRepository.findAll().size();
        // set the field null
        tblUserHistory.setDtmChanged(null);

        // Create the TblUserHistory, which fails.

        restTblUserHistoryMockMvc.perform(post("/api/tbl-user-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserHistory)))
            .andExpect(status().isBadRequest());

        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblUserHistories() throws Exception {
        // Initialize the database
        tblUserHistoryRepository.saveAndFlush(tblUserHistory);

        // Get all the tblUserHistoryList
        restTblUserHistoryMockMvc.perform(get("/api/tbl-user-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblUserHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].strCPF").value(hasItem(DEFAULT_STR_CPF.toString())))
            .andExpect(jsonPath("$.[*].strFirstName").value(hasItem(DEFAULT_STR_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].strLastName").value(hasItem(DEFAULT_STR_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].strNickName").value(hasItem(DEFAULT_STR_NICK_NAME.toString())))
            .andExpect(jsonPath("$.[*].dtmBirthday").value(hasItem(DEFAULT_DTM_BIRTHDAY.toString())))
            .andExpect(jsonPath("$.[*].strUserName").value(hasItem(DEFAULT_STR_USER_NAME.toString())))
            .andExpect(jsonPath("$.[*].strEmail").value(hasItem(DEFAULT_STR_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].strPassword").value(hasItem(DEFAULT_STR_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].strPhoto").value(hasItem(DEFAULT_STR_PHOTO.toString())))
            .andExpect(jsonPath("$.[*].strGender").value(hasItem(DEFAULT_STR_GENDER.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)))
            .andExpect(jsonPath("$.[*].dtmChanged").value(hasItem(DEFAULT_DTM_CHANGED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())));
    }

    @Test
    @Transactional
    public void getTblUserHistory() throws Exception {
        // Initialize the database
        tblUserHistoryRepository.saveAndFlush(tblUserHistory);

        // Get the tblUserHistory
        restTblUserHistoryMockMvc.perform(get("/api/tbl-user-histories/{id}", tblUserHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblUserHistory.getId().intValue()))
            .andExpect(jsonPath("$.strCPF").value(DEFAULT_STR_CPF.toString()))
            .andExpect(jsonPath("$.strFirstName").value(DEFAULT_STR_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.strLastName").value(DEFAULT_STR_LAST_NAME.toString()))
            .andExpect(jsonPath("$.strNickName").value(DEFAULT_STR_NICK_NAME.toString()))
            .andExpect(jsonPath("$.dtmBirthday").value(DEFAULT_DTM_BIRTHDAY.toString()))
            .andExpect(jsonPath("$.strUserName").value(DEFAULT_STR_USER_NAME.toString()))
            .andExpect(jsonPath("$.strEmail").value(DEFAULT_STR_EMAIL.toString()))
            .andExpect(jsonPath("$.strPassword").value(DEFAULT_STR_PASSWORD.toString()))
            .andExpect(jsonPath("$.strPhoto").value(DEFAULT_STR_PHOTO.toString()))
            .andExpect(jsonPath("$.strGender").value(DEFAULT_STR_GENDER.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED))
            .andExpect(jsonPath("$.dtmChanged").value(DEFAULT_DTM_CHANGED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTblUserHistory() throws Exception {
        // Get the tblUserHistory
        restTblUserHistoryMockMvc.perform(get("/api/tbl-user-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblUserHistory() throws Exception {
        // Initialize the database
        tblUserHistoryRepository.saveAndFlush(tblUserHistory);
        int databaseSizeBeforeUpdate = tblUserHistoryRepository.findAll().size();

        // Update the tblUserHistory
        TblUserHistory updatedTblUserHistory = tblUserHistoryRepository.findOne(tblUserHistory.getId());
        // Disconnect from session so that the updates on updatedTblUserHistory are not directly saved in db
        em.detach(updatedTblUserHistory);
        updatedTblUserHistory
            .strCPF(UPDATED_STR_CPF)
            .strFirstName(UPDATED_STR_FIRST_NAME)
            .strLastName(UPDATED_STR_LAST_NAME)
            .strNickName(UPDATED_STR_NICK_NAME)
            .dtmBirthday(UPDATED_DTM_BIRTHDAY)
            .strUserName(UPDATED_STR_USER_NAME)
            .strEmail(UPDATED_STR_EMAIL)
            .strPassword(UPDATED_STR_PASSWORD)
            .strPhoto(UPDATED_STR_PHOTO)
            .strGender(UPDATED_STR_GENDER)
            .intExcluded(UPDATED_INT_EXCLUDED)
            .dtmChanged(UPDATED_DTM_CHANGED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE);

        restTblUserHistoryMockMvc.perform(put("/api/tbl-user-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblUserHistory)))
            .andExpect(status().isOk());

        // Validate the TblUserHistory in the database
        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeUpdate);
        TblUserHistory testTblUserHistory = tblUserHistoryList.get(tblUserHistoryList.size() - 1);
        assertThat(testTblUserHistory.getStrCPF()).isEqualTo(UPDATED_STR_CPF);
        assertThat(testTblUserHistory.getStrFirstName()).isEqualTo(UPDATED_STR_FIRST_NAME);
        assertThat(testTblUserHistory.getStrLastName()).isEqualTo(UPDATED_STR_LAST_NAME);
        assertThat(testTblUserHistory.getStrNickName()).isEqualTo(UPDATED_STR_NICK_NAME);
        assertThat(testTblUserHistory.getDtmBirthday()).isEqualTo(UPDATED_DTM_BIRTHDAY);
        assertThat(testTblUserHistory.getStrUserName()).isEqualTo(UPDATED_STR_USER_NAME);
        assertThat(testTblUserHistory.getStrEmail()).isEqualTo(UPDATED_STR_EMAIL);
        assertThat(testTblUserHistory.getStrPassword()).isEqualTo(UPDATED_STR_PASSWORD);
        assertThat(testTblUserHistory.getStrPhoto()).isEqualTo(UPDATED_STR_PHOTO);
        assertThat(testTblUserHistory.getStrGender()).isEqualTo(UPDATED_STR_GENDER);
        assertThat(testTblUserHistory.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
        assertThat(testTblUserHistory.getDtmChanged()).isEqualTo(UPDATED_DTM_CHANGED);
        assertThat(testTblUserHistory.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTblUserHistory() throws Exception {
        int databaseSizeBeforeUpdate = tblUserHistoryRepository.findAll().size();

        // Create the TblUserHistory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblUserHistoryMockMvc.perform(put("/api/tbl-user-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserHistory)))
            .andExpect(status().isCreated());

        // Validate the TblUserHistory in the database
        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblUserHistory() throws Exception {
        // Initialize the database
        tblUserHistoryRepository.saveAndFlush(tblUserHistory);
        int databaseSizeBeforeDelete = tblUserHistoryRepository.findAll().size();

        // Get the tblUserHistory
        restTblUserHistoryMockMvc.perform(delete("/api/tbl-user-histories/{id}", tblUserHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblUserHistory> tblUserHistoryList = tblUserHistoryRepository.findAll();
        assertThat(tblUserHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblUserHistory.class);
        TblUserHistory tblUserHistory1 = new TblUserHistory();
        tblUserHistory1.setId(1L);
        TblUserHistory tblUserHistory2 = new TblUserHistory();
        tblUserHistory2.setId(tblUserHistory1.getId());
        assertThat(tblUserHistory1).isEqualTo(tblUserHistory2);
        tblUserHistory2.setId(2L);
        assertThat(tblUserHistory1).isNotEqualTo(tblUserHistory2);
        tblUserHistory1.setId(null);
        assertThat(tblUserHistory1).isNotEqualTo(tblUserHistory2);
    }
}
