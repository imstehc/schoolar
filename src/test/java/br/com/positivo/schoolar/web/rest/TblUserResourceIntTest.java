package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblUser;
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
 * Test class for the TblUserResource REST controller.
 *
 * @see TblUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblUserResourceIntTest {

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

    private static final String DEFAULT_STR_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_STR_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_STR_PHOTO = "AAAAAAAAAA";
    private static final String UPDATED_STR_PHOTO = "BBBBBBBBBB";

    private static final String DEFAULT_STR_GENDER = "A";
    private static final String UPDATED_STR_GENDER = "B";

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblUserRepository tblUserRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblUserMockMvc;

    private TblUser tblUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblUserResource tblUserResource = new TblUserResource(tblUserRepository);
        this.restTblUserMockMvc = MockMvcBuilders.standaloneSetup(tblUserResource)
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
    public static TblUser createEntity(EntityManager em) {
        TblUser tblUser = new TblUser()
            .strCPF(DEFAULT_STR_CPF)
            .strFirstName(DEFAULT_STR_FIRST_NAME)
            .strLastName(DEFAULT_STR_LAST_NAME)
            .strNickName(DEFAULT_STR_NICK_NAME)
            .dtmBirthday(DEFAULT_DTM_BIRTHDAY)
            .strEmail(DEFAULT_STR_EMAIL)
            .strPhoto(DEFAULT_STR_PHOTO)
            .strGender(DEFAULT_STR_GENDER)
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblUser;
    }

    @Before
    public void initTest() {
        tblUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblUser() throws Exception {
        int databaseSizeBeforeCreate = tblUserRepository.findAll().size();

        // Create the TblUser
        restTblUserMockMvc.perform(post("/api/tbl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUser)))
            .andExpect(status().isCreated());

        // Validate the TblUser in the database
        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeCreate + 1);
        TblUser testTblUser = tblUserList.get(tblUserList.size() - 1);
        assertThat(testTblUser.getStrCPF()).isEqualTo(DEFAULT_STR_CPF);
        assertThat(testTblUser.getStrFirstName()).isEqualTo(DEFAULT_STR_FIRST_NAME);
        assertThat(testTblUser.getStrLastName()).isEqualTo(DEFAULT_STR_LAST_NAME);
        assertThat(testTblUser.getStrNickName()).isEqualTo(DEFAULT_STR_NICK_NAME);
        assertThat(testTblUser.getDtmBirthday()).isEqualTo(DEFAULT_DTM_BIRTHDAY);
        assertThat(testTblUser.getStrEmail()).isEqualTo(DEFAULT_STR_EMAIL);
        assertThat(testTblUser.getStrPhoto()).isEqualTo(DEFAULT_STR_PHOTO);
        assertThat(testTblUser.getStrGender()).isEqualTo(DEFAULT_STR_GENDER);
        assertThat(testTblUser.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblUser.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblUser.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblUserRepository.findAll().size();

        // Create the TblUser with an existing ID
        tblUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblUserMockMvc.perform(post("/api/tbl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUser)))
            .andExpect(status().isBadRequest());

        // Validate the TblUser in the database
        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserRepository.findAll().size();
        // set the field null
        tblUser.setStrFirstName(null);

        // Create the TblUser, which fails.

        restTblUserMockMvc.perform(post("/api/tbl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUser)))
            .andExpect(status().isBadRequest());

        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStrEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserRepository.findAll().size();
        // set the field null
        tblUser.setStrEmail(null);

        // Create the TblUser, which fails.

        restTblUserMockMvc.perform(post("/api/tbl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUser)))
            .andExpect(status().isBadRequest());

        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDtmCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserRepository.findAll().size();
        // set the field null
        tblUser.setDtmCreated(null);

        // Create the TblUser, which fails.

        restTblUserMockMvc.perform(post("/api/tbl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUser)))
            .andExpect(status().isBadRequest());

        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserRepository.findAll().size();
        // set the field null
        tblUser.setIntExcluded(null);

        // Create the TblUser, which fails.

        restTblUserMockMvc.perform(post("/api/tbl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUser)))
            .andExpect(status().isBadRequest());

        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblUsers() throws Exception {
        // Initialize the database
        tblUserRepository.saveAndFlush(tblUser);

        // Get all the tblUserList
        restTblUserMockMvc.perform(get("/api/tbl-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].strCPF").value(hasItem(DEFAULT_STR_CPF.toString())))
            .andExpect(jsonPath("$.[*].strFirstName").value(hasItem(DEFAULT_STR_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].strLastName").value(hasItem(DEFAULT_STR_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].strNickName").value(hasItem(DEFAULT_STR_NICK_NAME.toString())))
            .andExpect(jsonPath("$.[*].dtmBirthday").value(hasItem(DEFAULT_DTM_BIRTHDAY.toString())))
            .andExpect(jsonPath("$.[*].strEmail").value(hasItem(DEFAULT_STR_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].strPhoto").value(hasItem(DEFAULT_STR_PHOTO.toString())))
            .andExpect(jsonPath("$.[*].strGender").value(hasItem(DEFAULT_STR_GENDER.toString())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblUser() throws Exception {
        // Initialize the database
        tblUserRepository.saveAndFlush(tblUser);

        // Get the tblUser
        restTblUserMockMvc.perform(get("/api/tbl-users/{id}", tblUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblUser.getId().intValue()))
            .andExpect(jsonPath("$.strCPF").value(DEFAULT_STR_CPF.toString()))
            .andExpect(jsonPath("$.strFirstName").value(DEFAULT_STR_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.strLastName").value(DEFAULT_STR_LAST_NAME.toString()))
            .andExpect(jsonPath("$.strNickName").value(DEFAULT_STR_NICK_NAME.toString()))
            .andExpect(jsonPath("$.dtmBirthday").value(DEFAULT_DTM_BIRTHDAY.toString()))
            .andExpect(jsonPath("$.strEmail").value(DEFAULT_STR_EMAIL.toString()))
            .andExpect(jsonPath("$.strPhoto").value(DEFAULT_STR_PHOTO.toString()))
            .andExpect(jsonPath("$.strGender").value(DEFAULT_STR_GENDER.toString()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblUser() throws Exception {
        // Get the tblUser
        restTblUserMockMvc.perform(get("/api/tbl-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblUser() throws Exception {
        // Initialize the database
        tblUserRepository.saveAndFlush(tblUser);
        int databaseSizeBeforeUpdate = tblUserRepository.findAll().size();

        // Update the tblUser
        TblUser updatedTblUser = tblUserRepository.findOne(tblUser.getId());
        // Disconnect from session so that the updates on updatedTblUser are not directly saved in db
        em.detach(updatedTblUser);
        updatedTblUser
            .strCPF(UPDATED_STR_CPF)
            .strFirstName(UPDATED_STR_FIRST_NAME)
            .strLastName(UPDATED_STR_LAST_NAME)
            .strNickName(UPDATED_STR_NICK_NAME)
            .dtmBirthday(UPDATED_DTM_BIRTHDAY)
            .strEmail(UPDATED_STR_EMAIL)
            .strPhoto(UPDATED_STR_PHOTO)
            .strGender(UPDATED_STR_GENDER)
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblUserMockMvc.perform(put("/api/tbl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblUser)))
            .andExpect(status().isOk());

        // Validate the TblUser in the database
        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeUpdate);
        TblUser testTblUser = tblUserList.get(tblUserList.size() - 1);
        assertThat(testTblUser.getStrCPF()).isEqualTo(UPDATED_STR_CPF);
        assertThat(testTblUser.getStrFirstName()).isEqualTo(UPDATED_STR_FIRST_NAME);
        assertThat(testTblUser.getStrLastName()).isEqualTo(UPDATED_STR_LAST_NAME);
        assertThat(testTblUser.getStrNickName()).isEqualTo(UPDATED_STR_NICK_NAME);
        assertThat(testTblUser.getDtmBirthday()).isEqualTo(UPDATED_DTM_BIRTHDAY);
        assertThat(testTblUser.getStrEmail()).isEqualTo(UPDATED_STR_EMAIL);
        assertThat(testTblUser.getStrPhoto()).isEqualTo(UPDATED_STR_PHOTO);
        assertThat(testTblUser.getStrGender()).isEqualTo(UPDATED_STR_GENDER);
        assertThat(testTblUser.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblUser.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblUser.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblUser() throws Exception {
        int databaseSizeBeforeUpdate = tblUserRepository.findAll().size();

        // Create the TblUser

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblUserMockMvc.perform(put("/api/tbl-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUser)))
            .andExpect(status().isCreated());

        // Validate the TblUser in the database
        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblUser() throws Exception {
        // Initialize the database
        tblUserRepository.saveAndFlush(tblUser);
        int databaseSizeBeforeDelete = tblUserRepository.findAll().size();

        // Get the tblUser
        restTblUserMockMvc.perform(delete("/api/tbl-users/{id}", tblUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblUser> tblUserList = tblUserRepository.findAll();
        assertThat(tblUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblUser.class);
        TblUser tblUser1 = new TblUser();
        tblUser1.setId(1L);
        TblUser tblUser2 = new TblUser();
        tblUser2.setId(tblUser1.getId());
        assertThat(tblUser1).isEqualTo(tblUser2);
        tblUser2.setId(2L);
        assertThat(tblUser1).isNotEqualTo(tblUser2);
        tblUser1.setId(null);
        assertThat(tblUser1).isNotEqualTo(tblUser2);
    }
}
