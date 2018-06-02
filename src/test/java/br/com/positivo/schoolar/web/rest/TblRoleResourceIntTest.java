package br.com.positivo.schoolar.web.rest;

import br.com.positivo.schoolar.SchoolarApp;

import br.com.positivo.schoolar.domain.TblRole;
import br.com.positivo.schoolar.repository.TblRoleRepository;
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
 * Test class for the TblRoleResource REST controller.
 *
 * @see TblRoleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SchoolarApp.class)
public class TblRoleResourceIntTest {

    private static final String DEFAULT_STR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STR_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STR_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_STR_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_DTM_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DTM_LAST_UPDATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DTM_LAST_UPDATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_INT_EXCLUDED = 1;
    private static final Integer UPDATED_INT_EXCLUDED = 2;

    private static final Integer DEFAULT_INT_CAN_BE_IMPERSONATED = 1;
    private static final Integer UPDATED_INT_CAN_BE_IMPERSONATED = 2;

    @Autowired
    private TblRoleRepository tblRoleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTblRoleMockMvc;

    private TblRole tblRole;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TblRoleResource tblRoleResource = new TblRoleResource(tblRoleRepository);
        this.restTblRoleMockMvc = MockMvcBuilders.standaloneSetup(tblRoleResource)
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
    public static TblRole createEntity(EntityManager em) {
        TblRole tblRole = new TblRole()
            .strName(DEFAULT_STR_NAME)
            .strDescription(DEFAULT_STR_DESCRIPTION)
            .dtmCreated(DEFAULT_DTM_CREATED)
            .dtmLastUpdate(DEFAULT_DTM_LAST_UPDATE)
            .intExcluded(DEFAULT_INT_EXCLUDED)
            .intCanBeImpersonated(DEFAULT_INT_CAN_BE_IMPERSONATED);
        return tblRole;
    }

    @Before
    public void initTest() {
        tblRole = createEntity(em);
    }

