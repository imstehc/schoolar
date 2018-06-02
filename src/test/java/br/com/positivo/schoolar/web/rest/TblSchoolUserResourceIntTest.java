package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblSchoolUser;
import br.com.positivo.schoolar.repository.TblSchoolUserRepository;
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
 * Test class for the TblSchoolUserResource REST controller.
 *
 * @see TblSchoolUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblSchoolUserResourceIntTest {

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblSchoolUserRepository tblSchoolUserRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblSchoolUserMockMvc;

    private TblSchoolUser tblSchoolUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblSchoolUserResource tblSchoolUserResource = new TblSchoolUserResource(tblSchoolUserRepository);
        this.restTblSchoolUserMockMvc = MockMvcBuilders.standaloneSetup(tblSchoolUserResource)
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
    public static TblSchoolUser createEntity(EntityManager em) {
        TblSchoolUser tblSchoolUser = new TblSchoolUser()
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblSchoolUser;
    }

    @Before
    public void initTest() {
        tblSchoolUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblSchoolUser() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolUserRepository.findAll().size();

        // Create the TblSchoolUser
        restTblSchoolUserMockMvc.perform(post("/api/tbl-school-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolUser)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolUser in the database
        List<TblSchoolUser> tblSchoolUserList = tblSchoolUserRepository.findAll();
        assertThat(tblSchoolUserList).hasSize(databaseSizeBeforeCreate + 1);
        TblSchoolUser testTblSchoolUser = tblSchoolUserList.get(tblSchoolUserList.size() - 1);
        assertThat(testTblSchoolUser.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblSchoolUser.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblSchoolUser.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblSchoolUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolUserRepository.findAll().size();

        // Create the TblSchoolUser with an existing ID
        tblSchoolUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblSchoolUserMockMvc.perform(post("/api/tbl-school-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolUser)))
            .andExpect(status().isBadRequest());

        // Validate the TblSchoolUser in the database
        List<TblSchoolUser> tblSchoolUserList = tblSchoolUserRepository.findAll();
        assertThat(tblSchoolUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDtmCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolUserRepository.findAll().size();
        // set the field null
        tblSchoolUser.setDtmCreated(null);

        // Create the TblSchoolUser, which fails.

        restTblSchoolUserMockMvc.perform(post("/api/tbl-school-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolUser)))
            .andExpect(status().isBadRequest());

        List<TblSchoolUser> tblSchoolUserList = tblSchoolUserRepository.findAll();
        assertThat(tblSchoolUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolUserRepository.findAll().size();
        // set the field null
        tblSchoolUser.setIntExcluded(null);

        // Create the TblSchoolUser, which fails.

        restTblSchoolUserMockMvc.perform(post("/api/tbl-school-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolUser)))
            .andExpect(status().isBadRequest());

        List<TblSchoolUser> tblSchoolUserList = tblSchoolUserRepository.findAll();
        assertThat(tblSchoolUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblSchoolUsers() throws Exception {
        // Initialize the database
        tblSchoolUserRepository.saveAndFlush(tblSchoolUser);

        // Get all the tblSchoolUserList
        restTblSchoolUserMockMvc.perform(get("/api/tbl-school-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblSchoolUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblSchoolUser() throws Exception {
        // Initialize the database
        tblSchoolUserRepository.saveAndFlush(tblSchoolUser);

        // Get the tblSchoolUser
        restTblSchoolUserMockMvc.perform(get("/api/tbl-school-users/{id}", tblSchoolUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblSchoolUser.getId().intValue()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblSchoolUser() throws Exception {
        // Get the tblSchoolUser
        restTblSchoolUserMockMvc.perform(get("/api/tbl-school-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblSchoolUser() throws Exception {
        // Initialize the database
        tblSchoolUserRepository.saveAndFlush(tblSchoolUser);
        int databaseSizeBeforeUpdate = tblSchoolUserRepository.findAll().size();

        // Update the tblSchoolUser
        TblSchoolUser updatedTblSchoolUser = tblSchoolUserRepository.findOne(tblSchoolUser.getId());
        // Disconnect from session so that the updates on updatedTblSchoolUser are not directly saved in db
        em.detach(updatedTblSchoolUser);
        updatedTblSchoolUser
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblSchoolUserMockMvc.perform(put("/api/tbl-school-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblSchoolUser)))
            .andExpect(status().isOk());

        // Validate the TblSchoolUser in the database
        List<TblSchoolUser> tblSchoolUserList = tblSchoolUserRepository.findAll();
        assertThat(tblSchoolUserList).hasSize(databaseSizeBeforeUpdate);
        TblSchoolUser testTblSchoolUser = tblSchoolUserList.get(tblSchoolUserList.size() - 1);
        assertThat(testTblSchoolUser.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblSchoolUser.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblSchoolUser.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblSchoolUser() throws Exception {
        int databaseSizeBeforeUpdate = tblSchoolUserRepository.findAll().size();

        // Create the TblSchoolUser

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblSchoolUserMockMvc.perform(put("/api/tbl-school-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolUser)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolUser in the database
        List<TblSchoolUser> tblSchoolUserList = tblSchoolUserRepository.findAll();
        assertThat(tblSchoolUserList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblSchoolUser() throws Exception {
        // Initialize the database
        tblSchoolUserRepository.saveAndFlush(tblSchoolUser);
        int databaseSizeBeforeDelete = tblSchoolUserRepository.findAll().size();

        // Get the tblSchoolUser
        restTblSchoolUserMockMvc.perform(delete("/api/tbl-school-users/{id}", tblSchoolUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblSchoolUser> tblSchoolUserList = tblSchoolUserRepository.findAll();
        assertThat(tblSchoolUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblSchoolUser.class);
        TblSchoolUser tblSchoolUser1 = new TblSchoolUser();
        tblSchoolUser1.setId(1L);
        TblSchoolUser tblSchoolUser2 = new TblSchoolUser();
        tblSchoolUser2.setId(tblSchoolUser1.getId());
        assertThat(tblSchoolUser1).isEqualTo(tblSchoolUser2);
        tblSchoolUser2.setId(2L);
        assertThat(tblSchoolUser1).isNotEqualTo(tblSchoolUser2);
        tblSchoolUser1.setId(null);
        assertThat(tblSchoolUser1).isNotEqualTo(tblSchoolUser2);
    }
}
