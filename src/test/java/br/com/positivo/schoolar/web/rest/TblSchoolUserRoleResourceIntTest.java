package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblSchoolUserRole;
import br.com.positivo.schoolar.repository.TblSchoolUserRoleRepository;
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
 * Test class for the TblSchoolUserRoleResource REST controller.
 *
 * @see TblSchoolUserRoleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblSchoolUserRoleResourceIntTest {

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblSchoolUserRoleRepository tblSchoolUserRoleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblSchoolUserRoleMockMvc;

    private TblSchoolUserRole tblSchoolUserRole;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblSchoolUserRoleResource tblSchoolUserRoleResource = new TblSchoolUserRoleResource(tblSchoolUserRoleRepository);
        this.restTblSchoolUserRoleMockMvc = MockMvcBuilders.standaloneSetup(tblSchoolUserRoleResource)
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
    public static TblSchoolUserRole createEntity(EntityManager em) {
        TblSchoolUserRole tblSchoolUserRole = new TblSchoolUserRole()
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblSchoolUserRole;
    }

    @Before
    public void initTest() {
        tblSchoolUserRole = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblSchoolUserRole() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolUserRoleRepository.findAll().size();

        // Create the TblSchoolUserRole
        restTblSchoolUserRoleMockMvc.perform(post("/api/tbl-school-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolUserRole)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolUserRole in the database
        List<TblSchoolUserRole> tblSchoolUserRoleList = tblSchoolUserRoleRepository.findAll();
        assertThat(tblSchoolUserRoleList).hasSize(databaseSizeBeforeCreate + 1);
        TblSchoolUserRole testTblSchoolUserRole = tblSchoolUserRoleList.get(tblSchoolUserRoleList.size() - 1);
        assertThat(testTblSchoolUserRole.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblSchoolUserRole.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblSchoolUserRole.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblSchoolUserRoleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblSchoolUserRoleRepository.findAll().size();

        // Create the TblSchoolUserRole with an existing ID
        tblSchoolUserRole.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblSchoolUserRoleMockMvc.perform(post("/api/tbl-school-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolUserRole)))
            .andExpect(status().isBadRequest());

        // Validate the TblSchoolUserRole in the database
        List<TblSchoolUserRole> tblSchoolUserRoleList = tblSchoolUserRoleRepository.findAll();
        assertThat(tblSchoolUserRoleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDtmCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolUserRoleRepository.findAll().size();
        // set the field null
        tblSchoolUserRole.setDtmCreated(null);

        // Create the TblSchoolUserRole, which fails.

        restTblSchoolUserRoleMockMvc.perform(post("/api/tbl-school-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolUserRole)))
            .andExpect(status().isBadRequest());

        List<TblSchoolUserRole> tblSchoolUserRoleList = tblSchoolUserRoleRepository.findAll();
        assertThat(tblSchoolUserRoleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblSchoolUserRoleRepository.findAll().size();
        // set the field null
        tblSchoolUserRole.setIntExcluded(null);

        // Create the TblSchoolUserRole, which fails.

        restTblSchoolUserRoleMockMvc.perform(post("/api/tbl-school-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolUserRole)))
            .andExpect(status().isBadRequest());

        List<TblSchoolUserRole> tblSchoolUserRoleList = tblSchoolUserRoleRepository.findAll();
        assertThat(tblSchoolUserRoleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblSchoolUserRoles() throws Exception {
        // Initialize the database
        tblSchoolUserRoleRepository.saveAndFlush(tblSchoolUserRole);

        // Get all the tblSchoolUserRoleList
        restTblSchoolUserRoleMockMvc.perform(get("/api/tbl-school-user-roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblSchoolUserRole.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblSchoolUserRole() throws Exception {
        // Initialize the database
        tblSchoolUserRoleRepository.saveAndFlush(tblSchoolUserRole);

        // Get the tblSchoolUserRole
        restTblSchoolUserRoleMockMvc.perform(get("/api/tbl-school-user-roles/{id}", tblSchoolUserRole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblSchoolUserRole.getId().intValue()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblSchoolUserRole() throws Exception {
        // Get the tblSchoolUserRole
        restTblSchoolUserRoleMockMvc.perform(get("/api/tbl-school-user-roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblSchoolUserRole() throws Exception {
        // Initialize the database
        tblSchoolUserRoleRepository.saveAndFlush(tblSchoolUserRole);
        int databaseSizeBeforeUpdate = tblSchoolUserRoleRepository.findAll().size();

        // Update the tblSchoolUserRole
        TblSchoolUserRole updatedTblSchoolUserRole = tblSchoolUserRoleRepository.findOne(tblSchoolUserRole.getId());
        // Disconnect from session so that the updates on updatedTblSchoolUserRole are not directly saved in db
        em.detach(updatedTblSchoolUserRole);
        updatedTblSchoolUserRole
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblSchoolUserRoleMockMvc.perform(put("/api/tbl-school-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblSchoolUserRole)))
            .andExpect(status().isOk());

        // Validate the TblSchoolUserRole in the database
        List<TblSchoolUserRole> tblSchoolUserRoleList = tblSchoolUserRoleRepository.findAll();
        assertThat(tblSchoolUserRoleList).hasSize(databaseSizeBeforeUpdate);
        TblSchoolUserRole testTblSchoolUserRole = tblSchoolUserRoleList.get(tblSchoolUserRoleList.size() - 1);
        assertThat(testTblSchoolUserRole.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblSchoolUserRole.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblSchoolUserRole.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblSchoolUserRole() throws Exception {
        int databaseSizeBeforeUpdate = tblSchoolUserRoleRepository.findAll().size();

        // Create the TblSchoolUserRole

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblSchoolUserRoleMockMvc.perform(put("/api/tbl-school-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblSchoolUserRole)))
            .andExpect(status().isCreated());

        // Validate the TblSchoolUserRole in the database
        List<TblSchoolUserRole> tblSchoolUserRoleList = tblSchoolUserRoleRepository.findAll();
        assertThat(tblSchoolUserRoleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblSchoolUserRole() throws Exception {
        // Initialize the database
        tblSchoolUserRoleRepository.saveAndFlush(tblSchoolUserRole);
        int databaseSizeBeforeDelete = tblSchoolUserRoleRepository.findAll().size();

        // Get the tblSchoolUserRole
        restTblSchoolUserRoleMockMvc.perform(delete("/api/tbl-school-user-roles/{id}", tblSchoolUserRole.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblSchoolUserRole> tblSchoolUserRoleList = tblSchoolUserRoleRepository.findAll();
        assertThat(tblSchoolUserRoleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblSchoolUserRole.class);
        TblSchoolUserRole tblSchoolUserRole1 = new TblSchoolUserRole();
        tblSchoolUserRole1.setId(1L);
        TblSchoolUserRole tblSchoolUserRole2 = new TblSchoolUserRole();
        tblSchoolUserRole2.setId(tblSchoolUserRole1.getId());
        assertThat(tblSchoolUserRole1).isEqualTo(tblSchoolUserRole2);
        tblSchoolUserRole2.setId(2L);
        assertThat(tblSchoolUserRole1).isNotEqualTo(tblSchoolUserRole2);
        tblSchoolUserRole1.setId(null);
        assertThat(tblSchoolUserRole1).isNotEqualTo(tblSchoolUserRole2);
    }
}