    @Test
    @Transactional
    public void createTblRole() throws Exception {
        int databaseSizeBeforeCreate = tblRoleRepository.findAll().size();

        // Create the TblRole
        restTblRoleMockMvc.perform(post("/api/tbl-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblRole)))
            .andExpect(status().isCreated());

        // Validate the TblRole in the database
        List<TblRole> tblRoleList = tblRoleRepository.findAll();
        assertThat(tblRoleList).hasSize(databaseSizeBeforeCreate + 1);
        TblRole testTblRole = tblRoleList.get(tblRoleList.size() - 1);
        assertThat(testTblRole.getStrName()).isEqualTo(DEFAULT_STR_NAME);
        assertThat(testTblRole.getStrDescription()).isEqualTo(DEFAULT_STR_DESCRIPTION);
        assertThat(testTblRole.getDtmCreated()).isEqualTo(DEFAULT_DTM_CREATED);
        assertThat(testTblRole.getDtmLastUpdate()).isEqualTo(DEFAULT_DTM_LAST_UPDATE);
        assertThat(testTblRole.getIntExcluded()).isEqualTo(DEFAULT_INT_EXCLUDED);
        assertThat(testTblRole.getIntCanBeImpersonated()).isEqualTo(DEFAULT_INT_CAN_BE_IMPERSONATED);
    }

    @Test
    @Transactional
    public void createTblRoleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tblRoleRepository.findAll().size();

        // Create the TblRole with an existing ID
        tblRole.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTblRoleMockMvc.perform(post("/api/tbl-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblRole)))
            .andExpect(status().isBadRequest());

        // Validate the TblRole in the database
        List<TblRole> tblRoleList = tblRoleRepository.findAll();
        assertThat(tblRoleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStrNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblRoleRepository.findAll().size();
        // set the field null
        tblRole.setStrName(null);

        // Create the TblRole, which fails.

        restTblRoleMockMvc.perform(post("/api/tbl-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblRole)))
            .andExpect(status().isBadRequest());

        List<TblRole> tblRoleList = tblRoleRepository.findAll();
        assertThat(tblRoleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDtmCreatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblRoleRepository.findAll().size();
        // set the field null
        tblRole.setDtmCreated(null);

        // Create the TblRole, which fails.

        restTblRoleMockMvc.perform(post("/api/tbl-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblRole)))
            .andExpect(status().isBadRequest());

        List<TblRole> tblRoleList = tblRoleRepository.findAll();
        assertThat(tblRoleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntExcludedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblRoleRepository.findAll().size();
        // set the field null
        tblRole.setIntExcluded(null);

        // Create the TblRole, which fails.

        restTblRoleMockMvc.perform(post("/api/tbl-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblRole)))
            .andExpect(status().isBadRequest());

        List<TblRole> tblRoleList = tblRoleRepository.findAll();
        assertThat(tblRoleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIntCanBeImpersonatedIsRequired() throws Exception {
        int databaseSizeBeforeTest = tblRoleRepository.findAll().size();
        // set the field null
        tblRole.setIntCanBeImpersonated(null);

        // Create the TblRole, which fails.

        restTblRoleMockMvc.perform(post("/api/tbl-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblRole)))
            .andExpect(status().isBadRequest());

        List<TblRole> tblRoleList = tblRoleRepository.findAll();
        assertThat(tblRoleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTblRoles() throws Exception {
        // Initialize the database
        tblRoleRepository.saveAndFlush(tblRole);

        // Get all the tblRoleList
        restTblRoleMockMvc.perform(get("/api/tbl-roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tblRole.getId().intValue())))
            .andExpect(jsonPath("$.[*].strName").value(hasItem(DEFAULT_STR_NAME.toString())))
            .andExpect(jsonPath("$.[*].strDescription").value(hasItem(DEFAULT_STR_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].dtmCreated").value(hasItem(DEFAULT_DTM_CREATED.toString())))
            .andExpect(jsonPath("$.[*].dtmLastUpdate").value(hasItem(DEFAULT_DTM_LAST_UPDATE.toString())))
            .andExpect(jsonPath("$.[*].intExcluded").value(hasItem(DEFAULT_INT_EXCLUDED)))
            .andExpect(jsonPath("$.[*].intCanBeImpersonated").value(hasItem(DEFAULT_INT_CAN_BE_IMPERSONATED)));
    }

    @Test
    @Transactional
    public void getTblRole() throws Exception {
        // Initialize the database
        tblRoleRepository.saveAndFlush(tblRole);

        // Get the tblRole
        restTblRoleMockMvc.perform(get("/api/tbl-roles/{id}", tblRole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tblRole.getId().intValue()))
            .andExpect(jsonPath("$.strName").value(DEFAULT_STR_NAME.toString()))
            .andExpect(jsonPath("$.strDescription").value(DEFAULT_STR_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.dtmCreated").value(DEFAULT_DTM_CREATED.toString()))
            .andExpect(jsonPath("$.dtmLastUpdate").value(DEFAULT_DTM_LAST_UPDATE.toString()))
            .andExpect(jsonPath("$.intExcluded").value(DEFAULT_INT_EXCLUDED))
            .andExpect(jsonPath("$.intCanBeImpersonated").value(DEFAULT_INT_CAN_BE_IMPERSONATED));
    }

    @Test
    @Transactional
    public void getNonExistingTblRole() throws Exception {
        // Get the tblRole
        restTblRoleMockMvc.perform(get("/api/tbl-roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTblRole() throws Exception {
        // Initialize the database
        tblRoleRepository.saveAndFlush(tblRole);
        int databaseSizeBeforeUpdate = tblRoleRepository.findAll().size();

        // Update the tblRole
        TblRole updatedTblRole = tblRoleRepository.findOne(tblRole.getId());
        // Disconnect from session so that the updates on updatedTblRole are not directly saved in db
        em.detach(updatedTblRole);
        updatedTblRole
            .strName(UPDATED_STR_NAME)
            .strDescription(UPDATED_STR_DESCRIPTION)
            .dtmCreated(UPDATED_DTM_CREATED)
            .dtmLastUpdate(UPDATED_DTM_LAST_UPDATE)
            .intExcluded(UPDATED_INT_EXCLUDED)
            .intCanBeImpersonated(UPDATED_INT_CAN_BE_IMPERSONATED);

        restTblRoleMockMvc.perform(put("/api/tbl-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTblRole)))
            .andExpect(status().isOk());

        // Validate the TblRole in the database
        List<TblRole> tblRoleList = tblRoleRepository.findAll();
        assertThat(tblRoleList).hasSize(databaseSizeBeforeUpdate);
        TblRole testTblRole = tblRoleList.get(tblRoleList.size() - 1);
        assertThat(testTblRole.getStrName()).isEqualTo(UPDATED_STR_NAME);
        assertThat(testTblRole.getStrDescription()).isEqualTo(UPDATED_STR_DESCRIPTION);
        assertThat(testTblRole.getDtmCreated()).isEqualTo(UPDATED_DTM_CREATED);
        assertThat(testTblRole.getDtmLastUpdate()).isEqualTo(UPDATED_DTM_LAST_UPDATE);
        assertThat(testTblRole.getIntExcluded()).isEqualTo(UPDATED_INT_EXCLUDED);
        assertThat(testTblRole.getIntCanBeImpersonated()).isEqualTo(UPDATED_INT_CAN_BE_IMPERSONATED);
    }

    @Test
    @Transactional
    public void updateNonExistingTblRole() throws Exception {
        int databaseSizeBeforeUpdate = tblRoleRepository.findAll().size();

        // Create the TblRole

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTblRoleMockMvc.perform(put("/api/tbl-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tblRole)))
            .andExpect(status().isCreated());

        // Validate the TblRole in the database
        List<TblRole> tblRoleList = tblRoleRepository.findAll();
        assertThat(tblRoleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTblRole() throws Exception {
        // Initialize the database
        tblRoleRepository.saveAndFlush(tblRole);
        int databaseSizeBeforeDelete = tblRoleRepository.findAll().size();

        // Get the tblRole
        restTblRoleMockMvc.perform(delete("/api/tbl-roles/{id}", tblRole.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TblRole> tblRoleList = tblRoleRepository.findAll();
        assertThat(tblRoleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TblRole.class);
        TblRole tblRole1 = new TblRole();
        tblRole1.setId(1L);
        TblRole tblRole2 = new TblRole();
        tblRole2.setId(tblRole1.getId());
        assertThat(tblRole1).isEqualTo(tblRole2);
        tblRole2.setId(2L);
        assertThat(tblRole1).isNotEqualTo(tblRole2);
        tblRole1.setId(null);
        assertThat(tblRole1).isNotEqualTo(tblRole2);
    }
}
