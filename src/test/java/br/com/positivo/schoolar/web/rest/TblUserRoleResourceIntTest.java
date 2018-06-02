package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblUserRole;
import br.com.positivo.schoolar.repository.TblUserRoleRepository;
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
 * Test class for the TblUserRoleResource REST controller.
 *
 * @see TblUserRoleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblUserRoleResourceIntTest {

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    @Autowired
    private TblUserRoleRepository tblUserRoleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblUserRoleMockMvc;

    private TblUserRole tblUserRole;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblUserRoleResource tblUserRoleResource = new TblUserRoleResource(tblUserRoleRepository);
        this.restTblUserRoleMockMvc = MockMvcBuilders.standaloneSetup(tblUserRoleResource)
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
    public static TblUserRole createEntity(EntityManager em) {
        TblUserRole tblUserRole = new TblUserRole()
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED);
        return tblUserRole;
    }

    @Before
    public void initTest() {
        tblUserRole = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblUserRole() throws Exception {
        int databaseSizeBeforeCreate = tblUserRoleRepository.findAll().size();

        // Create the TblUserRole
        restTblUserRoleMockMvc.perform(post("/api/tbl-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserRole)))
            .andExpect(status().isCreated());

        // Validate the TblUserRole in the database
        List<TblUserRole> tblUserRoleList = tblUserRoleRepository.findAll();
        assertThat(tblUserRoleList).hasSize(databaseSizeBeforeCreate + 1);
        TblUserRole testTblUserRole = tblUserRoleList.get(tblUserRoleList.size() - 1);
        assertThat(testTblUserRole.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblUserRole.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblUserRole.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void createTblUserRoleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblUserRoleRepository.findAll().size();

        // Create the TblUserRole with an existing ID
        tblUserRole.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblUserRoleMockMvc.perform(post("/api/tbl-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserRole)))
            .andExpect(status().isBadRequest());

        // Validate the TblUserRole in the database
        List<TblUserRole> tblUserRoleList = tblUserRoleRepository.findAll();
        assertThat(tblUserRoleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDtmCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserRoleRepository.findAll().size();
        // set the field null
        tblUserRole.setDtmCreated(null);

        // Create the TblUserRole, which fails.

        restTblUserRoleMockMvc.perform(post("/api/tbl-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserRole)))
            .andExpect(status().isBadRequest());

        List<TblUserRole> tblUserRoleList = tblUserRoleRepository.findAll();
        assertThat(tblUserRoleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblUserRoleRepository.findAll().size();
        // set the field null
        tblUserRole.setIntExcluded(null);

        // Create the TblUserRole, which fails.

        restTblUserRoleMockMvc.perform(post("/api/tbl-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserRole)))
            .andExpect(status().isBadRequest());

        List<TblUserRole> tblUserRoleList = tblUserRoleRepository.findAll();
        assertThat(tblUserRoleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblUserRoles() throws Exception {
        // Initialize the database
        tblUserRoleRepository.saveAndFlush(tblUserRole);

        // Get all the tblUserRoleList
        restTblUserRoleMockMvc.perform(get("/api/tbl-user-roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblUserRole.getId().intValue())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)));
    }

    @Test
    @Transactional
    public void getTblUserRole() throws Exception {
        // Initialize the database
        tblUserRoleRepository.saveAndFlush(tblUserRole);

        // Get the tblUserRole
        restTblUserRoleMockMvc.perform(get("/api/tbl-user-roles/{id}", tblUserRole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblUserRole.getId().intValue()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED));
    }

    @Test
    @Transactional
    public void getNonExistingTblUserRole() throws Exception {
        // Get the tblUserRole
        restTblUserRoleMockMvc.perform(get("/api/tbl-user-roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblUserRole() throws Exception {
        // Initialize the database
        tblUserRoleRepository.saveAndFlush(tblUserRole);
        int databaseSizeBeforeUpdate = tblUserRoleRepository.findAll().size();

        // Update the tblUserRole
        TblUserRole updatedTblUserRole = tblUserRoleRepository.findOne(tblUserRole.getId());
        // Disconnect from session so that the updates on updatedTblUserRole are not directly saved in db
        em.detach(updatedTblUserRole);
        updatedTblUserRole
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED);

        restTblUserRoleMockMvc.perform(put("/api/tbl-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblUserRole)))
            .andExpect(status().isOk());

        // Validate the TblUserRole in the database
        List<TblUserRole> tblUserRoleList = tblUserRoleRepository.findAll();
        assertThat(tblUserRoleList).hasSize(databaseSizeBeforeUpdate);
        TblUserRole testTblUserRole = tblUserRoleList.get(tblUserRoleList.size() - 1);
        assertThat(testTblUserRole.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblUserRole.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblUserRole.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblUserRole() throws Exception {
        int databaseSizeBeforeUpdate = tblUserRoleRepository.findAll().size();

        // Create the TblUserRole

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblUserRoleMockMvc.perform(put("/api/tbl-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblUserRole)))
            .andExpect(status().isCreated());

        // Validate the TblUserRole in the database
        List<TblUserRole> tblUserRoleList = tblUserRoleRepository.findAll();
        assertThat(tblUserRoleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblUserRole() throws Exception {
        // Initialize the database
        tblUserRoleRepository.saveAndFlush(tblUserRole);
        int databaseSizeBeforeDelete = tblUserRoleRepository.findAll().size();

        // Get the tblUserRole
        restTblUserRoleMockMvc.perform(delete("/api/tbl-user-roles/{id}", tblUserRole.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblUserRole> tblUserRoleList = tblUserRoleRepository.findAll();
        assertThat(tblUserRoleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblUserRole.class);
        TblUserRole tblUserRole1 = new TblUserRole();
        tblUserRole1.setId(1L);
        TblUserRole tblUserRole2 = new TblUserRole();
        tblUserRole2.setId(tblUserRole1.getId());
        assertThat(tblUserRole1).isEqualTo(tblUserRole2);
        tblUserRole2.setId(2L);
        assertThat(tblUserRole1).isNotEqualTo(tblUserRole2);
        tblUserRole1.setId(null);
        assertThat(tblUserRole1).isNotEqualTo(tblUserRole2);
    }
}
